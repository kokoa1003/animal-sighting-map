const dictionaryStatus = document.querySelector("#dictionary-status");
const lyricsInput = document.querySelector("#lyrics-input");
const loadButton = document.querySelector("#load-button");
const clearButton = document.querySelector("#clear-button");
const lyricsOutput = document.querySelector("#lyrics-output");
const definitionCard = document.querySelector("#definition-card");
const selectedTerm = document.querySelector("#selected-term");
const definitionContent = document.querySelector("#definition-content");
const closeCardButton = document.querySelector("#close-card-button");

let dictionary = {};
let phrases = [];

const sampleLyrics = `I wanna know what love is
I want you to show me
I feel like dancing tonight
Don't give up on your dream`;

lyricsInput.value = sampleLyrics;

const normalizeTerm = (value) => value.toLowerCase();

const loadDictionary = async () => {
  try {
    const response = await fetch("./dictionary.json", { cache: "no-store" });
    dictionary = await response.json();
    phrases = Object.entries(dictionary)
      .filter(([, entry]) => entry.type.toLowerCase().includes("phrase"))
      .map(([key]) => ({ key, words: key.split(/\s+/) }))
      .sort((a, b) => b.words.length - a.words.length || b.key.length - a.key.length);

    dictionaryStatus.textContent = `ローカル英和辞書 ${Object.keys(dictionary).length.toLocaleString()} 語を読み込みました。`;
  } catch (error) {
    dictionaryStatus.textContent = "辞書の読み込みに失敗しました。dictionary.json を確認してください。";
    console.error(error);
  }
};

