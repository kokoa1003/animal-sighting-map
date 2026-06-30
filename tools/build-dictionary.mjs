import { writeFileSync } from "node:fs";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const { dicts } = require("harurow-ejdict/dist/dict_index.js");

const curated = {
  "look at": ["phrase", "〜を見る", "Look at this picture. / この写真を見て。"],
  "look for": ["phrase", "〜を探す", "I'm looking for my keys. / 鍵を探しています。"],
  "give up": ["phrase", "あきらめる", "Don't give up now. / 今あきらめないで。"],
  "give up on": ["phrase", "〜を見限る、〜をあきらめる", "Never give up on your dream. / 夢をあきらめないで。"],
  "get over": ["phrase", "乗り越える、立ち直る", "She got over the sadness. / 彼女は悲しみを乗り越えました。"],
  "fall in love": ["phrase", "恋に落ちる", "They fall in love every summer. / 彼らは毎年夏に恋をします。"],
  "used to": ["phrase", "以前は〜だった、よく〜した", "I used to play guitar. / 以前はギターを弾いていました。"],
  "kind of": ["phrase", "ちょっと、ある種の", "I'm kind of tired. / ちょっと疲れています。"],
  "a lot of": ["phrase", "たくさんの", "There are a lot of stars. / 星がたくさんあります。"],
  "come back": ["phrase", "戻ってくる", "Please come back soon. / すぐ戻ってきてください。"],
  "turn around": ["phrase", "振り向く、向きを変える", "Turn around and smile. / 振り向いて笑って。"],
  "hold on": ["phrase", "待つ、持ちこたえる", "Hold on a second. / 少し待って。"],
  "let go": ["phrase", "手放す、解放する", "Let go of my hand. / 私の手を離して。"],
  "wake up": ["phrase", "目を覚ます", "I wake up at seven. / 私は7時に起きます。"],
  "break down": ["phrase", "壊れる、泣き崩れる", "The car broke down. / 車が故障しました。"],
  "run away": ["phrase", "逃げる", "Don't run away from trouble. / 問題から逃げないで。"],
  "find out": ["phrase", "見つけ出す、知る", "Let's find out the truth. / 真実を見つけましょう。"],
  "take off": ["phrase", "離陸する、脱ぐ", "Take off your coat. / コートを脱いで。"],
  "go on": ["phrase", "続く、続ける", "The music goes on. / 音楽は続きます。"],
  "keep on": ["phrase", "〜し続ける", "Keep on singing. / 歌い続けて。"],
  "wanna": ["informal contraction", "want to のくだけた形、〜したい", "I wanna dance. / 私は踊りたいです。"],
  "gonna": ["informal contraction", "going to のくだけた形、〜するつもり", "I'm gonna stay. / 私は残るつもりです。"],
  "gotta": ["informal contraction", "got to / have got to のくだけた形、〜しなきゃ", "I gotta go. / 行かなきゃ。"],
};

const dictionary = {};

const toEntry = ([type, meaning, example]) => ({ type, meaning, example });

for (const [term, entry] of Object.entries(curated)) {
  dictionary[term] = toEntry(entry);
}

const normalizeHeadword = (headword) =>
  headword
    .trim()
    .replace(/^the\s+/i, "")
    .replace(/\s+/g, " ")
    .toLowerCase();

const splitHeadwords = (headword) =>
  headword
    .split(",")
    .map(normalizeHeadword)
    .filter(Boolean);

const isUsefulTerm = (term) => {
  if (term.length < 2 && term !== "a" && term !== "i") return false;
  if (term.length > 36) return false;
  if (!/^[a-z][a-z' -]*$/.test(term)) return false;
  if (term.includes("--")) return false;

  const words = term.split(/\s+/);
  if (words.length > 4) return false;

  return words.every((word) => word.length > 0 && word.length <= 18);
};

const cleanMeaning = (description) =>
  description
    .replace(/〈[^〉]*〉/g, "")
    .replace(/《[^》]*》/g, "")
    .replace(/[〈〉《》]/g, "")
    .replace(/『/g, "")
    .replace(/』/g, "")
    .replace(/\s+/g, " ")
    .trim();

for (const group of dicts) {
  for (const [rawHeadword, rawDescription] of group) {
    for (const term of splitHeadwords(rawHeadword)) {
      if (!isUsefulTerm(term) || dictionary[term]) continue;

      const meaning = cleanMeaning(rawDescription);
      if (!meaning) continue;

      dictionary[term] = {
        type: term.includes(" ") ? "phrase" : "word",
        meaning,
        example: `${term} / 歌詞の中で「${term}」を確認してみましょう。`,
      };
    }
  }
}

writeFileSync("dictionary.json", `${JSON.stringify(dictionary, null, 2)}\n`);
console.log(`Generated dictionary.json with ${Object.keys(dictionary).length} entries.`);
