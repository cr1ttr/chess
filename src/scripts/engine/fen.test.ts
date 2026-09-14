import Game from "./game.js";
import FEN from "./fen.js";
import { Pawn, Knight, Bishop, Rook, Queen, King } from "./piece.js";
import CastlingRights from "./castling_rights.js";


test('tests that the default FEN string position resolves', () => {
    const game = new Game();
    FEN.load("rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1", game.state);

    const expected = new Game();

    const pieceOrder: (typeof Knight | typeof Rook | typeof Queen | typeof Bishop | typeof King)[] = [
        Rook,
        Knight,
        Bishop,
        Queen,
        King,
        Bishop,
        Knight,
        Rook
    ];

    for (let i = 0; i < 8; i++) {
        expected.state.board.squares[0]![i]! = new pieceOrder[i]!('black');
        expected.state.board.squares[7]![i]! = new pieceOrder[i]!('white');
        expected.state.board.squares[1]![i]! = new Pawn('black');
        expected.state.board.squares[6]![i]! = new Pawn('white');
    }

    expected.state.blackCastlingRights = new CastlingRights({kingSide: true, queenSide: true});
    expected.state.whiteCastlingRights = new CastlingRights({kingSide: true, queenSide: true});

    expected.state.enPassantSquare = undefined;
    expected.state.halfMoves = 0;
    expected.state.fullMoves = 1;
    expected.state.turnToMove = 'white';

    expect(game.state).toStrictEqual(expected.state);
});