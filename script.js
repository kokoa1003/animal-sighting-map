const SIGHTINGS_KEY = "animal-safety-map-sightings";
const SETTINGS_KEY = "animal-safety-map-settings";
const ONE_MONTH_MS = 30 * 24 * 60 * 60 * 1000;
const NOTIFICATION_RADIUS_KM = 2;

const animalTypes = {
  monkey: { label: "サル", icon: "猿", color: "#d97706" },
  boar: { label: "イノシシ", icon: "猪", color: "#8b5e34" },
  snake: { label: "ヘビ", icon: "蛇", color: "#2f855a" },
  bear: { label: "クマ", icon: "熊", color: "#5c4033" },
  deer: { label: "鹿", icon: "鹿", color: "#9a6b3f" },
  bird: { label: "鳥", icon: "鳥", color: "#2563eb" },
  bat: { label: "コウモリ", icon: "蝙", color: "#4b5563" },
  bee: { label: "ハチ", icon: "蜂", color: "#ca8a04" },
  other: { label: "その他", icon: "他", color: "#4f46e5" },
};

const dangerLabels = {
  low: "低",
  medium: "中",
  high: "高",
};

const seedSightings = [
  {
    id: "csv-animal-01",
    animalType: "bear",
    animalName: "ツキノワグマ",
    spottedAt: "2026-05-19T12:00:00+09:00",
    latitude: 33.888954,
    longitude: 134.40184,
    locationDescription: "勝浦郡上勝町スーパー林道内",
    behaviorDescription: "皮剥ぎの痕跡を発見 / 調査状況: 国土調査中",
    dangerLevel: "high",
    count: 1,
    countText: "不明",
    photoUrl: "",
    warningMessage: "クマの痕跡があるため、周囲に知らせて単独行動を避けてください。",
    reporterContact: "",
    status: "published",
    expiresAt: "2026-06-18T12:00:00+09:00",
    createdAt: "2026-06-24T00:00:00+09:00",
    updatedAt: "2026-06-24T00:00:00+09:00",
    isSeed: true,
  },
  {
    id: "csv-animal-02",
    animalType: "deer",
    animalName: "鹿",
    spottedAt: "2025-06-11T12:00:00+09:00",
    latitude: 34.065762,
    longitude: 134.55928,
    locationDescription: "広野の県道21号線",
    behaviorDescription: "道の通せんぼ",
    dangerLevel: "low",
    count: 2,
    countText: "2",
    photoUrl: "",
    warningMessage: "道路上の動物に注意し、無理に近づかないでください。",
    reporterContact: "",
    status: "published",
    expiresAt: "2025-07-11T12:00:00+09:00",
    createdAt: "2026-06-24T00:00:00+09:00",
    updatedAt: "2026-06-24T00:00:00+09:00",
    isSeed: true,
  },
  {
    id: "csv-animal-03",
    animalType: "bear",
    animalName: "ツキノワグマ",
    spottedAt: "2025-12-01T12:00:00+09:00",
    latitude: 33.821495,
    longitude: 134.30806,
    locationDescription: "那賀郡那賀町木沢小畠",
    behaviorDescription: "空き家近くの放任された柿を採食した跡を確認 / 調査状況: 環境省の調査により、集落への出没を確認",
    dangerLevel: "high",
    count: 1,
    countText: "不明",
    photoUrl: "",
    warningMessage: "クマの採食跡があるため、周囲に知らせて単独行動を避けてください。",
    reporterContact: "",
    status: "published",
    expiresAt: "2025-12-31T12:00:00+09:00",
    createdAt: "2026-06-24T00:00:00+09:00",
    updatedAt: "2026-06-24T00:00:00+09:00",
    isSeed: true,
  },
  {
    id: "csv-animal-04",
    animalType: "bear",
    animalName: "ツキノワグマ",
    spottedAt: "2025-10-12T12:00:00+09:00",
    latitude: 33.921307,
    longitude: 134.174301,
    locationDescription: "美馬市木屋平川上",
    behaviorDescription: "市道沿いの森林内にてツキノワグマがくくりわなに掛かっているのを発見 / 調査状況: 捕獲地点よりも南西に進んだ地点（奥地）で放獣を実施",
    dangerLevel: "high",
    count: 1,
    countText: "1匹",
    photoUrl: "",
    warningMessage: "クマの出没情報です。近づかず、自治体などの案内に従ってください。",
    reporterContact: "",
    status: "published",
    expiresAt: "2025-11-11T12:00:00+09:00",
    createdAt: "2026-06-24T00:00:00+09:00",
    updatedAt: "2026-06-24T00:00:00+09:00",
    isSeed: true,
  },
  {
    id: "csv-animal-05",
    animalType: "bird",
    animalName: "鳥",
    spottedAt: "2026-05-26T12:00:00+09:00",
    latitude: 33.974934,
    longitude: 134.359594,
    locationDescription: "RoomsB棟のキャビン近く",
    behaviorDescription: "バードストライク",
    dangerLevel: "low",
    count: 1,
    countText: "1匹",
    photoUrl: "",
    warningMessage: "窓や周辺の安全を確認してください。",
    reporterContact: "",
    status: "published",
    expiresAt: "2026-06-25T12:00:00+09:00",
    createdAt: "2026-06-24T00:00:00+09:00",
    updatedAt: "2026-06-24T00:00:00+09:00",
    isSeed: true,
  },
  {
    id: "csv-animal-06",
    animalType: "bird",
    animalName: "鳥",
    spottedAt: "2026-06-12T12:00:00+09:00",
    latitude: 33.973835448735706,
    longitude: 134.36017329711987,
    locationDescription: "OFFICE研究室棟外",
    behaviorDescription: "バードストライク",
    dangerLevel: "low",
    count: 1,
    countText: "1匹",
    photoUrl: "",
    warningMessage: "窓や周辺の安全を確認してください。",
    reporterContact: "",
    status: "published",
    expiresAt: "2026-07-12T12:00:00+09:00",
    createdAt: "2026-06-24T00:00:00+09:00",
    updatedAt: "2026-06-24T00:00:00+09:00",
    isSeed: true,
  },
  {
    id: "csv-animal-07",
    animalType: "bat",
    animalName: "コウモリ",
    spottedAt: "2025-05-03T12:00:00+09:00",
    latitude: 33.967239,
    longitude: 134.350525,
    locationDescription: "神山まるごと高専女子寮3階",
    behaviorDescription: "侵入",
    dangerLevel: "medium",
    count: 1,
    countText: "1匹",
    photoUrl: "",
    warningMessage: "直接触らず、窓や隙間を確認してください。",
    reporterContact: "",
    status: "published",
    expiresAt: "2025-06-02T12:00:00+09:00",
    createdAt: "2026-06-24T00:00:00+09:00",
    updatedAt: "2026-06-24T00:00:00+09:00",
    isSeed: true,
  },
  {
    id: "csv-animal-08",
    animalType: "boar",
    animalName: "猪",
    spottedAt: "2025-06-26T12:00:00+09:00",
    latitude: 34.007618,
    longitude: 134.525009,
    locationDescription: "徳島県徳島市渋野",
    behaviorDescription: "罠を確認しにいった70代男性2人が死亡",
    dangerLevel: "high",
    count: 1,
    countText: "maybe 1",
    photoUrl: "",
    warningMessage: "危険度の高い出没情報です。近づかず、周囲へ知らせてください。",
    reporterContact: "",
    status: "published",
    expiresAt: "2025-07-26T12:00:00+09:00",
    createdAt: "2026-06-24T00:00:00+09:00",
    updatedAt: "2026-06-24T00:00:00+09:00",
    isSeed: true,
  },
  {
    id: "csv-animal-09",
    animalType: "bee",
    animalName: "スズメバチ",
    spottedAt: "2026-06-01T15:20:00+09:00",
    latitude: 33.973835448735706,
    longitude: 134.36017329711987,
    locationDescription: "OFFICE研究室",
    behaviorDescription: "なし / 調査状況: 巣撤去済",
    dangerLevel: "high",
    count: 1,
    countText: "巣一個",
    photoUrl: "",
    warningMessage: "ハチの巣情報です。近づかず、刺激しないでください。",
    reporterContact: "",
    status: "published",
    expiresAt: "2026-07-01T15:20:00+09:00",
    createdAt: "2026-06-24T00:00:00+09:00",
    updatedAt: "2026-06-24T00:00:00+09:00",
    isSeed: true,
  },
  {
    id: "csv-animal-10",
    animalType: "snake",
    animalName: "蛇",
    spottedAt: "2026-06-13T12:00:00+09:00",
    latitude: 33.97272981771872,
    longitude: 134.3628302905126,
    locationDescription: "HOMEグラウンド",
    behaviorDescription: "なし",
    dangerLevel: "medium",
    count: 1,
    countText: "1匹",
    photoUrl: "",
    warningMessage: "足元を確認し、見つけても触らず離れてください。",
    reporterContact: "",
    status: "published",
    expiresAt: "2026-07-13T12:00:00+09:00",
    createdAt: "2026-06-24T00:00:00+09:00",
    updatedAt: "2026-06-24T00:00:00+09:00",
    isSeed: true,
  },
  {
    id: "csv-animal-11",
    animalType: "bee",
    animalName: "アシナガバチ",
    spottedAt: "2026-06-15T09:30:00+09:00",
    latitude: 33.974934,
    longitude: 134.359594,
    locationDescription: "Base軒下（ROOMS）",
    behaviorDescription: "なし / 調査状況: 巣撤去済",
    dangerLevel: "medium",
    count: 1,
    countText: "巣一個",
    photoUrl: "",
    warningMessage: "ハチの巣情報です。近づかず、刺激しないでください。",
    reporterContact: "",
    status: "published",
    expiresAt: "2026-07-15T09:30:00+09:00",
    createdAt: "2026-06-24T00:00:00+09:00",
    updatedAt: "2026-06-24T00:00:00+09:00",
    isSeed: true,
  },
  {
    id: "csv-animal-12",
    animalType: "bee",
    animalName: "アシナガバチ",
    spottedAt: "2025-07-12T09:00:00+09:00",
    latitude: 33.97272981771872,
    longitude: 134.3628302905126,
    locationDescription: "HOME自転車置き場",
    behaviorDescription: "なし / 調査状況: 巣撤去済",
    dangerLevel: "medium",
    count: 1,
    countText: "巣一個",
    photoUrl: "",
    warningMessage: "ハチの巣情報です。近づかず、刺激しないでください。",
    reporterContact: "",
    status: "published",
    expiresAt: "2025-08-11T09:00:00+09:00",
    createdAt: "2026-06-24T00:00:00+09:00",
    updatedAt: "2026-06-24T00:00:00+09:00",
    isSeed: true,
  },
  {
    id: "csv-animal-13",
    animalType: "bee",
    animalName: "ドロバチ",
    spottedAt: "2026-05-25T17:00:00+09:00",
    latitude: 33.974934,
    longitude: 134.359594,
    locationDescription: "ROOMS部屋の中",
    behaviorDescription: "網戸の隙間にいる。天井の隙間から入ってくる / 調査状況: 原因調査中",
    dangerLevel: "medium",
    count: 1,
    countText: "不明",
    photoUrl: "",
    warningMessage: "室内への侵入情報です。無理に触らず、侵入口を確認してください。",
    reporterContact: "",
    status: "published",
    expiresAt: "2026-06-24T17:00:00+09:00",
    createdAt: "2026-06-24T00:00:00+09:00",
    updatedAt: "2026-06-24T00:00:00+09:00",
    isSeed: true,
  },
  {
    id: "csv-animal-14",
    animalType: "bee",
    animalName: "ハチ",
    spottedAt: "2024-07-07T09:30:00+09:00",
    latitude: 33.97272981771872,
    longitude: 134.3628302905126,
    locationDescription: "自転車のサドル（HOME）",
    behaviorDescription: "自転車のサドルに巣あり / 調査状況: 巣撤去済",
    dangerLevel: "medium",
    count: 1,
    countText: "巣一個",
    photoUrl: "",
    warningMessage: "ハチの巣情報です。近づかず、刺激しないでください。",
    reporterContact: "",
    status: "published",
    expiresAt: "2024-08-06T09:30:00+09:00",
    createdAt: "2026-06-24T00:00:00+09:00",
    updatedAt: "2026-06-24T00:00:00+09:00",
    isSeed: true,
  },
];

