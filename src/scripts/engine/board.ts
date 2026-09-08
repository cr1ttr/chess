import type Piece from "./piece.js";

export default class Board {
    public static readonly WIDTH: number = 8;
    public static readonly HEIGHT: number = 8;

    squares: Array<Array<Piece | null>> = [];


    constructor() {
        for (let y = 0; y < Board.HEIGHT; y++) {
            let tmp: Array<Piece | null> = [];
            for (let x = 0; x < Board.WIDTH; x++) tmp.push(null);
            this.squares.push(tmp);
        }
    }

    clear() {
        for (let y = 0; y < Board.HEIGHT; y++) {
            for (let x = 0; x < Board.WIDTH; x++) {
                this.squares[y]![x] = null;
            }
        }
    }
}