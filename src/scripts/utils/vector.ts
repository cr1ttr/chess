import Vector2 from "../engine/vector2.js";
import { alphaCharDistance, isValidAlgebraicNotation } from "./string.js";

export function parseAlgebraicNotation(str: string): Vector2 | undefined {
    if (isValidAlgebraicNotation(str)) {
        const letter: number = alphaCharDistance(str[0]!)!;
        const number: number = Number(str[1]);
        return new Vector2(letter, number - 1);
    }

    return undefined;
}