const defaultSettings = {
  schoolLatitude: 34.0700,
  schoolLongitude: 134.560898,
  slackWebhookUrl: "",
};

const serumLocations = [
  { id: "serum-01", number: 1, name: "徳島保健所", address: "徳島市新蔵町３丁目80", phone: "088-652-5153", latitude: 34.07, longitude: 134.560898 },
  { id: "serum-02", number: 2, name: "株式会社よんやく 徳島営業部", address: "板野郡北島町鯛浜字中須４-２", phone: "088-697-0222", latitude: 34.119781, longitude: 134.553375 },
  { id: "serum-03", number: 3, name: "株式会社アスティス 徳島営業部", address: "徳島市川内町平石字夷野224-30", phone: "088-666-0600", latitude: 34.119267, longitude: 134.584625 },
  { id: "serum-04", number: 4, name: "四国アルフレッサ株式会社 徳島営業部", address: "徳島市川内町平石字夷野224-29", phone: "088-665-3111", latitude: 34.119267, longitude: 134.584625 },
  { id: "serum-05", number: 5, name: "株式会社幸燿 徳島営業部", address: "徳島市川内町加賀須野463-23", phone: "088-665-3131", latitude: 34.123489, longitude: 134.578217 },
  { id: "serum-06", number: 6, name: "㈲杉山薬局", address: "名西郡石井町石井字石井456-1", phone: "088-674-1224", latitude: 34.067551, longitude: 134.444061 },
  { id: "serum-07", number: 7, name: "大黒屋", address: "名西郡神山町神領字北166-1", phone: "088-676-0682", latitude: 33.960896, longitude: 134.357147 },
  { id: "serum-08", number: 8, name: "神山医院", address: "名西郡神山町下分字今井163", phone: "088-677-0066", latitude: 33.967007, longitude: 134.310974 },
  { id: "serum-09", number: 9, name: "徳島県鳴門病院", address: "鳴門市撫養町黒崎字小谷32", phone: "088-683-0011", latitude: 34.182671, longitude: 134.594543 },
  { id: "serum-10", number: 10, name: "鳴門山上病院", address: "鳴門市鳴門町土佐泊浦字高砂205-29", phone: "088-687-1234", latitude: 34.203964, longitude: 134.625168 },
  { id: "serum-11", number: 11, name: "㈱柴田薬局", address: "板野郡板野町吹田字町南27-7", phone: "088-672-0078", latitude: 34.152454, longitude: 134.462158 },
  { id: "serum-12", number: 12, name: "徳島赤十字病院", address: "小松島市小松島町字井利ノ口103", phone: "0885-32-2555", latitude: 34.012112, longitude: 134.583252 },
  { id: "serum-13", number: 13, name: "国民健康保険 勝浦病院", address: "勝浦郡勝浦町大字棚野字鴻畑13-2", phone: "0885-42-2555", latitude: 33.895203, longitude: 134.460541 },
  { id: "serum-14", number: 14, name: "阿南保健所", address: "阿南市領家町野神319", phone: "0884-28-9870", latitude: 33.924892, longitude: 134.67128 },
  { id: "serum-15", number: 15, name: "馬原医院", address: "阿南市新野町信里62", phone: "0884-36-3339", latitude: 33.834152, longitude: 134.562698 },
  { id: "serum-16", number: 16, name: "原田病院", address: "阿南市富岡町あ石14-1", phone: "0884-22-0990", latitude: 33.917885, longitude: 134.662933 },
  { id: "serum-17", number: 17, name: "阿南医療センター", address: "阿南市宝田町川原6-1", phone: "0884-28-7777", latitude: 33.92429, longitude: 134.646057 },
  { id: "serum-18", number: 18, name: "コノブ薬局", address: "那賀郡那賀町中山小延3-3", phone: "0884-62-2153", latitude: 33.858723, longitude: 134.533981 },
  { id: "serum-19", number: 19, name: "那賀町国民健康保険 日野谷診療所", address: "那賀郡那賀町大久保字大西3-2", phone: "0884-62-0073", latitude: 33.802193, longitude: 134.450287 },
  { id: "serum-20", number: 20, name: "那賀町立上那賀病院", address: "那賀郡那賀町小浜137-1", phone: "0884-66-0211", latitude: 33.808052, longitude: 134.368408 },
  { id: "serum-21", number: 21, name: "那賀町国民健康保険 木頭診療所", address: "那賀郡那賀町木頭和無田字イワツシ1", phone: "0884-68-2102", latitude: 33.776142, longitude: 134.194092 },
  { id: "serum-22", number: 22, name: "那賀町国民健康保険 木沢診療所", address: "那賀郡那賀町木頭字広瀬5-2", phone: "0884-65-2409", latitude: 33.821495, longitude: 134.30806 },
  { id: "serum-23", number: 23, name: "美波保健所", address: "海部郡美波町奥河内字弁才天17-1", phone: "0884-74-7343", latitude: 33.726597, longitude: 134.531311 },
  { id: "serum-24", number: 24, name: "美波町国民健康保険 日和佐診療所", address: "海部郡美波町奥河内字井ノ上13-2", phone: "0884-77-1212", latitude: 33.735233, longitude: 134.532135 },
  { id: "serum-25", number: 25, name: "美波町国民健康保険 美波病院", address: "海部郡美波町田井105番地1", phone: "0884-78-1373", latitude: 33.776749, longitude: 134.578735 },
  { id: "serum-26", number: 26, name: "海陽町宍喰診療所", address: "海部郡海陽町宍喰浦字松原142-1", phone: "0884-76-2028", latitude: 33.566509, longitude: 134.305969 },
  { id: "serum-27", number: 27, name: "県立海部病院", address: "海部郡牟岐町大字中村字杉谷266", phone: "0884-72-1166", latitude: 33.675709, longitude: 134.409637 },
  { id: "serum-28", number: 28, name: "吉野川保健所", address: "吉野川市鴨島町鴨島106-2", phone: "0883-24-1114", latitude: 34.06741, longitude: 134.358749 },
  { id: "serum-29", number: 29, name: "吉野川医療センター", address: "吉野川市鴨島町知恵島字西知恵島120", phone: "0883-26-2222", latitude: 34.079422, longitude: 134.347824 },
  { id: "serum-30", number: 30, name: "美馬保健所", address: "美馬市穴吹町穴吹字明蓮23", phone: "0883-52-1017", latitude: 34.039307, longitude: 134.180634 },
  { id: "serum-31", number: 31, name: "こうざい薬局", address: "美馬市脇町字拝原1413-7", phone: "0883-52-1593", latitude: 34.068474, longitude: 134.164169 },
  { id: "serum-32", number: 32, name: "ホウエツ病院", address: "美馬市脇町大字猪尻字八幡神社下南130-3", phone: "0883-52-1095", latitude: 34.063828, longitude: 134.156128 },
  { id: "serum-33", number: 33, name: "美馬市国民健康保険 木屋平診療所", address: "美馬市木屋平字川井224", phone: "0883-68-2541", latitude: 33.921307, longitude: 134.174301 },
  { id: "serum-34", number: 34, name: "つるぎ町立半田病院", address: "美馬郡つるぎ町半田字中藪234-1", phone: "0883-64-3145", latitude: 34.041969, longitude: 134.051361 },
  { id: "serum-35", number: 35, name: "田村医院", address: "美馬郡つるぎ町貞光宮下12-4", phone: "0883-62-5166", latitude: 34.040874, longitude: 134.063843 },
  { id: "serum-36", number: 36, name: "三好保健所", address: "三好市池田町マチ2542-4", phone: "0883-72-1122", latitude: 34.02858, longitude: 133.801773 },
  { id: "serum-37", number: 37, name: "県立三好病院", address: "三好市池田町シマ815-2", phone: "0883-72-1131", latitude: 34.028446, longitude: 133.817841 },
  { id: "serum-38", number: 38, name: "三好市国民健康保険 市立三野病院", address: "三好市三野町芝生1270-30", phone: "0883-77-2323", latitude: 34.045971, longitude: 133.969147 },
  { id: "serum-39", number: 39, name: "三好市国民健康保険 東祖谷診療所", address: "三好市東祖谷京上14-3", phone: "0883-88-2300", latitude: 33.870876, longitude: 133.905273 },
  { id: "serum-40", number: 40, name: "三好市国民健康保険 西祖谷山村診療所", address: "三好市西祖谷山村一宇368-9", phone: "0883-87-2360", latitude: 33.896675, longitude: 133.823044 },
  { id: "serum-41", number: 41, name: "三加茂田中病院", address: "三好郡東みよし町加茂1883-4", phone: "0883-82-3700", latitude: 34.026123, longitude: 133.917343 },
];

