import Storage from "./Storage";

export interface HanabiData {
    players: string[];
    hands: string[][];
    pile: string[];
    turn: number;
    start: boolean;
    blueCoins: number;
    redCoins: number;
    host: string;
    hints: string[][];
}

export default new Storage<HanabiData>("hanabi")