export type TeamID = 'team1' | 'team2';

export interface Team {
    id: TeamID;
    name: string;
    color: string;
}

export interface Round {
    id: string;
    order: number;
    name: string;
    pointsValue: number;
    winnerId: TeamID | null;
}

export enum GameStatus {
    SETUP = 'SETUP',
    PLAYING = 'PLAYING',
    FINISHED = 'FINISHED'
}

export interface GameState {
    status: GameStatus;
    teams: {
        team1: Team;
        team2: Team;
    };
    rounds: Round[];
}