const state = {
  map: null,
  markers: new Map(),
  serumMarkers: new Map(),
  selectedLocationMarker: null,
  schoolCircle: null,
  schoolMarker: null,
  schoolPickMode: false,
  displayRange: "recent",
  serumVisible: true,
  sightings: loadSightings(),
  settings: loadSettings(),
};

const elements = {
  reportForm: document.querySelector("#report-form"),
  resetFormButton: document.querySelector("#reset-form-button"),
  locateButton: document.querySelector("#locate-button"),
  toggleSerumButton: document.querySelector("#toggle-serum-button"),
  clearSightingsButton: document.querySelector("#clear-sightings-button"),
  showRecentButton: document.querySelector("#show-recent-button"),
  showAllButton: document.querySelector("#show-all-button"),
  visibleCount: document.querySelector("#visible-count"),
  serumCount: document.querySelector("#serum-count"),
  schoolPickHint: document.querySelector("#school-pick-hint"),
  serumList: document.querySelector("#serum-list"),
  detailView: document.querySelector("#detail-view"),
  animalType: document.querySelector("#animal-type"),
  otherAnimalField: document.querySelector("#other-animal-field"),
  otherAnimalName: document.querySelector("#other-animal-name"),
  spottedAt: document.querySelector("#spotted-at"),
  latitude: document.querySelector("#latitude"),
  longitude: document.querySelector("#longitude"),
  locationDescription: document.querySelector("#location-description"),
  behaviorDescription: document.querySelector("#behavior-description"),
  dangerLevel: document.querySelector("#danger-level"),
  count: document.querySelector("#count"),
  photo: document.querySelector("#photo"),
  reporterContact: document.querySelector("#reporter-contact"),
  settingsDialog: document.querySelector("#settings-dialog"),
  openSettingsButton: document.querySelector("#open-settings-button"),
  settingsForm: document.querySelector("#settings-form"),
  schoolAddress: document.querySelector("#school-address"),
  searchSchoolAddressButton: document.querySelector("#search-school-address-button"),
  pickSchoolButton: document.querySelector("#pick-school-button"),
  schoolPickStatus: document.querySelector("#school-pick-status"),
  schoolLatitude: document.querySelector("#school-latitude"),
  schoolLongitude: document.querySelector("#school-longitude"),
  slackWebhookUrl: document.querySelector("#slack-webhook-url"),
};

