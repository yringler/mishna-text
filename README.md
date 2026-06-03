# mishna-text

Hebrew and English text for the entire Mishnah, organized by seder → tractate → perek → mishna. Data sourced from the [Sefaria](https://www.sefaria.org) API.

## Installation

```bash
npm install mishna-text
```

## Usage

### TypeScript / ESM

```ts
import { ZERAIM, MOED, NASHIM, NEZIKIN, KODASHIM, TAHOROT, ALL_SEDARIM } from "mishna-text";
import type { Seder, Tractate, Perek, Mishna } from "mishna-text";

// Navigate the hierarchy
const berakhot = ZERAIM.tractates.find(t => t.name === "Berakhot")!;
const perekAleph = berakhot.perakim[0];         // chapter 1 (0-indexed array, 1-indexed .perek)
const mishnaAleph = perekAleph.mishnayot[0];    // mishna 1

console.log(mishnaAleph.hebrew);   // מֵאֵימָתַי קוֹרִין אֶת שְׁמַע...
console.log(mishnaAleph.english);  // From when may one recite Shema...
```

### CommonJS

```js
const { ZERAIM, ALL_SEDARIM } = require("mishna-text");
```

### Raw JSON (subpath imports)

```ts
import zeraim   from "mishna-text/zeraim";
import moed     from "mishna-text/moed";
import nashim   from "mishna-text/nashim";
import nezikin  from "mishna-text/nezikin";
import kodashim from "mishna-text/kodashim";
import tahorot  from "mishna-text/tahorot";
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
  name:       string;   // e.g. "Berakhot"
  hebrewName: string;   // e.g. "ברכות"
  sefariaId:  string;   // e.g. "Mishnah_Berakhot"
  perakim:    Perek[];
}

interface Seder {
  name:       string;   // e.g. "Zeraim"
  hebrewName: string;   // e.g. "זרעים"
  tractates:  Tractate[];
}
```

## Sedarim and tractates

| Seder | Tractates |
|---|---|
| Zeraim (זרעים) | Berakhot, Peah, Demai, Kilayim, Sheviit, Terumot, Maasrot, Maaser Sheni, Challah, Orlah, Bikkurim |
| Moed (מועד) | Shabbat, Eruvin, Pesachim, Shekalim, Yoma, Sukkah, Beitzah, Rosh Hashanah, Taanit, Megillah, Moed Katan, Chagigah |
| Nashim (נשים) | Yevamot, Ketubot, Nedarim, Nazir, Sotah, Gittin, Kiddushin |
| Nezikin (נזיקין) | Bava Kamma, Bava Metzia, Bava Batra, Sanhedrin, Makkot, Shevuot, Eduyot, Avodah Zarah, Avot, Horayot |
| Kodashim (קדשים) | Zevachim, Menachot, Chullin, Bekhorot, Arakhin, Temurah, Keritot, Meilah, Tamid, Middot, Kinnim |
| Tahorot (טהרות) | Keilim, Ohalot, Negaim, Parah, Tahorot, Mikvaot, Niddah, Makhshirin, Zavim, Tevul Yom, Yadayim, Oktzin |

## Rebuilding the data

```bash
npm run download   # fetches from Sefaria API (~25 min, rate-limited)
npm run build      # rebuilds dist/
```

To use a different English version, set `SEFARIA_EN_VERSION` to the Sefaria version title before running the download script.

---

## Legal

### Sefaria

This package retrieves data from the [Sefaria API](https://www.sefaria.org/api/docs) and redistributes the resulting text. Use of the Sefaria API is subject to the [Sefaria Terms of Service](https://www.sefaria.org/terms). This project is not affiliated with or endorsed by Sefaria.

### English translation — William Davidson Edition

The English translation included in this package is the **William Davidson Edition** (Koren Talmud Bavli / Noé Edition), translated by Rabbi Adin Even-Israel Steinsaltz.

- **Copyright:** © Koren Publishers Jerusalem Ltd.
- **License:** [Creative Commons Attribution-NonCommercial 4.0 International (CC BY-NC 4.0)](https://creativecommons.org/licenses/by-nc/4.0/)
- **Source:** [Koren Publishers](https://korenpub.com) via [Sefaria](https://www.sefaria.org)

**This license permits sharing and adapting the text for non-commercial purposes only, provided that appropriate credit is given.** If you intend to use this package in a commercial product, you must obtain a separate license from [Koren Publishers](https://korenpub.com).

Attribution for the English text must include:
> English translation: William Davidson Edition, © Koren Publishers Jerusalem Ltd., via Sefaria (sefaria.org). Licensed under CC BY-NC 4.0.

### Hebrew text — Torat Emet

The Hebrew text is sourced from **Torat Emet** (תורת אמת), a vocalized Mishnah text.

- **License:** Public Domain
- **Source:** [Torat Emet Freeware](http://www.toratemetfreeware.com) via [Sefaria](https://www.sefaria.org)

### This package

The code in this repository (everything except the text content in `data/`) is released under the [MIT License](https://opensource.org/licenses/MIT).
