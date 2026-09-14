import Board from "./board.js";
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
        
        let dir: Vector2 = Vector2.ZERO; 
        
        switch (this.team) {
            case 'black': dir = Vector2.SCREEN_DOWN; break;
            case 'white': dir = Vector2.SCREEN_UP; break;
        };

        const singlePush = pos.add(dir);
        const doublePush = pos.add(dir.multiply(2));

        if (!board.isSquareOccupied(singlePush) && !Board.outOfBounds(singlePush)) {
            moveList.push(singlePush);

            if (!this.hasMoved && !board.isSquareOccupied(doublePush) && !Board.outOfBounds(doublePush)) {
                moveList.push(doublePush);
            }
        }

        return moveList;
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