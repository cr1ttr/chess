import type Board from "./board.js";
import type Vector2 from "./vector2.js";

export type PieceKind = 'pawn' | 'knight' | 'bishop' | 'rook' | 'queen' | 'king';
export type PieceTeam = 'black' | 'white';

export abstract class Piece {
    team: PieceTeam;

    constructor(team: PieceTeam) {
        this.team = team;
    }

    abstract generateMovesAt(board: Board, pos: Vector2): Vector2[];
}

export class Pawn extends Piece {
    generateMovesAt(board: Board, pos: Vector2): Vector2[] {
        
        throw new Error("Method not implemented.");
    }
}

export class Knight extends Piece {
    generateMovesAt(board: Board, pos: Vector2): Vector2[] {
        throw new Error("Method not implemented.");
    }
}

export class Bishop extends Piece {
    generateMovesAt(board: Board, pos: Vector2): Vector2[] {
        throw new Error("Method not implemented.");
    }
}

export class Rook extends Piece {
    generateMovesAt(board: Board, pos: Vector2): Vector2[] {
        throw new Error("Method not implemented.");
    }
}

export class Queen extends Piece {
    generateMovesAt(board: Board, pos: Vector2): Vector2[] {
        throw new Error("Method not implemented.");
    }
}

export class King extends Piece {
    generateMovesAt(board: Board, pos: Vector2): Vector2[] {
        throw new Error("Method not implemented.");
    }
}