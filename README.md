# mishna-text

Hebrew and English text for the entire Mishnah — all 63 tractates — organized by perek and mishna. Data sourced from the [Sefaria](https://www.sefaria.org) API.

## Installation

```bash
npm install mishna-text
```

## Usage

### Named imports (TypeScript / ESM)

```ts
import { BERAKHOT, AVOT, KIDDUSHIN } from "mishna-text";
import type { Tractate, Perek, Mishna } from "mishna-text";

const perekAleph  = BERAKHOT.perakim[0];       // chapter 1 (0-indexed array, 1-indexed .perek)
const mishnaAleph = perekAleph.mishnayot[0];   // mishna 1

console.log(mishnaAleph.hebrew);   // מֵאֵימָתַי קוֹרִין אֶת שְׁמַע...
console.log(mishnaAleph.english);  // From when may one recite Shema...
console.log(BERAKHOT.seder);       // "Zeraim"
```

### CommonJS

```js
const { BERAKHOT, AVOT, ALL_TRACTATES } = require("mishna-text");
```

### Direct JSON imports (subpath)

Each tractate is available as a standalone JSON file:

```ts
import berakhot    from "mishna-text/berakhot";
import avot        from "mishna-text/avot";
import maasarSheni from "mishna-text/maaser-sheni";
import bavaBatra   from "mishna-text/bava-batra";
```

### All tractates

```ts
import { ALL_TRACTATES, SEDARIM } from "mishna-text";

// Iterate every mishna in the entire Mishnah
for (const tractate of ALL_TRACTATES) {
  for (const perek of tractate.perakim) {
    for (const mishna of perek.mishnayot) {
      // mishna.hebrew, mishna.english
    }
  }
}

// SEDARIM gives seder-level metadata (name, hebrewName, tractate list)
// without the full text — useful for navigation UIs
```

## Data structure

```ts
interface Mishna {
  mishna:  number;   // 1-indexed
  hebrew:  string;   // Torat Emet vocalized Hebrew
  english: string;   // William Davidson / Koren English
}

interface Perek {
  perek:     number;   // 1-indexed
  mishnayot: Mishna[];
}

interface Tractate {
  name:             string;   // e.g. "Berakhot"
  hebrewName:       string;   // e.g. "ברכות"
  sefariaId:        string;   // e.g. "Mishnah_Berakhot"
  seder:            string;   // e.g. "Zeraim"
  sederHebrewName:  string;   // e.g. "זרעים"
  perakim:          Perek[];
}
```

## Tractate reference

All 63 tractates, grouped by seder:

| Seder | Named export | Subpath |
|---|---|---|
| **Zeraim (זרעים)** | | |
| Berakhot | `BERAKHOT` | `mishna-text/berakhot` |
| Peah | `PEAH` | `mishna-text/peah` |
| Demai | `DEMAI` | `mishna-text/demai` |
| Kilayim | `KILAYIM` | `mishna-text/kilayim` |
| Sheviit | `SHEVIIT` | `mishna-text/sheviit` |
| Terumot | `TERUMOT` | `mishna-text/terumot` |
| Maasrot | `MAASROT` | `mishna-text/maasrot` |
| Maaser Sheni | `MAASER_SHENI` | `mishna-text/maaser-sheni` |
| Challah | `CHALLAH` | `mishna-text/challah` |
| Orlah | `ORLAH` | `mishna-text/orlah` |
| Bikkurim | `BIKKURIM` | `mishna-text/bikkurim` |
| **Moed (מועד)** | | |
| Shabbat | `SHABBAT` | `mishna-text/shabbat` |
| Eruvin | `ERUVIN` | `mishna-text/eruvin` |
| Pesachim | `PESACHIM` | `mishna-text/pesachim` |
| Shekalim | `SHEKALIM` | `mishna-text/shekalim` |
| Yoma | `YOMA` | `mishna-text/yoma` |
| Sukkah | `SUKKAH` | `mishna-text/sukkah` |
| Beitzah | `BEITZAH` | `mishna-text/beitzah` |
| Rosh Hashanah | `ROSH_HASHANAH` | `mishna-text/rosh-hashanah` |
| Taanit | `TAANIT` | `mishna-text/taanit` |
| Megillah | `MEGILLAH` | `mishna-text/megillah` |
| Moed Katan | `MOED_KATAN` | `mishna-text/moed-katan` |
| Chagigah | `CHAGIGAH` | `mishna-text/chagigah` |
| **Nashim (נשים)** | | |
| Yevamot | `YEVAMOT` | `mishna-text/yevamot` |
| Ketubot | `KETUBOT` | `mishna-text/ketubot` |
| Nedarim | `NEDARIM` | `mishna-text/nedarim` |
| Nazir | `NAZIR` | `mishna-text/nazir` |
| Sotah | `SOTAH` | `mishna-text/sotah` |
| Gittin | `GITTIN` | `mishna-text/gittin` |
| Kiddushin | `KIDDUSHIN` | `mishna-text/kiddushin` |
| **Nezikin (נזיקין)** | | |
| Bava Kamma | `BAVA_KAMMA` | `mishna-text/bava-kamma` |
| Bava Metzia | `BAVA_METZIA` | `mishna-text/bava-metzia` |
| Bava Batra | `BAVA_BATRA` | `mishna-text/bava-batra` |
| Sanhedrin | `SANHEDRIN` | `mishna-text/sanhedrin` |
| Makkot | `MAKKOT` | `mishna-text/makkot` |
| Shevuot | `SHEVUOT` | `mishna-text/shevuot` |
| Eduyot | `EDUYOT` | `mishna-text/eduyot` |
| Avodah Zarah | `AVODAH_ZARAH` | `mishna-text/avodah-zarah` |
| Avot | `AVOT` | `mishna-text/avot` |
| Horayot | `HORAYOT` | `mishna-text/horayot` |
| **Kodashim (קדשים)** | | |
| Zevachim | `ZEVACHIM` | `mishna-text/zevachim` |
| Menachot | `MENACHOT` | `mishna-text/menachot` |
| Chullin | `CHULLIN` | `mishna-text/chullin` |
| Bekhorot | `BEKHOROT` | `mishna-text/bekhorot` |
| Arakhin | `ARAKHIN` | `mishna-text/arakhin` |
| Temurah | `TEMURAH` | `mishna-text/temurah` |
| Keritot | `KERITOT` | `mishna-text/keritot` |
| Meilah | `MEILAH` | `mishna-text/meilah` |
| Tamid | `TAMID` | `mishna-text/tamid` |
| Middot | `MIDDOT` | `mishna-text/middot` |
| Kinnim | `KINNIM` | `mishna-text/kinnim` |
| **Tahorot (טהרות)** | | |
| Keilim | `KEILIM` | `mishna-text/keilim` |
| Ohalot | `OHALOT` | `mishna-text/ohalot` |
| Negaim | `NEGAIM` | `mishna-text/negaim` |
| Parah | `PARAH` | `mishna-text/parah` |
| Tahorot | `TAHOROT` | `mishna-text/tahorot` |
| Mikvaot | `MIKVAOT` | `mishna-text/mikvaot` |
| Niddah | `NIDDAH` | `mishna-text/niddah` |
| Makhshirin | `MAKHSHIRIN` | `mishna-text/makhshirin` |
| Zavim | `ZAVIM` | `mishna-text/zavim` |
| Tevul Yom | `TEVUL_YOM` | `mishna-text/tevul-yom` |
| Yadayim | `YADAYIM` | `mishna-text/yadayim` |
| Oktzin | `OKTZIN` | `mishna-text/oktzin` |

## Rebuilding the data

```bash
npm run download   # fetches from Sefaria API (~25 min, rate-limited to 300ms/request)
npm run build      # rebuilds dist/
```

To use a different English version, set `SEFARIA_EN_VERSION` to the Sefaria version title:

```bash
SEFARIA_EN_VERSION="Herbert Danby" npm run download
```

---

## Legal

### Sefaria

This package retrieves data from the [Sefaria API](https://www.sefaria.org/api/docs) and redistributes the resulting text. Use of the Sefaria API is subject to the [Sefaria Terms of Service](https://www.sefaria.org/terms). This project is not affiliated with or endorsed by Sefaria.

### English translation — William Davidson Edition

The English translation included in this package is the **William Davidson Edition** (Koren Talmud Bavli / Noé Edition), translated by Rabbi Adin Even-Israel Steinsaltz.

- **Copyright:** © Koren Publishers Jerusalem Ltd.
- **License:** [Creative Commons Attribution-NonCommercial 4.0 International (CC BY-NC 4.0)](https://creativecommons.org/licenses/by-nc/4.0/)
- **Source:** [Koren Publishers](https://korenpub.com) via [Sefaria](https://www.sefaria.org)

**This license permits sharing and adapting the text for non-commercial purposes only, provided that appropriate credit is given.** If you intend to use this package in a commercial product, you must obtain a separate license directly from [Koren Publishers](https://korenpub.com).

Required attribution for the English text:
> English translation: William Davidson Edition, © Koren Publishers Jerusalem Ltd., via Sefaria (sefaria.org). Licensed under CC BY-NC 4.0.

### Hebrew text — Torat Emet

The Hebrew text is sourced from **Torat Emet** (תורת אמת), a vocalized Mishnah text.

- **License:** Public Domain
- **Source:** [Torat Emet Freeware](http://www.toratemetfreeware.com) via [Sefaria](https://www.sefaria.org)

### This package

The code in this repository (everything outside of `data/`) is released under the [MIT License](https://opensource.org/licenses/MIT).
