import type Board from "./board.js";
import Vector2 from "./vector2.js";

export type PieceKind = 'pawn' | 'knight' | 'bishop' | 'rook' | 'queen' | 'king';
export type PieceTeam = 'black' | 'white';

export abstract class Piece {
    team: PieceTeam;
    hasMoved: boolean;

    constructor(team: PieceTeam) {
        this.team = team;
        this.hasMoved = false;
    }

    abstract generateMovesAt(board: Board, pos: Vector2): Vector2[];
}

export class Pawn extends Piece {
    generateMovesAt(board: Board, pos: Vector2): Vector2[] {
        let moveList: Vector2[] = [];
        
        if (pos.add(Vector2.MATH_UP)) {
            
        }




        // if (pos.add())

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