initialize();

function initialize() {
  setDefaultSpottedAt();
  initializeMap();
  syncSettingsForm();
  attachEventListeners();
  renderSightings();
  renderSerumLocations();
  renderSerumList();
  if (window.location.hash) {
    selectSightingFromHash();
  } else {
    focusSerumBounds();
  }
}

function initializeMap() {
  const center = [state.settings.schoolLatitude, state.settings.schoolLongitude];
  state.map = L.map("map", { zoomControl: false }).setView(center, 10);
  L.control.zoom({ position: "bottomright" }).addTo(state.map);

  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  }).addTo(state.map);

  state.map.on("click", (event) => {
    if (state.schoolPickMode) {
      setSchoolPickMode(false);
      updateSchoolLocation(event.latlng.lat, event.latlng.lng, {
        message: "学校位置を地図で指定しました。",
        persist: true,
      });
      return;
    }

    setSelectedLocation(event.latlng.lat, event.latlng.lng);
  });

  renderSchoolArea();
}

function attachEventListeners() {
  elements.reportForm.addEventListener("submit", handleReportSubmit);
  elements.resetFormButton.addEventListener("click", resetReportForm);
  elements.animalType.addEventListener("change", updateOtherAnimalField);
  elements.showRecentButton.addEventListener("click", () => setDisplayRange("recent"));
  elements.showAllButton.addEventListener("click", () => setDisplayRange("all"));
  elements.locateButton.addEventListener("click", locateUser);
  elements.toggleSerumButton.addEventListener("click", toggleSerumLocations);
  elements.clearSightingsButton.addEventListener("click", clearSightings);
  elements.openSettingsButton.addEventListener("click", () => elements.settingsDialog.showModal());
  elements.settingsForm.addEventListener("submit", saveSettings);
  elements.searchSchoolAddressButton.addEventListener("click", searchSchoolAddress);
  elements.pickSchoolButton.addEventListener("click", () => setSchoolPickMode(!state.schoolPickMode));
  window.addEventListener("hashchange", selectSightingFromHash);
}

