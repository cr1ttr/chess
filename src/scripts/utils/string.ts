// Basic helper function that checks if each character of a string is within the ASCII table ranges of a-z or A-Z.
// Unfortunately this is necessary given that JavaScript doesn't just have a function to test for this.
export function isAlpha(str: string): boolean {
    return /^[a-zA-Z]+$/.test(str);
}

// Basic helper function that checks if each character of a string is within the ASCII table ranges of 0-9.
// Does not accept leading zeroes.
// Unfortunately this is necessary given that JavaScript doesn't just have a function to test for this.
export function isNum(str: string): boolean {
    return /^\d+$/.test(str);
}

// Basic helper function that checks if each character of a string is within the ASCII table ranges of 0-9 but disallows the very first number to be zero.
// Does not accept leading zeroes.
export function isNonZeroNum(str: string): boolean {
    return /^[1-9]\d*$/.test(str);
}

export function isZeroToSeven(str: string): boolean {
    return /^[0-7]$/.test(str);
}

// Basic helper function that checks the validity of a string describing algebraic notation in chess.
// Case-Insensitive.
export function isValidAlgebraicNotation(str: string): boolean {
    return /^[a-hA-H][1-8]$/.test(str);
}

export function isLowerCaseAlpha(str: string): boolean {
    return /^[a-z]*$/.test(str);
}

export function isUpperCaseAlpha(str: string): boolean {
    return /^[A-Z]*$/.test(str);
}

export function alphaCharDistance(str: string): number | undefined {
    if (str.length != 1) return undefined;
    const char = str[0]!;
    const codePoint = char.codePointAt(0)!;

    if (isLowerCaseAlpha(char)) {
        return codePoint - 'a'.charCodeAt(0);
    } else if (isUpperCaseAlpha(char)) {
        return codePoint - 'A'.charCodeAt(0);
    }

    return undefined;
}

export function isValidFenPiece(str: string): boolean {
    return /^[pnbrqkPNBRQK]$/.test(str);
}

export function isValidCastlingRightsString(str: string): boolean {
    return /^-|K?Q?k?q?$/.test(str);
}


