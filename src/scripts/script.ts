function createBoard() {
    const board = document.createElement("div");
    board.classList.add("board");
    document.body.appendChild(board);
}


document.addEventListener("DOMContentLoaded", () => {
    createBoard();
});