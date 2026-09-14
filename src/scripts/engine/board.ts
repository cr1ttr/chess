import { Piece, type PieceTeam } from "./piece.js";
import type Vector2 from "./vector2.js";

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

    isSquareOccupied(pos: Vector2): boolean {
        if (Board.outOfBounds(pos)) return false;
        return this.squares[pos.y]![pos.x]! != null;
    } 

    isSquareOccupiedByColor(pos: Vector2, team: PieceTeam): boolean {
        if (Board.outOfBounds(pos)) return false;
        const piece: Piece | null = this.squares[pos.y]![pos.x]!;
        return piece != null && piece.team == team;
    }

    static outOfBounds(pos: Vector2): boolean {
        return (pos.x < 0 || pos.x > 7) || (pos.y < 0 || pos.y > 7);
    }
}