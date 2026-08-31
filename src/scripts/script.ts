function createBoard(): HTMLElement {
    const board: HTMLElement = document.createElement("div");
    board.classList.add("board");
    document.body.appendChild(board);
    return board;
}

function addSquares(board: HTMLElement) {
    for (let y: number = 0; y < 8; y++) {
        for (let x: number = 0; x < 8; x++) {
            const sq: HTMLElement = document.createElement("div");
            sq.classList.add((x + y) % 2 ? "sq-dark" : "sq-light");
            board.appendChild(sq)
        }
    }
}


document.addEventListener("DOMContentLoaded", () => {
    const board: HTMLElement = createBoard();
    addSquares(board);
});