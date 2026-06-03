export type { Mishna, Perek, Tractate } from "./types.js";
export type { SederDefinition, TractateDefinition } from "./tractates.js";
export { SEDARIM } from "./tractates.js";

import { createRequire } from "module";
import type { Tractate } from "./types.js";

const _require = createRequire(import.meta.url);

export const BERAKHOT:     Tractate = _require("../data/berakhot.json");
export const PEAH:         Tractate = _require("../data/peah.json");
export const DEMAI:        Tractate = _require("../data/demai.json");
export const KILAYIM:      Tractate = _require("../data/kilayim.json");
export const SHEVIIT:      Tractate = _require("../data/sheviit.json");
export const TERUMOT:      Tractate = _require("../data/terumot.json");
export const MAASROT:      Tractate = _require("../data/maasrot.json");
export const MAASER_SHENI: Tractate = _require("../data/maaser-sheni.json");
export const CHALLAH:      Tractate = _require("../data/challah.json");
export const ORLAH:        Tractate = _require("../data/orlah.json");
export const BIKKURIM:     Tractate = _require("../data/bikkurim.json");

export const SHABBAT:      Tractate = _require("../data/shabbat.json");
export const ERUVIN:       Tractate = _require("../data/eruvin.json");
export const PESACHIM:     Tractate = _require("../data/pesachim.json");
export const SHEKALIM:     Tractate = _require("../data/shekalim.json");
export const YOMA:         Tractate = _require("../data/yoma.json");
export const SUKKAH:       Tractate = _require("../data/sukkah.json");
export const BEITZAH:      Tractate = _require("../data/beitzah.json");
export const ROSH_HASHANAH:Tractate = _require("../data/rosh-hashanah.json");
export const TAANIT:       Tractate = _require("../data/taanit.json");
export const MEGILLAH:     Tractate = _require("../data/megillah.json");
export const MOED_KATAN:   Tractate = _require("../data/moed-katan.json");
export const CHAGIGAH:     Tractate = _require("../data/chagigah.json");

export const YEVAMOT:      Tractate = _require("../data/yevamot.json");
export const KETUBOT:      Tractate = _require("../data/ketubot.json");
export const NEDARIM:      Tractate = _require("../data/nedarim.json");
export const NAZIR:        Tractate = _require("../data/nazir.json");
export const SOTAH:        Tractate = _require("../data/sotah.json");
export const GITTIN:       Tractate = _require("../data/gittin.json");
export const KIDDUSHIN:    Tractate = _require("../data/kiddushin.json");

export const BAVA_KAMMA:   Tractate = _require("../data/bava-kamma.json");
export const BAVA_METZIA:  Tractate = _require("../data/bava-metzia.json");
export const BAVA_BATRA:   Tractate = _require("../data/bava-batra.json");
export const SANHEDRIN:    Tractate = _require("../data/sanhedrin.json");
export const MAKKOT:       Tractate = _require("../data/makkot.json");
export const SHEVUOT:      Tractate = _require("../data/shevuot.json");
export const EDUYOT:       Tractate = _require("../data/eduyot.json");
export const AVODAH_ZARAH: Tractate = _require("../data/avodah-zarah.json");
export const AVOT:         Tractate = _require("../data/avot.json");
export const HORAYOT:      Tractate = _require("../data/horayot.json");

export const ZEVACHIM:     Tractate = _require("../data/zevachim.json");
export const MENACHOT:     Tractate = _require("../data/menachot.json");
export const CHULLIN:      Tractate = _require("../data/chullin.json");
export const BEKHOROT:     Tractate = _require("../data/bekhorot.json");
export const ARAKHIN:      Tractate = _require("../data/arakhin.json");
export const TEMURAH:      Tractate = _require("../data/temurah.json");
export const KERITOT:      Tractate = _require("../data/keritot.json");
export const MEILAH:       Tractate = _require("../data/meilah.json");
export const TAMID:        Tractate = _require("../data/tamid.json");
export const MIDDOT:       Tractate = _require("../data/middot.json");
export const KINNIM:       Tractate = _require("../data/kinnim.json");

export const KEILIM:       Tractate = _require("../data/keilim.json");
export const OHALOT:       Tractate = _require("../data/ohalot.json");
export const NEGAIM:       Tractate = _require("../data/negaim.json");
export const PARAH:        Tractate = _require("../data/parah.json");
export const TAHOROT:      Tractate = _require("../data/tahorot.json");
export const MIKVAOT:      Tractate = _require("../data/mikvaot.json");
export const NIDDAH:       Tractate = _require("../data/niddah.json");
export const MAKHSHIRIN:   Tractate = _require("../data/makhshirin.json");
export const ZAVIM:        Tractate = _require("../data/zavim.json");
export const TEVUL_YOM:    Tractate = _require("../data/tevul-yom.json");
export const YADAYIM:      Tractate = _require("../data/yadayim.json");
export const OKTZIN:       Tractate = _require("../data/oktzin.json");

export const ALL_TRACTATES: Tractate[] = [
  BERAKHOT, PEAH, DEMAI, KILAYIM, SHEVIIT, TERUMOT, MAASROT, MAASER_SHENI, CHALLAH, ORLAH, BIKKURIM,
  SHABBAT, ERUVIN, PESACHIM, SHEKALIM, YOMA, SUKKAH, BEITZAH, ROSH_HASHANAH, TAANIT, MEGILLAH, MOED_KATAN, CHAGIGAH,
  YEVAMOT, KETUBOT, NEDARIM, NAZIR, SOTAH, GITTIN, KIDDUSHIN,
  BAVA_KAMMA, BAVA_METZIA, BAVA_BATRA, SANHEDRIN, MAKKOT, SHEVUOT, EDUYOT, AVODAH_ZARAH, AVOT, HORAYOT,
  ZEVACHIM, MENACHOT, CHULLIN, BEKHOROT, ARAKHIN, TEMURAH, KERITOT, MEILAH, TAMID, MIDDOT, KINNIM,
  KEILIM, OHALOT, NEGAIM, PARAH, TAHOROT, MIKVAOT, NIDDAH, MAKHSHIRIN, ZAVIM, TEVUL_YOM, YADAYIM, OKTZIN,
];
