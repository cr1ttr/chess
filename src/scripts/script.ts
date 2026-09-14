import FEN from "./engine/fen.js";
import Game from "./engine/game.js";
import ChessRendererHTML from "./rendering/render.js";


document.addEventListener("DOMContentLoaded", () => {
    const game = new Game();
    FEN.load("r1bqkb1r/pp3ppp/2n1p1n1/2pp4/3P4/4PNB1/PPP1BPPP/RN1Q1RK1 b kq - 6 7", game.state);
    const renderer = new ChessRendererHTML(document.querySelector("#main-board-container")!, game);
});