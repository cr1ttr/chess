import Vector2 from "../engine/vector2.js";
import { parseAlgebraicNotation } from "./vector.js";


describe("Vector Utilities", () => {
    describe(parseAlgebraicNotation, () => {
        it("should return a zero based indexing vector for a1-h8", () => {
            for (let y = 0; y < 8; y++) { 
                for (let x = 0; x < 8; x++) {
                    const CHAR = String.fromCharCode('a'.charCodeAt(0) + x);
                    expect(parseAlgebraicNotation(CHAR + (y + 1).toString())).toStrictEqual(new Vector2(x, y));
                }
            }
        });
        it("should return undefined when given an empty string", () => {
            expect(parseAlgebraicNotation("")).toBe(undefined);
        });
        it("should return undefined when using a coordinate notation", () => {
            expect(parseAlgebraicNotation("17")).toBe(undefined);
        });
        it("should return undefined when using two letter coordinates", () => {
            expect(parseAlgebraicNotation("AH")).toBe(undefined);
        });
    });

});

