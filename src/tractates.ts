export interface TractateDefinition {
  name: string;
  hebrewName: string;
  sefariaId: string;
}

export interface SederDefinition {
  name: string;
  hebrewName: string;
  key: string;
  tractates: TractateDefinition[];
}

export const SEDARIM: SederDefinition[] = [
  {
    name: "Zeraim",
    hebrewName: "זרעים",
    key: "zeraim",
    tractates: [
      { name: "Berakhot", hebrewName: "ברכות", sefariaId: "Mishnah_Berakhot" },
      { name: "Peah", hebrewName: "פאה", sefariaId: "Mishnah_Peah" },
      { name: "Demai", hebrewName: "דמאי", sefariaId: "Mishnah_Demai" },
      { name: "Kilayim", hebrewName: "כלאיים", sefariaId: "Mishnah_Kilayim" },
      { name: "Sheviit", hebrewName: "שביעית", sefariaId: "Mishnah_Sheviit" },
      { name: "Terumot", hebrewName: "תרומות", sefariaId: "Mishnah_Terumot" },
      { name: "Maasrot", hebrewName: "מעשרות", sefariaId: "Mishnah_Maasrot" },
      { name: "Maaser Sheni", hebrewName: "מעשר שני", sefariaId: "Mishnah_Maaser_Sheni" },
      { name: "Challah", hebrewName: "חלה", sefariaId: "Mishnah_Challah" },
      { name: "Orlah", hebrewName: "ערלה", sefariaId: "Mishnah_Orlah" },
      { name: "Bikkurim", hebrewName: "ביכורים", sefariaId: "Mishnah_Bikkurim" },
    ],
  },
  {
    name: "Moed",
    hebrewName: "מועד",
    key: "moed",
    tractates: [
      { name: "Shabbat", hebrewName: "שבת", sefariaId: "Mishnah_Shabbat" },
      { name: "Eruvin", hebrewName: "עירובין", sefariaId: "Mishnah_Eruvin" },
      { name: "Pesachim", hebrewName: "פסחים", sefariaId: "Mishnah_Pesachim" },
      { name: "Shekalim", hebrewName: "שקלים", sefariaId: "Mishnah_Shekalim" },
      { name: "Yoma", hebrewName: "יומא", sefariaId: "Mishnah_Yoma" },
      { name: "Sukkah", hebrewName: "סוכה", sefariaId: "Mishnah_Sukkah" },
      { name: "Beitzah", hebrewName: "ביצה", sefariaId: "Mishnah_Beitzah" },
      { name: "Rosh Hashanah", hebrewName: "ראש השנה", sefariaId: "Mishnah_Rosh_Hashanah" },
      { name: "Taanit", hebrewName: "תענית", sefariaId: "Mishnah_Taanit" },
      { name: "Megillah", hebrewName: "מגילה", sefariaId: "Mishnah_Megillah" },
      { name: "Moed Katan", hebrewName: "מועד קטן", sefariaId: "Mishnah_Moed_Katan" },
      { name: "Chagigah", hebrewName: "חגיגה", sefariaId: "Mishnah_Chagigah" },
    ],
  },
  {
    name: "Nashim",
    hebrewName: "נשים",
    key: "nashim",
    tractates: [
      { name: "Yevamot", hebrewName: "יבמות", sefariaId: "Mishnah_Yevamot" },
      { name: "Ketubot", hebrewName: "כתובות", sefariaId: "Mishnah_Ketubot" },
      { name: "Nedarim", hebrewName: "נדרים", sefariaId: "Mishnah_Nedarim" },
      { name: "Nazir", hebrewName: "נזיר", sefariaId: "Mishnah_Nazir" },
      { name: "Sotah", hebrewName: "סוטה", sefariaId: "Mishnah_Sotah" },
      { name: "Gittin", hebrewName: "גיטין", sefariaId: "Mishnah_Gittin" },
      { name: "Kiddushin", hebrewName: "קידושין", sefariaId: "Mishnah_Kiddushin" },
    ],
  },
  {
    name: "Nezikin",
    hebrewName: "נזיקין",
    key: "nezikin",
    tractates: [
      { name: "Bava Kamma", hebrewName: "בבא קמא", sefariaId: "Mishnah_Bava_Kamma" },
      { name: "Bava Metzia", hebrewName: "בבא מציעא", sefariaId: "Mishnah_Bava_Metzia" },
      { name: "Bava Batra", hebrewName: "בבא בתרא", sefariaId: "Mishnah_Bava_Batra" },
      { name: "Sanhedrin", hebrewName: "סנהדרין", sefariaId: "Mishnah_Sanhedrin" },
      { name: "Makkot", hebrewName: "מכות", sefariaId: "Mishnah_Makkot" },
      { name: "Shevuot", hebrewName: "שבועות", sefariaId: "Mishnah_Shevuot" },
      { name: "Eduyot", hebrewName: "עדויות", sefariaId: "Mishnah_Eduyot" },
      { name: "Avodah Zarah", hebrewName: "עבודה זרה", sefariaId: "Mishnah_Avodah_Zarah" },
      { name: "Avot", hebrewName: "אבות", sefariaId: "Mishnah_Avot" },
      { name: "Horayot", hebrewName: "הוריות", sefariaId: "Mishnah_Horayot" },
    ],
  },
  {
    name: "Kodashim",
    hebrewName: "קדשים",
    key: "kodashim",
    tractates: [
      { name: "Zevachim", hebrewName: "זבחים", sefariaId: "Mishnah_Zevachim" },
      { name: "Menachot", hebrewName: "מנחות", sefariaId: "Mishnah_Menachot" },
      { name: "Chullin", hebrewName: "חולין", sefariaId: "Mishnah_Chullin" },
      { name: "Bekhorot", hebrewName: "בכורות", sefariaId: "Mishnah_Bekhorot" },
      { name: "Arakhin", hebrewName: "ערכין", sefariaId: "Mishnah_Arakhin" },
      { name: "Temurah", hebrewName: "תמורה", sefariaId: "Mishnah_Temurah" },
      { name: "Keritot", hebrewName: "כריתות", sefariaId: "Mishnah_Keritot" },
      { name: "Meilah", hebrewName: "מעילה", sefariaId: "Mishnah_Meilah" },
      { name: "Tamid", hebrewName: "תמיד", sefariaId: "Mishnah_Tamid" },
      { name: "Middot", hebrewName: "מידות", sefariaId: "Mishnah_Middot" },
      { name: "Kinnim", hebrewName: "קינים", sefariaId: "Mishnah_Kinnim" },
    ],
  },
  {
    name: "Tahorot",
    hebrewName: "טהרות",
    key: "tahorot",
    tractates: [
      { name: "Keilim", hebrewName: "כלים", sefariaId: "Mishnah_Keilim" },
      { name: "Ohalot", hebrewName: "אהלות", sefariaId: "Mishnah_Ohalot" },
      { name: "Negaim", hebrewName: "נגעים", sefariaId: "Mishnah_Negaim" },
      { name: "Parah", hebrewName: "פרה", sefariaId: "Mishnah_Parah" },
      { name: "Tahorot", hebrewName: "טהרות", sefariaId: "Mishnah_Tahorot" },
      { name: "Mikvaot", hebrewName: "מקוואות", sefariaId: "Mishnah_Mikvaot" },
      { name: "Niddah", hebrewName: "נידה", sefariaId: "Mishnah_Niddah" },
      { name: "Makhshirin", hebrewName: "מכשירין", sefariaId: "Mishnah_Makhshirin" },
      { name: "Zavim", hebrewName: "זבים", sefariaId: "Mishnah_Zavim" },
      { name: "Tevul Yom", hebrewName: "טבול יום", sefariaId: "Mishnah_Tevul_Yom" },
      { name: "Yadayim", hebrewName: "ידים", sefariaId: "Mishnah_Yadayim" },
      { name: "Oktzin", hebrewName: "עוקצין", sefariaId: "Mishnah_Oktzin" },
    ],
  },
];
