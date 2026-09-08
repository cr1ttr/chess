import type Game from "../engine/game.js";
import type Piece from "../engine/piece.js";

export default class ChessRendererHTML {
    board: HTMLElement;
    pieceContainer: HTMLElement;
    cellContainer: HTMLElement;

    constructor(parent: HTMLElement, game: Game) {
        this.board = document.createElement("div");
        this.board.classList.add("board");

        parent.appendChild(this.board);

        this.pieceContainer = document.createElement("div");
        this.pieceContainer.classList.add("piece-container");
        this.board.appendChild(this.pieceContainer);

        this.cellContainer = document.createElement("div");
        this.cellContainer.classList.add("cell-container");
        this.board.appendChild(this.cellContainer);

        for (let y: number = 0; y < 8; y++) {
            for (let x: number = 0; x < 8; x++) {
                const sq: HTMLElement = document.createElement("div");
                sq.classList.add(...["sq", (x + y) % 2 ? "dark" : "light"]);
                this.cellContainer.appendChild(sq)

                const piece: Piece | null = game.state.squares[y]![x]!;

                let teamStr: string;
                let pieceStr: string;

                if (piece !== null) {
                    switch (piece.team) {
                        case 'black': teamStr = "b"; break;
                        case 'white': teamStr = "w"; break;
                    }
    
                    switch (piece.kind) {
                        case 'pawn': pieceStr = "p"; break;
                        case 'bishop': pieceStr = "b"; break;
                        case 'knight': pieceStr = "n"; break;
                        case 'rook': pieceStr = "r"; break;
                        case 'queen': pieceStr = "q"; break;
                        case 'king': pieceStr = "k"; break;
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