async function handleReportSubmit(event) {
  event.preventDefault();

  const photoUrl = elements.photo.files[0] ? await resizeImageFile(elements.photo.files[0]) : "";
  const now = new Date();
  const spottedAt = new Date(elements.spottedAt.value);
  const latitude = Number(elements.latitude.value);
  const longitude = Number(elements.longitude.value);
  const expiresAt = new Date(spottedAt.getTime() + ONE_MONTH_MS);
  const selectedAnimal = animalTypes[elements.animalType.value] || animalTypes.other;
  const customAnimalName = elements.otherAnimalName.value.trim();
  const animalName = elements.animalType.value === "other" ? customAnimalName || "その他" : selectedAnimal.label;

  const sighting = {
    id: crypto.randomUUID ? crypto.randomUUID() : `${Date.now()}-${Math.random().toString(16).slice(2)}`,
    animalType: elements.animalType.value,
    animalName,
    spottedAt: spottedAt.toISOString(),
    latitude,
    longitude,
    locationDescription: elements.locationDescription.value.trim(),
    behaviorDescription: elements.behaviorDescription.value.trim(),
    dangerLevel: elements.dangerLevel.value,
    count: Number(elements.count.value),
    photoUrl,
    warningMessage: buildWarningMessage(elements.animalType.value, elements.dangerLevel.value),
    reporterContact: elements.reporterContact.value.trim(),
    status: "published",
    expiresAt: expiresAt.toISOString(),
    createdAt: now.toISOString(),
    updatedAt: now.toISOString(),
    isSeed: false,
  };

  state.sightings = [sighting, ...state.sightings];
  saveSightings();
  renderSightings();
  selectSighting(sighting.id);
  resetReportForm();
  await notifySlackIfNeeded(sighting);
}

function renderSightings() {
  const activeSightings = getVisibleSightings();

  for (const marker of state.markers.values()) {
    marker.remove();
  }
  state.markers.clear();

  for (const sighting of activeSightings) {
    const marker = L.marker([sighting.latitude, sighting.longitude], {
      icon: createAnimalIcon(sighting.animalType, sighting.dangerLevel),
      title: animalTypes[sighting.animalType]?.label || "動物",
    }).addTo(state.map);

    marker.on("click", () => selectSighting(sighting.id));
    state.markers.set(sighting.id, marker);
  }

  elements.visibleCount.textContent = `${activeSightings.length}件`;
  elements.showRecentButton.setAttribute("aria-pressed", String(state.displayRange === "recent"));
  elements.showAllButton.setAttribute("aria-pressed", String(state.displayRange === "all"));
  saveSightings();
}

