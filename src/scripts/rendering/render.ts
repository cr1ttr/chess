import type Game from "../engine/game.js";
import Vector2 from "../engine/vector2.js";
import { Piece, Pawn, Knight, Bishop, Rook, Queen, King } from "../engine/piece.js";
import { createDivElement } from "../utils/html.js";





export default class ChessRendererHTML {
    board: HTMLElement;
    pieceContainer: HTMLElement;
    cellContainer: HTMLElement;
    decorContainer: HTMLElement;

    constructor(parent: HTMLElement, game: Game) {
        this.board = createDivElement(parent, "board");
        this.pieceContainer = createDivElement(this.board, "piece-container");
        this.cellContainer = createDivElement(this.board, "cell-container");
        this.decorContainer = createDivElement(this.board, "decor-container");

        for (let y: number = 0; y < 8; y++) {
            for (let x: number = 0; x < 8; x++) {
                const sq: HTMLElement = document.createElement("div");
                sq.addEventListener("mousedown", () => {

                    const sq: Piece | null = game.state.board.squares[y]![x]!;
                    let moves: Vector2[] = [];

                    if (sq !== null) {
                        moves = sq.generateMovesAt(game.state, new Vector2(x, y));
                    }
                    
                    for (let i = 0; i < moves.length; i++) {
                        const move = moves[i]!;

                        const pip = document.createElement("div");
                        pip.classList.add(`move-pip`, `t${move.x}${move.y}`);
                        this.decorContainer.appendChild(pip);
                    }
                });
                sq.addEventListener("mouseup", () => {
                    this.decorContainer.replaceChildren();
                });

                sq.classList.add(...["sq", (x + y) % 2 ? "dark" : "light"]);
                this.cellContainer.appendChild(sq)

                const piece: Piece | null = game.state.board.squares[y]![x]!;

                let teamStr: string = "";
                let pieceStr: string = "";

                if (piece !== null) {
                    switch (piece.team) {
                        case 'black': teamStr = "b"; break;
                        case 'white': teamStr = "w"; break;
                    }
    
                    switch (true) {
                        case piece instanceof Pawn: pieceStr = "p"; break;
                        case piece instanceof Bishop: pieceStr = "b"; break;
                        case piece instanceof Knight: pieceStr = "n"; break;
                        case piece instanceof Rook: pieceStr = "r"; break;
                        case piece instanceof Queen: pieceStr = "q"; break;
                        case piece instanceof King: pieceStr = "k"; break;
                        default: break;
                    }

                    const pieceElement: HTMLElement = document.createElement("div");
    
                    pieceElement.classList.add(...["piece", teamStr + pieceStr, `t${x}${y}`]);
                    this.board.appendChild(pieceElement);
                }
            }
        }
    }

    destroy() {
        this.board.remove();
    }
}