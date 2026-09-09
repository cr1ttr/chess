import FEN from "./engine/fen.js";
import Game from "./engine/game.js";
import ChessRendererHTML from "./rendering/render.js";


document.addEventListener("DOMContentLoaded", () => {
    const game = new Game();
    FEN.load("6Q1/p1p3P1/1k1p2N1/p1n1p2P/5r2/1b6/2n4K/b1q2b2 b - - 29 30", game.state);
    const renderer = new ChessRendererHTML(document.querySelector("#main-board-container")!, game);
});