function setDisplayRange(range) {
  state.displayRange = range;
  renderSightings();
}

function renderSerumLocations() {
  for (const marker of state.serumMarkers.values()) {
    marker.remove();
  }
  state.serumMarkers.clear();

  if (!state.serumVisible) {
    elements.serumCount.textContent = "血清非表示";
    elements.toggleSerumButton.setAttribute("aria-pressed", "false");
    return;
  }

  for (const location of serumLocations) {
    const marker = L.marker([location.latitude, location.longitude], {
      icon: createSerumIcon(),
      title: location.name,
    }).addTo(state.map);

    marker.on("click", () => selectSerumLocation(location.id));
    state.serumMarkers.set(location.id, marker);
  }

  elements.serumCount.textContent = `血清${serumLocations.length}件`;
  elements.toggleSerumButton.setAttribute("aria-pressed", "true");
}

function renderSerumList() {
  elements.serumList.innerHTML = "";

  for (const location of serumLocations) {
    const button = document.createElement("button");
    button.className = "serum-list-item";
    button.type = "button";
    button.innerHTML = `
      <strong>${location.number}. ${escapeHtml(location.name)}</strong>
      <span>${escapeHtml(location.address)}</span>
    `;
    button.addEventListener("click", () => selectSerumLocation(location.id));
    elements.serumList.append(button);
  }
}

function toggleSerumLocations() {
  state.serumVisible = !state.serumVisible;
  renderSerumLocations();

  if (state.serumVisible) {
    focusSerumBounds();
  }
}

function selectSighting(id) {
  const sighting = state.sightings.find((item) => item.id === id);
  if (!sighting) return;
  window.history.replaceState(null, "", `#${sighting.id}`);

  const animal = animalTypes[sighting.animalType] || animalTypes.other;
  const animalName = sighting.animalName || animal.label;
  const countText = sighting.countText || `${sighting.count}頭`;
  const distance = calculateDistanceKm(
    state.settings.schoolLatitude,
    state.settings.schoolLongitude,
    sighting.latitude,
    sighting.longitude
  );
  const photoBlock = sighting.photoUrl
    ? `<img class="detail-photo" src="${sighting.photoUrl}" alt="投稿写真" />`
    : `<div class="photo-placeholder">写真なし</div>`;

  elements.detailView.className = "detail-view";
  elements.detailView.innerHTML = `
    <div class="detail-title">
      <span class="animal-badge" style="--badge-color:${animal.color}">${animal.icon}</span>
      <div>
        <h3>${escapeHtml(animalName)}</h3>
        <p>${formatDateTime(sighting.spottedAt)}</p>
      </div>
    </div>
    ${photoBlock}
    <dl class="detail-list">
      <div><dt>場所</dt><dd>${escapeHtml(sighting.locationDescription)}</dd></div>
      <div><dt>状況</dt><dd>${escapeHtml(sighting.behaviorDescription)}</dd></div>
      <div><dt>危険度</dt><dd>${dangerLabels[sighting.dangerLevel]}</dd></div>
      <div><dt>頭数</dt><dd>${escapeHtml(countText)}</dd></div>
      <div><dt>学校から</dt><dd>${distance.toFixed(2)}km</dd></div>
      <div><dt>注意</dt><dd>${escapeHtml(sighting.warningMessage)}</dd></div>
    </dl>
    <label class="field add-photo-field">
      <span>写真を追加・差し替え</span>
      <input data-photo-for="${sighting.id}" type="file" accept="image/*" />
    </label>
  `;

  const photoInput = elements.detailView.querySelector("[data-photo-for]");
  photoInput.addEventListener("change", async (event) => {
    const file = event.target.files[0];
    if (!file) return;
    sighting.photoUrl = await resizeImageFile(file);
    sighting.updatedAt = new Date().toISOString();
    saveSightings();
    selectSighting(sighting.id);
  });

  const marker = state.markers.get(id);
  if (marker) {
    state.map.setView(marker.getLatLng(), Math.max(state.map.getZoom(), 15), { animate: true });
  }
}

function selectSightingFromHash() {
  const id = window.location.hash.replace("#", "");
  if (id) {
    if (id.startsWith("serum-")) {
      selectSerumLocation(id);
    } else {
      selectSighting(id);
    }
  }
}

function selectSerumLocation(id) {
  const location = serumLocations.find((item) => item.id === id);
  if (!location) return;

  if (!state.serumVisible) {
    state.serumVisible = true;
    renderSerumLocations();
  }

  window.history.replaceState(null, "", `#${location.id}`);
  elements.detailView.className = "detail-view";
  elements.detailView.innerHTML = `
    <div class="detail-title">
      <span class="serum-badge">病</span>
      <div>
        <h3>${escapeHtml(location.name)}</h3>
        <p>令和8年度 まむし血清配置先</p>
      </div>
    </div>
    <dl class="detail-list">
      <div><dt>番号</dt><dd>${location.number}</dd></div>
      <div><dt>住所</dt><dd>${escapeHtml(location.address)}</dd></div>
      <div><dt>電話</dt><dd><a href="tel:${location.phone.replaceAll("-", "")}">${location.phone}</a></dd></div>
      <div><dt>配置期間</dt><dd>5月1日から10月31日</dd></div>
      <div><dt>出典</dt><dd>徳島県保健福祉部薬務課「令和8年度 乾燥まむしウマ抗毒素配置先」</dd></div>
    </dl>
  `;

  const marker = state.serumMarkers.get(id);
  if (marker) {
    state.map.setView(marker.getLatLng(), Math.max(state.map.getZoom(), 14), { animate: true });
  }
}

