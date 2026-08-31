function createBoard(): HTMLElement {
    const board: HTMLElement = document.createElement("div");
    board.classList.add("board");
    document.body.appendChild(board);
    const pieceContainer: HTMLElement = document.createElement("div");
    pieceContainer.classList.add("piece-container");
    board.appendChild(pieceContainer);
    return board;
}

function addSquares(board: HTMLElement) {

    const cellContainer: HTMLElement = document.createElement("div");
    cellContainer.classList.add("cell-container"); 
    board.appendChild(cellContainer);

    for (let y: number = 0; y < 8; y++) {
        for (let x: number = 0; x < 8; x++) {
            const sq: HTMLElement = document.createElement("div");
            sq.classList.add(...["sq", (x + y) % 2 ? "dark" : "light"]);
            cellContainer.appendChild(sq)
        }
    }
}

function charIsLetter(c: string): boolean {
    return "abcdefghijklmnopqrstuvwxyz".includes(c.toLowerCase());
}

function charIsNumber(c: string): boolean {
    return "0123456789".includes(c);
}

enum PieceTeam {
    Black, 
    White
}

enum PieceKind {
    Pawn,
    Bishop,
    Knight, 
    Rook,
    Queen,
    King
}

function addPiece (
    board: HTMLElement, 
    team: PieceTeam, 
    kind: PieceKind, 
    x: number, y: number
){
    let teamStr: string;
    let pieceStr: string;

    switch(team) {
        case PieceTeam.Black: teamStr = "b"; break;
        case PieceTeam.White: teamStr = "w"; break;
    } 

    
    switch (kind) {
        case PieceKind.Pawn: pieceStr = "p"; break;
        case PieceKind.Bishop: pieceStr = "b"; break;
        case PieceKind.Knight: pieceStr = "n"; break;
        case PieceKind.Rook: pieceStr = "r"; break;
        case PieceKind.Queen: pieceStr = "q"; break;
        case PieceKind.King: pieceStr = "k"; break;
    }

    const piece: HTMLElement = document.createElement("div");

    console.log(teamStr + pieceStr);
    piece.classList.add(...["piece", teamStr + pieceStr, `t${x}${y}`]);
    board.appendChild(piece);
}

function isWhitePiece(c: string): boolean {
    return "PNBRQK".includes(c);
}

function loadFEN(fen: string, board: HTMLElement) {
    let x = 0;
    let y = 0;

    for (let i = 0; i < fen.length; i++) {
        if (fen[i] == "/") {
            x = 0; 
            y += 1;
        } else if (charIsLetter(fen[i] as string)) {
            let pieceTeam: PieceTeam = isWhitePiece(fen[i] as string) ? PieceTeam.White : PieceTeam.Black;

            switch (fen[i]?.toLowerCase()) {
                case "p": addPiece(board, pieceTeam, PieceKind.Pawn, x, y); break;
                case "n": addPiece(board, pieceTeam, PieceKind.Knight, x, y); break;
                case "b": addPiece(board, pieceTeam, PieceKind.Bishop, x, y); break;
                case "q": addPiece(board, pieceTeam, PieceKind.Queen, x, y); break;
                case "r": addPiece(board, pieceTeam, PieceKind.Rook, x, y); break;
                case "k": addPiece(board, pieceTeam, PieceKind.King, x, y); break;
            }

            x += 1;
        } else if (charIsNumber(fen[i] as string)) {
            x += Number(fen[i]);
        }
    }
}


document.addEventListener("DOMContentLoaded", () => {
    const board: HTMLElement = createBoard();
    addSquares(board);
    loadFEN("rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR", board);
});