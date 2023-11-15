export interface Game {
id: number;
    name: string;
    slug: string;
    visible: boolean;
    solved: boolean;
}

export interface SolutionError {
    message: string;
    trace?: string | undefined;
}

export interface SolutionValidationFunction {
    (payload: any): boolean;
}

export interface ContextRect {
    colIndex: number;
    rowIndex: number;
    value: number;
    index: number;
}

export interface CheckSolutionResponse {
    data?: { ok: boolean },
    error?: SolutionError | undefined
}

export interface Submission {
    id: number,
    createdAt?: string,
    updatedAt?: string,
    submitterId: number,
    teamId: string,
    gameId: number,
    contestId: number,
    gameSolved: boolean,
    score: number,
    data: string,
    team?: Team,
    game: Game,
}

export interface Teammate {
    accountId: number;
    name: string;
    username: string;
    picture?: string;
    status: number;
}

export interface Team {
    id: number;
    title: string;
    description?: string;
    hashId: string;
    slug: string;
    score: number;
    avatar?: string;
    teammates: Teammate[];
}

export interface GameScore {
    score: number
}

export interface scoreBoardType {
    name: String,
    score: number,
    gameScore: GameScore[]
}

export interface Contests {
    id: number;
    externalContestId: string;
    externalContestType: string;
    showLeaderBoard: boolean;
    isActive: boolean;
}
  