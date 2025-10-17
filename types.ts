
export type Screen = 'home' | 'flag-finder' | 'country-match' | 'lightning-round' | 'flag-book' | 'scores';

export type Continent = 'Africa' | 'Asia' | 'Europe' | 'North America' | 'South America' | 'Oceania';

export type Country = {
  code: string;
  name: string;
  continent: Continent;
};

export type GameMode = 'flagFinder' | 'countryMatch' | 'lightningRound';

export type HighScores = Record<GameMode, number>;

export interface Badge {
    id: string;
    name: string;
    description: string;
    type: 'continent' | 'streak' | 'perfection' | 'milestone';
}
