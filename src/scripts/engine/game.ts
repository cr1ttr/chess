import Board from "./board.js"
import CastlingRights from "./castling_rights.js";
import FEN from "./fen.js";
import Timer from "./timer.js";
import Vector2 from "./vector2.js";

export default class Game {
    state: Board = new Board();
    blackCastlingRights: CastlingRights;
    whiteCastlingRights: CastlingRights;
    whiteTimer: Timer | undefined = undefined;
    blackTimer: Timer | undefined = undefined;
    turnToMove: 'black' | 'white';
    halfMoves: number;
    fullMoves: number;
    enPassantSquare: Vector2 | undefined;


    constructor() {
        FEN.loadPosition("rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR", this);
        this.blackCastlingRights = new CastlingRights({kingSide: true, queenSide: true});
        this.whiteCastlingRights = new CastlingRights({kingSide: true, queenSide: true});
        this.whiteTimer = undefined;
        this.blackTimer = undefined;
        this.turnToMove = 'white';
        this.halfMoves = 0;
        this.fullMoves = 1;
        this.enPassantSquare = undefined;
    }
}