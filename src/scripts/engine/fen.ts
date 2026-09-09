import type Game from "./game.js";
import { isAlpha, isNum, isNonZeroNum, isValidAlgebraicNotation, isValidCastlingRightsString, isValidFenPiece, isZeroToSeven } from "../utils/string.js"
import { parseAlgebraicNotation } from "../utils/vector.js";
import CastlingRights from "./castling_rights.js";
import Piece from "./piece.js";
import type { GameState } from "./game.js";

export default class FEN {
    // Describes the expected number of args in a FEN string. 
    public static readonly ARGS_LENGTH: number = 6;
    
    // The existence of partial FEN string loading based on positioning is 
    // mostly for easy board setup to prevent the awkward case in early
    // development where you need to test basic positions but can't without
    // doing something like:
    //
    // ...
    //
    // board.addPiece(new Piece(PieceTeam.Black, PieceKind.Rook), 0, 0);
    // board.addPiece(new Piece(PieceTeam.Black, PieceKind.Knight), 1, 0);
    // board.addPiece(new Piece(PieceTeam.Black, PieceKind.Bishop), 2, 0);
    //
    // ...
    static loadPosition(str: string, game: GameState) {
        game.board.clear();

        let x = 0;
        let y = 0;
        
        for(let i = 0; i < str.length; i++) {
            // Since all characters are contained in the length of the string we can ignore safety checks here to narrow 'string | undefined' into 'string'.
            const ch = str[i]!;

            if (ch === '/') {
                x = 0;
                y += 1;
            } else if (isValidFenPiece(ch)) {
                switch (ch) {
                    case 'p': game.board.squares[y]![x]! = new Piece('pawn', 'black'); break;
                    case 'b': game.board.squares[y]![x]! = new Piece('bishop', 'black'); break;
                    case 'n': game.board.squares[y]![x]! = new Piece('knight', 'black'); break;
                    case 'r': game.board.squares[y]![x]! = new Piece('rook', 'black'); break;
                    case 'q': game.board.squares[y]![x]! = new Piece('queen', 'black'); break;
                    case 'k': game.board.squares[y]![x]! = new Piece('king', 'black'); break;

                    case 'P': game.board.squares[y]![x]! = new Piece('pawn', 'white'); break;
                    case 'B': game.board.squares[y]![x]! = new Piece('bishop', 'white'); break;
                    case 'N': game.board.squares[y]![x]! = new Piece('knight', 'white'); break;
                    case 'R': game.board.squares[y]![x]! = new Piece('rook', 'white'); break;
                    case 'Q': game.board.squares[y]![x]! = new Piece('queen', 'white'); break;
                    case 'K': game.board.squares[y]![x]! = new Piece('king', 'white'); break;
                }

                x += 1;

            } else if (isZeroToSeven(ch)) {
                const parsed: number = Number(ch);

                if (x + parsed > 8) {
                    console.error('FEN Loading Error: X position exceeds board limits.')
                    return;
                }

                x += parsed;
            }
        }
    }

    static loadTurn(str: string, game: GameState) {
        switch(str) {
            case 'w': game.turnToMove = 'white'; break;
            case 'b': game.turnToMove = 'black'; break;
        }
    }

    static loadCastlingRights(str: string, game: GameState) {
        if (isValidCastlingRightsString(str)) {
            if (str === '-') {
                game.whiteCastlingRights = new CastlingRights({kingSide: false, queenSide: false});
                game.blackCastlingRights = new CastlingRights({kingSide: false, queenSide: false});
            } else {
                const charSet = new Set<string>();

                for (let i = 0; i < str.length; i++) charSet.add(str[i]!);

                game.whiteCastlingRights.kingSide = charSet.has('K');
                game.whiteCastlingRights.queenSide = charSet.has('Q');
                game.blackCastlingRights.kingSide = charSet.has('k');
                game.blackCastlingRights.queenSide = charSet.has('q');
            }
        }
    }

    static loadEnPassantSquare(str: string, game: GameState) {
        if (isValidAlgebraicNotation(str)) {
            game.enPassantSquare = parseAlgebraicNotation(str);
        }

    }

    static loadHalfMoves(str: string, game: GameState) {
        if (isNum(str)) {
            game.halfMoves = Number(str)
        } 
    }

    static loadFullMoves(str: string, game: GameState) {
        if (isNonZeroNum(str)) {
            game.fullMoves = Number(str);
        }
    }

    static load(fen: string, game: GameState): void {
        let x = 0;
        let y = 0;

        let split_fen = fen.split(' ');

        if (split_fen.length != FEN.ARGS_LENGTH) return;

        const position = split_fen[0]!;
        const turn = split_fen[1]!;
        const castlingRights = split_fen[2]!;
        const enPassantSquare = split_fen[3]!;
        const halfMoves = split_fen[4]!;
        const fullMoves = split_fen[5]!;

        this.loadPosition(position, game);
        this.loadTurn(turn, game);
        this.loadCastlingRights(castlingRights, game);
        this.loadEnPassantSquare(enPassantSquare, game);
        this.loadHalfMoves(halfMoves, game);
        this.loadFullMoves(fullMoves, game);
    }
}