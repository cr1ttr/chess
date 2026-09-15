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

    getOppositeColor(): PieceTeam {
        switch (this.team) {
            case 'black': return 'white';
            case 'white': return 'black';
        }
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
        let moveList: Vector2[] = [];

        const offset: Vector2[] = [
            new Vector2(2, -1),
            new Vector2(2, 1),
            new Vector2(-1, -2),
            new Vector2(-2, -1),
            new Vector2(-2, 1),
            new Vector2(1, -2),
            new Vector2(1, 2),
            new Vector2(-1, 2)
        ];

        for (let i = 0; i < offset.length; i++) {
            const dSq: Vector2 = pos.add(offset[i]!);

            if (!Board.outOfBounds(dSq)) {
                if (!state.board.isSquareOccupied(dSq) || state.board.isSquareOccupiedByColor(dSq, this.getOppositeColor())) {
                    moveList.push(dSq);
                }
            }
        }

        return moveList;
    }
}

export class Bishop extends Piece {
    generateMovesAt(state: GameState, pos: Vector2): Vector2[] {
        throw new Error("Method not implemented.");
    }
}

export class Rook extends Piece {
    generateMovesAt(state: GameState, pos: Vector2): Vector2[] {
        let moveList: Vector2[] = [];

        for (let y = pos.y + 1; y < 8; y++) {
            const dSq: Vector2 = new Vector2(pos.x, y);
            if (!Board.outOfBounds(dSq)) {
                if (state.board.isSquareOccupiedByColor(dSq, this.getOppositeColor())) {
                    moveList.push(dSq);
                    break;
                }
                if (state.board.isSquareOccupiedByColor(dSq, this.team)) {
                    break;
                }

                moveList.push(dSq);
            }
        }

        for (let y = pos.y - 1; y > 0; y--) {
            const dSq: Vector2 = new Vector2(pos.x, y);
            if (!Board.outOfBounds(dSq)) {
                if (state.board.isSquareOccupiedByColor(dSq, this.getOppositeColor())) {
                    moveList.push(dSq);
                    break;
                }
                if (state.board.isSquareOccupiedByColor(dSq, this.team)) {
                    break;
                }

                moveList.push(dSq);
            }
        }

        for (let x = pos.x + 1; x < 8; x++) {
            const dSq: Vector2 = new Vector2(x, pos.y);
            if (!Board.outOfBounds(dSq)) {
                if (state.board.isSquareOccupiedByColor(dSq, this.getOppositeColor())) {
                    moveList.push(dSq);
                    break;
                }
                if (state.board.isSquareOccupiedByColor(dSq, this.team)) {
                    break;
                }

                moveList.push(dSq);
            }
        }

        for (let x = pos.x - 1; x > 0; x--) {
            const dSq: Vector2 = new Vector2(x, pos.y);
            if (!Board.outOfBounds(dSq)) {
                if (state.board.isSquareOccupiedByColor(dSq, this.getOppositeColor())) {
                    moveList.push(dSq);
                    break;
                }
                if (state.board.isSquareOccupiedByColor(dSq, this.team)) {
                    break;
                }

                moveList.push(dSq);
            }
        }

        
        return moveList;
    }
}

export class Queen extends Piece {
    generateMovesAt(state: GameState, pos: Vector2): Vector2[] {
        throw new Error("Method not implemented.");
    }
}

export class King extends Piece {
    generateMovesAt(state: GameState, pos: Vector2): Vector2[] {
        let moveList: Vector2[] = [];

        let opposingColor: PieceTeam;
        
        switch (this.team) {
            case 'black': opposingColor = 'white';
            case 'white': opposingColor = 'black';
        } 

        for (let y = -1; y <= 1; y++) {
            for (let x = -1; x <= 1; x++) {
                const dSq: Vector2 = pos.add(new Vector2(x, y));
                if (dSq.equals(Vector2.ZERO)) continue;
                if (state.board.isSquareOccupiedByColor(dSq, this.team) || Board.outOfBounds(dSq)) continue;
                moveList.push(dSq);
            }
        }

        return moveList;
    }
}