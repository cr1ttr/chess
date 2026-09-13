import Board from "./board.js"
import FEN from "./fen.js";
import Game from "./game.js";
import Vector2 from "./vector2.js";

describe("Board Functions", () => {
    describe(Board.outOfBounds, () => {
        it("should be in bounds at (0,0)", () => {
            expect(Board.outOfBounds(new Vector2(0, 0))).toBe(false);
        });
        it("should be in bounds at (7,7)", () => {
            expect(Board.outOfBounds(new Vector2(7, 7))).toBe(false);
        })
        it("should be out of bounds at a negative x value", () => {
            expect(Board.outOfBounds(new Vector2(-1, 0))).toBe(true);
        });
        it("should be out of bounds at a x value larger than 7", () => {
            expect(Board.outOfBounds(new Vector2(8, 0))).toBe(true);
        });
        it("should be out of bounds at a negative y value", () => {
            expect(Board.outOfBounds(new Vector2(0, -1))).toBe(true);
        });
        it("should be out of bounds at a y value larger than 7", () => {
            expect(Board.outOfBounds(new Vector2(0, 8))).toBe(true);
        });
    });

    let game = new Game();
    describe(game.state.board.isSquareOccupied, () => {
        it("should be able to identify that starting squares are occupied", () => {
            FEN.load("rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1", game.state);
            for (let y = 0; y < 8; y++) {
                for (let x = 0; x < 8; x++) {
                    const pieceAtPos: boolean = game.state.board.isSquareOccupied(new Vector2(x, y));
                    if (y === 0 || y === 7 || y === 6 || y === 1) {
                        expect(pieceAtPos).toBe(true);
                    } else {
                        expect(pieceAtPos).toBe(false);
                    }
                }
            }
        });
    });
    describe(game.state.board.isSquareOccupiedByColor, () => {
        it("should be able to correctly identify all starting squares that are occupied of a specific color", () => {
            FEN.load("rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1", game.state);
            for (let y = 0; y < 8; y++) {
                for (let x = 0; x < 8; x++) {
                    const pieceAtPosIsBlack: boolean = game.state.board.isSquareOccupiedByColor(new Vector2(x, y), 'black');
                    const pieceAtPosIsWhite: boolean = game.state.board.isSquareOccupiedByColor(new Vector2(x, y), 'white');
                    
                    if (y === 0 || y === 1) {
                        expect(pieceAtPosIsBlack).toBe(true);
                    } else if (y === 6 || y === 7) {
                        expect(pieceAtPosIsWhite).toBe(true);
                    } else {
                        expect(pieceAtPosIsBlack || pieceAtPosIsWhite).toBe(false);
                    }
                }
            }
        });
    });
});