const segmentPattern = /[A-Za-z]+(?:'[A-Za-z]+)?|[^A-Za-z]+/g;

const splitIntoSegments = (line) => {
  const matches = line.match(segmentPattern) ?? [];

  return matches.map((text) => {
    const isWord = /^[A-Za-z]+(?:'[A-Za-z]+)?$/.test(text);
    return {
      text,
      isWord,
      normalized: isWord ? normalizeTerm(text) : "",
    };
  });
};

const tokenizeLine = (line, lineIndex) => {
  if (line.length === 0) {
    return [{ id: `${lineIndex}-empty`, kind: "text", text: "" }];
  }

  const segments = splitIntoSegments(line);
  const wordSegmentIndexes = segments
    .map((segment, index) => (segment.isWord ? index : -1))
    .filter((index) => index >= 0);
  const claimed = new Set();
  const phraseStarts = new Map();

  wordSegmentIndexes.forEach((segmentIndex, wordPosition) => {
    if (claimed.has(segmentIndex)) return;

    const phrase = phrases.find((candidate) => {
      if (wordPosition + candidate.words.length > wordSegmentIndexes.length) return false;

      return candidate.words.every((word, offset) => {
        const nextSegmentIndex = wordSegmentIndexes[wordPosition + offset];
        return !claimed.has(nextSegmentIndex) && segments[nextSegmentIndex].normalized === word;
      });
    });

    if (!phrase) return;

    const endWordPosition = wordPosition + phrase.words.length - 1;
    for (let index = wordPosition; index <= endWordPosition; index += 1) {
      claimed.add(wordSegmentIndexes[index]);
    }
    phraseStarts.set(segmentIndex, { endWordPosition, key: phrase.key });
  });

  const tokens = [];
  let segmentIndex = 0;

  while (segmentIndex < segments.length) {
    const segment = segments[segmentIndex];
    const phrase = phraseStarts.get(segmentIndex);

    if (phrase) {
      const endSegmentIndex = wordSegmentIndexes[phrase.endWordPosition];
      const text = segments.slice(segmentIndex, endSegmentIndex + 1).map((item) => item.text).join("");
      tokens.push({ id: `${lineIndex}-${segmentIndex}-phrase`, kind: "term", text, lookupKey: phrase.key });
      segmentIndex = endSegmentIndex + 1;
      continue;
    }

    if (segment.isWord) {
      tokens.push({ id: `${lineIndex}-${segmentIndex}-word`, kind: "term", text: segment.text, lookupKey: segment.normalized });
    } else {
      tokens.push({ id: `${lineIndex}-${segmentIndex}-text`, kind: "text", text: segment.text });
    }

    segmentIndex += 1;
  }

  return tokens;
};

const getLookupCandidates = (term) => {
  const candidates = [term];

  if (term.endsWith("'s")) candidates.push(term.slice(0, -2));
  if (term.endsWith("ies") && term.length > 4) candidates.push(`${term.slice(0, -3)}y`);
  if (term.endsWith("ing") && term.length > 5) {
    candidates.push(term.slice(0, -3));
    candidates.push(`${term.slice(0, -3)}e`);
  }
  if (term.endsWith("ed") && term.length > 4) {
    candidates.push(term.slice(0, -2));
    candidates.push(term.slice(0, -1));
  }
  if (term.endsWith("s") && term.length > 3) candidates.push(term.slice(0, -1));

  return [...new Set(candidates)];
};

const findEntry = (term) => {
  const lookupKey = getLookupCandidates(term).find((candidate) => dictionary[candidate]);
  return lookupKey ? { lookupKey, entry: dictionary[lookupKey] } : null;
};

const renderLyrics = () => {
  const lyrics = lyricsInput.value;
  lyricsOutput.innerHTML = "";

  if (!lyrics.trim()) {
    lyricsOutput.innerHTML = `<p class="empty">歌詞を貼り付けて「読み込み」を押すと、ここに行ごとに表示されます。</p>`;
    return;
  }

  lyrics.split(/\r?\n/).forEach((line, lineIndex) => {
    const lineElement = document.createElement("p");
    lineElement.className = "lyric-line";

    tokenizeLine(line, lineIndex).forEach((token) => {
      if (token.kind === "text") {
        lineElement.append(document.createTextNode(token.text));
        return;
      }

      const button = document.createElement("button");
      button.className = "term-button";
      button.type = "button";
      button.textContent = token.text;
      button.addEventListener("click", () => showDefinition(token.lookupKey));
      lineElement.append(button);
    });

    lyricsOutput.append(lineElement);
  });
};

const showDefinition = (lookupKey) => {
  const result = findEntry(lookupKey);
  selectedTerm.textContent = lookupKey;

  if (result) {
    const matchedNote = result.lookupKey !== lookupKey
      ? `<p class="definition-value">辞書では「${escapeHtml(result.lookupKey)}」として登録されています。</p>`
      : "";

    definitionContent.innerHTML = `
      <div class="definition-grid">
        ${matchedNote}
        <div class="definition-block">
          <p class="definition-title">品詞</p>
          <p class="definition-value">${escapeHtml(result.entry.type)}</p>
        </div>
        <div class="definition-block">
          <p class="definition-title">日本語の意味</p>
          <p class="definition-value">${escapeHtml(result.entry.meaning)}</p>
        </div>
        <div class="definition-block">
          <p class="definition-title">例文</p>
          <p class="definition-value">${escapeHtml(result.entry.example)}</p>
        </div>
      </div>
    `;
  } else {
    definitionContent.innerHTML = `
      <div class="definition-grid">
        <p class="definition-value">この単語はまだ辞書に登録されていません</p>
        <button id="copy-term-button" class="copy-button" type="button">この単語をコピー</button>
      </div>
    `;
    document.querySelector("#copy-term-button").addEventListener("click", () => navigator.clipboard.writeText(lookupKey));
  }

  definitionCard.classList.add("is-open");
  definitionCard.setAttribute("aria-hidden", "false");
};

const escapeHtml = (value) =>
  String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");

loadButton.addEventListener("click", renderLyrics);
clearButton.addEventListener("click", () => {
  lyricsInput.value = "";
  lyricsOutput.innerHTML = `<p class="empty">歌詞を貼り付けて「読み込み」を押すと、ここに行ごとに表示されます。</p>`;
  definitionCard.classList.remove("is-open");
  definitionCard.setAttribute("aria-hidden", "true");
});
closeCardButton.addEventListener("click", () => {
  definitionCard.classList.remove("is-open");
  definitionCard.setAttribute("aria-hidden", "true");
});

loadDictionary();
