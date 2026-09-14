import Board from "./board.js";
import type { GameState } from "./game.js";
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

    abstract generateMovesAt(state: GameState, pos: Vector2): Vector2[];
}

export class Pawn extends Piece {
    generateMovesAt(state: GameState, pos: Vector2): Vector2[] {
        let moveList: Vector2[] = [];
        
        let dir: Vector2 = Vector2.ZERO; 
        let opposingColor: PieceTeam;
        
        switch (this.team) {
            case 'black': {
                dir = Vector2.SCREEN_DOWN; 
                opposingColor = 'white';
                break;
            }
            case 'white': {
                dir = Vector2.SCREEN_UP; 
                opposingColor = 'black'
                break;
            }
        };


        const singlePush = pos.add(dir);
        const doublePush = pos.add(dir.multiply(2));
        const attackLeft = singlePush.add(Vector2.MATH_LEFT);
        const attackRight = singlePush.add(Vector2.MATH_RIGHT);

        if (!state.board.isSquareOccupied(singlePush) && !Board.outOfBounds(singlePush)) {
            moveList.push(singlePush);

            if (!this.hasMoved && !state.board.isSquareOccupied(doublePush) && !Board.outOfBounds(doublePush)) {
                moveList.push(doublePush);
            }
        }

        if (state.enPassantSquare !== undefined) {
            if (state.board.isSquareOccupiedByColor(attackLeft, opposingColor) || attackLeft.equals(state.enPassantSquare)) {
                moveList.push(attackLeft);
            }
    
            if (state.board.isSquareOccupiedByColor(attackRight, opposingColor) || attackRight.equals(state.enPassantSquare)) {
                moveList.push(attackRight);
            }
        }

        return moveList;
    }
}

export class Knight extends Piece {
    generateMovesAt(state: GameState, pos: Vector2): Vector2[] {
        throw new Error("Method not implemented.");
    }
}

export class Bishop extends Piece {
    generateMovesAt(state: GameState, pos: Vector2): Vector2[] {
        throw new Error("Method not implemented.");
    }
}

export class Rook extends Piece {
    generateMovesAt(state: GameState, pos: Vector2): Vector2[] {
        throw new Error("Method not implemented.");
    }
}

export class Queen extends Piece {
    generateMovesAt(state: GameState, pos: Vector2): Vector2[] {
        throw new Error("Method not implemented.");
    }
}

export class King extends Piece {
    generateMovesAt(state: GameState, pos: Vector2): Vector2[] {
        throw new Error("Method not implemented.");
    }
}