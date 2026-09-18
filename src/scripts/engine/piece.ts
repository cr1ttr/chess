import Board from "./board.js";
import type { GameState } from "./game.js";
import Vector2 from "./vector2.js";

export type PieceKind = 'pawn' | 'knight' | 'bishop' | 'rook' | 'queen' | 'king';
export type PieceTeam = 'black' | 'white';

function generateRayMoves(piece: Piece, state: GameState, pos: Vector2, dir: Vector2): Vector2[] {
    let moveList: Vector2[] = [];
    let curSq: Vector2 = pos;


    while (true) {
        const dSq: Vector2 = curSq.add(dir);
        
        if (Board.outOfBounds(dSq)) break;

        if (state.board.isSquareOccupiedByColor(dSq, piece.getOppositeColor())) {
            moveList.push(dSq);
            break;
        }

        if (state.board.isSquareOccupied(dSq)) {
            break;
        }

        moveList.push(dSq);
        curSq = curSq.add(dir);
    }

    return moveList;
}

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

            if (!Board.outOfBounds(dSq)) continue;

            if (!state.board.isSquareOccupied(dSq) || state.board.isSquareOccupiedByColor(dSq, this.getOppositeColor())) {
                moveList.push(dSq);   
            }
        }

        return moveList;
    }
}

export class Bishop extends Piece {
    generateMovesAt(state: GameState, pos: Vector2): Vector2[] {
        let moveList: Vector2[] = [];

        const DIRECTIONS: Vector2[] = [
            new Vector2(1, 1),
            new Vector2(1, -1),
            new Vector2(-1, -1),
            new Vector2(-1, 1)
        ];

        for (let i = 0; i < DIRECTIONS.length; i++) {
            moveList.push(...generateRayMoves(this, state, pos, DIRECTIONS[i]!));
        }

        return moveList;
    }
}

export class Rook extends Piece {
    generateMovesAt(state: GameState, pos: Vector2): Vector2[] {
        let moveList: Vector2[] = [];

        const DIRECTIONS: Vector2[] = [
            Vector2.MATH_UP,
            Vector2.MATH_RIGHT,
            Vector2.MATH_DOWN,
            Vector2.MATH_LEFT
        ];

        for (let i = 0; i < DIRECTIONS.length; i++) {
            moveList.push(...generateRayMoves(this, state, pos, DIRECTIONS[i]!));
        }

        return moveList;
    }
}

export class Queen extends Piece {
    generateMovesAt(state: GameState, pos: Vector2): Vector2[] {
        let moveList: Vector2[] = [];

        const DIRECTIONS: Vector2[] = [
            Vector2.MATH_DOWN,
            Vector2.MATH_LEFT,
            Vector2.MATH_UP,
            Vector2.MATH_RIGHT,
            new Vector2(1, 1),
            new Vector2(-1, 1),
            new Vector2(1, -1),
            new Vector2(-1, -1)
        ];

        for (let i = 0; i < DIRECTIONS.length; i++) {
            moveList.push(...generateRayMoves(this, state, pos, DIRECTIONS[i]!));
        }

        return moveList;
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