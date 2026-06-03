export interface Mishna {
  mishna: number;
  hebrew: string;
  english: string;
}

export interface Perek {
  perek: number;
  mishnayot: Mishna[];
}

export interface Tractate {
  name: string;
  hebrewName: string;
  sefariaId: string;
  seder: string;
  sederHebrewName: string;
  perakim: Perek[];
}