function focusSerumBounds() {
  const bounds = L.latLngBounds(serumLocations.map((location) => [location.latitude, location.longitude]));
  state.map.fitBounds(bounds, { padding: [30, 30], maxZoom: 10 });
}

function setSelectedLocation(latitude, longitude) {
  elements.latitude.value = latitude.toFixed(6);
  elements.longitude.value = longitude.toFixed(6);

  if (state.selectedLocationMarker) {
    state.selectedLocationMarker.setLatLng([latitude, longitude]);
  } else {
    state.selectedLocationMarker = L.marker([latitude, longitude], {
      icon: L.divIcon({
        className: "selected-location-icon",
        html: "＋",
        iconSize: [34, 34],
        iconAnchor: [17, 17],
      }),
    }).addTo(state.map);
  }
}

function locateUser() {
  if (!navigator.geolocation) {
    window.alert("現在地を取得できないブラウザです。");
    return;
  }

  navigator.geolocation.getCurrentPosition(
    (position) => {
      const { latitude, longitude } = position.coords;
      state.map.setView([latitude, longitude], 16);
      setSelectedLocation(latitude, longitude);
    },
    () => window.alert("現在地を取得できませんでした。")
  );
}

function saveSettings(event) {
  event.preventDefault();
  updateSchoolLocation(Number(elements.schoolLatitude.value), Number(elements.schoolLongitude.value), {
    message: "通知設定を保存しました。",
    moveMap: false,
    persist: false,
  });
  state.settings.slackWebhookUrl = elements.slackWebhookUrl.value.trim();
  saveSettingsToStorage();
  setSchoolPickMode(false);
  elements.settingsDialog.close();
}

function renderSchoolArea() {
  const center = [state.settings.schoolLatitude, state.settings.schoolLongitude];

  if (state.schoolMarker) state.schoolMarker.remove();
  if (state.schoolCircle) state.schoolCircle.remove();

  state.schoolMarker = L.marker(center, {
    icon: L.divIcon({
      className: "school-icon",
      html: "学",
      iconSize: [34, 34],
      iconAnchor: [17, 17],
    }),
  }).addTo(state.map);

  state.schoolCircle = L.circle(center, {
    radius: NOTIFICATION_RADIUS_KM * 1000,
    color: "#2563eb",
    fillColor: "#60a5fa",
    fillOpacity: 0.08,
    weight: 2,
  }).addTo(state.map);
}

function updateSchoolLocation(latitude, longitude, options = {}) {
  if (!Number.isFinite(latitude) || !Number.isFinite(longitude)) {
    setSchoolStatus("緯度・経度を確認してください。", true);
    return;
  }

  state.settings.schoolLatitude = latitude;
  state.settings.schoolLongitude = longitude;
  elements.schoolLatitude.value = latitude.toFixed(6);
  elements.schoolLongitude.value = longitude.toFixed(6);
  renderSchoolArea();

  if (options.moveMap !== false) {
    state.map.setView([latitude, longitude], Math.max(state.map.getZoom(), 15), { animate: true });
  }

  if (options.persist) {
    saveSettingsToStorage();
  }

  if (options.message) {
    setSchoolStatus(options.message);
  }
}

function saveSettingsToStorage() {
  window.localStorage.setItem(SETTINGS_KEY, JSON.stringify(state.settings));
}

function setSchoolPickMode(enabled) {
  state.schoolPickMode = enabled;
  elements.pickSchoolButton.setAttribute("aria-pressed", String(enabled));
  document.body.classList.toggle("school-pick-mode", enabled);
  elements.schoolPickHint.classList.toggle("is-hidden", !enabled);
  if (enabled && elements.settingsDialog.open) {
    elements.settingsDialog.close();
  }
  setSchoolStatus(enabled ? "地図上で学校の場所をクリックしてください。" : "住所検索、または地図クリックで学校位置を設定できます。");
}

async function searchSchoolAddress() {
  const query = elements.schoolAddress.value.trim();
  if (!query) {
    setSchoolStatus("住所を入力してください。", true);
    return;
  }

  setSchoolStatus("住所を検索しています...");

  try {
    const response = await fetch(`https://msearch.gsi.go.jp/address-search/AddressSearch?q=${encodeURIComponent(query)}`);
    if (!response.ok) {
      throw new Error("住所検索に失敗しました。");
    }

    const results = await response.json();
    const first = results[0];
    if (!first) {
      setSchoolStatus("住所が見つかりませんでした。表記を少し変えて試してください。", true);
      return;
    }

    const [longitude, latitude] = first.geometry.coordinates;
    const title = first.properties?.title || query;
    setSchoolPickMode(false);
    updateSchoolLocation(latitude, longitude, {
      message: `学校位置を「${title}」に設定しました。`,
      persist: true,
    });
  } catch (error) {
    setSchoolStatus("住所検索に失敗しました。時間をおいて再度試してください。", true);
  }
}

function setSchoolStatus(message, isError = false) {
  elements.schoolPickStatus.textContent = message;
  elements.schoolPickStatus.classList.toggle("is-error", isError);
}

