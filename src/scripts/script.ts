import FEN from "./engine/fen.js";
import Game from "./engine/game.js";
import ChessRendererHTML from "./rendering/render.js";


document.addEventListener("DOMContentLoaded", () => {
    const game = new Game();
    const renderer = new ChessRendererHTML(document.body, game);
});