export type Team = {
  name: string;
  members: string[];
};

export type GeneratorState =
  | { type: 'input' }
  | { type: 'spinning' }
  | { type: 'results'; teams: Team[] };
