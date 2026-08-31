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

document.addEventListener("DOMContentLoaded", () => {
    const board: HTMLElement = createBoard();
    addSquares(board);
});