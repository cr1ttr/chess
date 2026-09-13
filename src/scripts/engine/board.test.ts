import Board from "./board.js"
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
});