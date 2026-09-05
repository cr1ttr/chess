class FEN {

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

    loadPosition(fen: string, board: HTMLElement) {

    }
}