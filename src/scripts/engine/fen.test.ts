import Game from "./game";
import FEN from "./fen";
import Piece, { type PieceKind } from "./piece";
import CastlingRights from "./castling_rights";


test('tests that the default FEN string position resolves', () => {
    const game = new Game();
    FEN.load("rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1", game.state);

    const expected = new Game();

    const pieceOrder: PieceKind[] = [
        'rook', 
        'knight', 
        'bishop', 
        'queen', 
        'king', 
        'bishop', 
        'knight', 
        'rook' 
    ]

    for (let i = 0; i < 8; i++) {
        expected.state.board.squares[0]![i]! = new Piece(pieceOrder[i]!, 'black');
        expected.state.board.squares[7]![i]! = new Piece(pieceOrder[i]!, 'white');
    }


    for (let i = 0; i < 8; i ++) {
        expected.state.board.squares[1]![i]! = new Piece('pawn', 'black')
        expected.state.board.squares[6]![i]! = new Piece('pawn', 'white');
    }

    expected.state.blackCastlingRights = new CastlingRights({kingSide: true, queenSide: true});
    expected.state.whiteCastlingRights = new CastlingRights({kingSide: true, queenSide: true});

    expected.state.enPassantSquare = undefined;
    expected.state.halfMoves = 0;
    expected.state.fullMoves = 1;
    expected.state.turnToMove = 'white';

    expect(game.state).toStrictEqual(expected.state);
});