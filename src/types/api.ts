export interface Character {
  id: number;
  name: string;
  ki: string;
  maxKi: string;
  race: string;
  gender: string;
  description: string;
  image: string;
  affiliation: string;
  deletedAt: null;
  originPlanet?: Planet;
  transformations?: Transformation[];
}

export interface Planet {
  id: number;
  name: string;
  isDestroyed: boolean;
  description: string;
  image: string;
  characters: Character[];
  deletedAt: null;
}

export interface Transformation {
  id: number;
  name: string;
  image: string;
  ki: string;
  deletedAt: null;
}
