import Board from "./board"
import CastlingRights from "./castling_rights";
import Timer from "./timer";
// import EventEmitter from "./event_emitter";

export default class Game {
    state: Board;
    blackCastlingRights: CastlingRights;
    whiteCastlingRights: CastlingRights;
    whiteTimer: Timer;
    blackTimer: Timer;


    constructor() {
        this.state = new Board();
        this.blackCastlingRights = new CastlingRights({kingSide: true, queenSide: true});
        this.whiteCastlingRights = new CastlingRights({kingSide: true, queenSide: true});
        this.whiteTimer = new Timer();
        this.blackTimer = new Timer();
    }
}