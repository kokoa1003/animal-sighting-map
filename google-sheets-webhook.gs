// 特定のタブに入れたい場合は "動物出没" のようにタブ名を入れてください。
// 空文字のままだと、スプレッドシートの先頭シートに追加します。
const SHEET_NAME = "";

const LABELS = [
  "ID",
  "日時",
  "時間",
  "場所",
  "種類",
  "頭数",
  "行動状況",
  "実際の写真",
  "調査状況",
];

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents || "{}");
    const sheet = getOrCreateSheet_();
    const nextColumn = Math.max(sheet.getLastColumn() + 1, 2);
    const spottedAt = data.spottedAt ? new Date(data.spottedAt) : null;

    sheet.getRange(1, nextColumn, LABELS.length, 1).setValues([
      data.id || "",
      formatJapaneseDate_(spottedAt),
      formatTime_(spottedAt),
      data.locationDescription || "",
      data.animalName || data.animalType || "",
      formatCount_(data.count),
      data.behaviorDescription || "",
      data.photoUrl ? data.photoUrl : "なし",
      data.investigationStatus || "",
    ].map(function(value) {
      return [value];
    }));

    return json_({ ok: true });
  } catch (error) {
    return json_({ ok: false, error: String(error) });
  }
}

function setupSheet() {
  getOrCreateSheet_();
}

function getOrCreateSheet_() {
  const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = SHEET_NAME
    ? spreadsheet.getSheetByName(SHEET_NAME) || spreadsheet.insertSheet(SHEET_NAME)
    : spreadsheet.getSheets()[0];

  if (sheet.getLastRow() === 0) {
    sheet.getRange(1, 1, LABELS.length, 1).setValues(LABELS.map(function(label) {
      return [label];
    }));
    sheet.setFrozenColumns(1);
  }

  return sheet;
}

function formatJapaneseDate_(date) {
  if (!date || isNaN(date.getTime())) {
    return "";
  }

  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const reiwaYear = year - 2018;
  return "令和" + reiwaYear + "年" + month + "月" + day + "日";
}

function formatTime_(date) {
  if (!date || isNaN(date.getTime())) {
    return "";
  }

  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  return hours + ":" + minutes;
}

function formatCount_(count) {
  if (!count) {
    return "なし";
  }

  return count + "匹";
}

function json_(payload) {
  return ContentService
    .createTextOutput(JSON.stringify(payload))
    .setMimeType(ContentService.MimeType.JSON);
}