async function notifySlackIfNeeded(sighting) {
  const distance = calculateDistanceKm(
    state.settings.schoolLatitude,
    state.settings.schoolLongitude,
    sighting.latitude,
    sighting.longitude
  );

  if (distance > NOTIFICATION_RADIUS_KM || !state.settings.slackWebhookUrl) {
    return;
  }

  const animal = animalTypes[sighting.animalType] || animalTypes.other;
  const payload = {
    animalType: animal.label,
    spottedAt: formatDateTime(sighting.spottedAt),
    locationDescription: sighting.locationDescription,
    distanceFromSchoolKm: Number(distance.toFixed(2)),
    dangerLevel: dangerLabels[sighting.dangerLevel],
    count: sighting.count,
    detailUrl: `${window.location.href.split("#")[0]}#${sighting.id}`,
    text: `【動物出没】${animal.label} / ${formatDateTime(sighting.spottedAt)} / ${sighting.locationDescription} / 学校から${distance.toFixed(2)}km`,
  };

  try {
    await fetch(state.settings.slackWebhookUrl, {
      method: "POST",
      mode: "no-cors",
      headers: { "Content-Type": "text/plain;charset=UTF-8" },
      body: JSON.stringify(payload),
    });
  } catch (error) {
    console.warn("Slack notification failed", error);
  }
}

function createAnimalIcon(type, dangerLevel) {
  const animal = animalTypes[type] || animalTypes.other;
  return L.divIcon({
    className: `animal-marker danger-${dangerLevel}`,
    html: `<span style="--marker-color:${animal.color}">${animal.icon}</span>`,
    iconSize: [42, 42],
    iconAnchor: [21, 21],
  });
}

function createSerumIcon() {
  return L.divIcon({
    className: "serum-marker",
    html: "<span>病</span>",
    iconSize: [36, 36],
    iconAnchor: [18, 18],
  });
}

function getVisibleSightings() {
  const now = Date.now();
  return state.sightings.filter((sighting) => {
    if (sighting.status !== "published") return false;
    return state.displayRange === "all" || new Date(sighting.expiresAt).getTime() > now;
  });
}

function resetReportForm() {
  elements.reportForm.reset();
  setDefaultSpottedAt();
  elements.count.value = 1;
  updateOtherAnimalField();
  if (state.selectedLocationMarker) {
    state.selectedLocationMarker.remove();
    state.selectedLocationMarker = null;
  }
}

function updateOtherAnimalField() {
  const isOther = elements.animalType.value === "other";
  elements.otherAnimalField.classList.toggle("is-hidden", !isOther);
  elements.otherAnimalName.required = isOther;
  if (!isOther) {
    elements.otherAnimalName.value = "";
  }
}

function clearSightings() {
  const userSightings = state.sightings.filter((sighting) => !sighting.isSeed);
  if (userSightings.length === 0) {
    window.alert("削除できる投稿データはありません。");
    return;
  }

  const ok = window.confirm("投稿された目撃情報をすべて削除します。CSV登録データと血清配置先データは残ります。");
  if (!ok) return;

  state.sightings = [...seedSightings];
  window.localStorage.removeItem(SIGHTINGS_KEY);
  window.history.replaceState(null, "", window.location.pathname);
  renderSightings();
  elements.detailView.className = "detail-view empty-state";
  elements.detailView.textContent = "地図上のアイコンを選択してください。";
}

function setDefaultSpottedAt() {
  const now = new Date();
  now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
  elements.spottedAt.value = now.toISOString().slice(0, 16);
}

function syncSettingsForm() {
  elements.schoolLatitude.value = state.settings.schoolLatitude;
  elements.schoolLongitude.value = state.settings.schoolLongitude;
  elements.slackWebhookUrl.value = state.settings.slackWebhookUrl;
  elements.schoolAddress.value = "";
  setSchoolStatus("住所検索、または地図クリックで学校位置を設定できます。");
}

function loadSightings() {
  try {
    const parsed = JSON.parse(window.localStorage.getItem(SIGHTINGS_KEY) || "[]");
    const userSightings = Array.isArray(parsed) ? parsed.filter((sighting) => !sighting.isSeed) : [];
    return [...seedSightings, ...userSightings];
  } catch (error) {
    return [...seedSightings];
  }
}

function saveSightings() {
  window.localStorage.setItem(SIGHTINGS_KEY, JSON.stringify(state.sightings.filter((sighting) => !sighting.isSeed)));
}

function loadSettings() {
  try {
    return { ...defaultSettings, ...JSON.parse(window.localStorage.getItem(SETTINGS_KEY) || "{}") };
  } catch (error) {
    return { ...defaultSettings };
  }
}

function resizeImageFile(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const image = new Image();
      image.onload = () => {
        const maxSize = 1280;
        const scale = Math.min(1, maxSize / Math.max(image.width, image.height));
        const canvas = document.createElement("canvas");
        canvas.width = Math.max(1, Math.round(image.width * scale));
        canvas.height = Math.max(1, Math.round(image.height * scale));
        const context = canvas.getContext("2d");
        context.drawImage(image, 0, 0, canvas.width, canvas.height);
        resolve(canvas.toDataURL("image/jpeg", 0.78));
      };
      image.onerror = reject;
      image.src = reader.result;
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

function buildWarningMessage(type, dangerLevel) {
  if (dangerLevel === "high") {
    return "近づかず、周囲へ知らせて安全な場所へ移動してください。";
  }

  if (type === "snake") {
    return "足元を確認し、見つけても触らず離れてください。";
  }

  return "刺激せず、距離を取って落ち着いて移動してください。";
}

function calculateDistanceKm(lat1, lon1, lat2, lon2) {
  const earthRadiusKm = 6371;
  const dLat = toRadians(lat2 - lat1);
  const dLon = toRadians(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRadians(lat1)) *
      Math.cos(toRadians(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  return earthRadiusKm * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

function toRadians(value) {
  return (value * Math.PI) / 180;
}

function formatDateTime(value) {
  return new Intl.DateTimeFormat("ja-JP", {
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(value));
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}
