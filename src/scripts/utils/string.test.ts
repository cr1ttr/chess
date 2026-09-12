import { 
    alphaCharDistance, 
    isAlpha, 
    isLowerCaseAlpha, 
    isNonZeroNum, 
    isNum, 
    isUpperCaseAlpha, 
    isValidAlgebraicNotation, 
    isValidCastlingRightsString, 
    isValidFenPiece, 
    isZeroToSeven 
} from "./string.js"

const LOWER_ALPHA_CHARSET = "abcdefghijklmnopqrstuvwxyz";
const UPPER_ALPHA_CHARSET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const ALPHA_CHARSET = LOWER_ALPHA_CHARSET + UPPER_ALPHA_CHARSET;
const EMPTY_STRING = "";
const NUM_CHARSET = "0123456789";
const SYMBOL_CHARSET = "!@#$%^&*()-_=+[{]}\\|'\";:.<>,/?~`";

describe("String Utilities", () => {
    describe(isAlpha, () => {
        it("should not accept empty strings", () => { expect(isAlpha(EMPTY_STRING)).toBe(false); });
        it("should accept any alphabetical string of a-zA-Z", () => { expect(isAlpha(ALPHA_CHARSET)).toBe(true) });
        it("should not accept any numbers within the string", () => { expect(isAlpha(NUM_CHARSET)).toBe(false); });
        it("should not accept any symbols within the string", () => { expect(isAlpha(SYMBOL_CHARSET)).toBe(false); });
    });
    describe(isNum, () => {
        it("should not accept alphabetical characters", () => { expect(isNum(ALPHA_CHARSET)).toBe(false); });
        it("should accept leading zeroes", () => { expect(isNum("000123")).toBe(true); });
        it("should accept characters 0-9", () => { expect(isNum("102030405060708090")).toBe(true); });
        it("should accept trailing zeroes", () => { expect(isNum("100000")).toBe(true); });
    });
    describe(isNonZeroNum, () => {
        it("should not accept empty strings", () => { expect(isNonZeroNum(EMPTY_STRING)).toBe(false); });
        it("should not accept leading zeroes", () => { expect(isNonZeroNum("000123")).toBe(false); });
        it("should not accept zero", () => { expect(isNonZeroNum("0")).toBe(false); })
        it("should accept numbers 1-9", () => { expect(isNonZeroNum("123456789")).toBe(true); });
        it("should accept trailing zeroes", () => { expect(isNonZeroNum("100000")).toBe(true); });
    });
    describe(isZeroToSeven, () => {
        it("should not accept empty strings", () => { expect(isZeroToSeven(EMPTY_STRING)).toBe(false); });
        it("should not accept anything but single-digit numbers", () => { expect(isZeroToSeven("12")).toBe(false); });
        it("should only accept a number between 0 and 7", () => { 
            for (let i = 0; i < 8; i++) {
                expect(isZeroToSeven(i.toString())).toBe(true); 
            }
        });        
    });
    describe(isValidAlgebraicNotation, () => {
        it("should not accept empty strings", () => { expect(isValidAlgebraicNotation(EMPTY_STRING)).toBe(false); });
        it("should allow lowercase characters", () => { 
            const CHARSET = "abcdefgh";
            for (let i = 0; i < CHARSET.length; i++) {
                const NOTATION = CHARSET[i] + (i + 1).toString();
                expect(isValidAlgebraicNotation(NOTATION)).toBe(true);
            }
        });
        it("should not allow zero", () => {
            expect(isValidAlgebraicNotation("a0")).toBe(false);
        });
        it("should allow upercase characters", () => {
            const CHARSET = "ABCDEFGH";
            for (let i = 0; i < CHARSET.length; i++) {
                const NOTATION = CHARSET[i] + (i + 1).toString();
                expect(isValidAlgebraicNotation(NOTATION)).toBe(true);
            }
        });
        it("should not allow reversed notation", () => {
            const CHARSET = "abcdefgh";
            for (let i = 0; i < CHARSET.length; i++) {
                const NOTATION = (i + 1).toString() + CHARSET[i];
                expect(isValidAlgebraicNotation(NOTATION)).toBe(false);
            }
        });
    });

    describe(isLowerCaseAlpha, () => {
        it("should accept a string of lowercase characters a-z", () => {
            expect(isLowerCaseAlpha(LOWER_ALPHA_CHARSET)).toBe(true);
        });
        it("should not accept a string of uppercase characters A-Z", () => {
            expect(isLowerCaseAlpha(UPPER_ALPHA_CHARSET)).toBe(false);
        });
        it("should not accept empty strings", () => {
            expect(isLowerCaseAlpha(EMPTY_STRING)).toBe(false);
        });
        it("should not accept numerical values", () => {
            expect(isLowerCaseAlpha(NUM_CHARSET)).toBe(false);
        });
    });

    describe(isUpperCaseAlpha, () => {
        it("should not accept a string of lowercase characters a-z", () => {
            expect(isUpperCaseAlpha(LOWER_ALPHA_CHARSET)).toBe(false);
        });
        it("should accept a string of uppercase characters A-Z", () => {
            expect(isUpperCaseAlpha(UPPER_ALPHA_CHARSET)).toBe(true);
        });
        it("should not accept empty strings", () => {
            expect(isUpperCaseAlpha(EMPTY_STRING)).toBe(false);
        });
        it("should not accept numerical values", () => {
            expect(isUpperCaseAlpha(NUM_CHARSET)).toBe(false);
        });
    });


    describe(isValidFenPiece, () => {
        it("should allow characters from the following set: [pnbrqkPNBRQK]", () => {
            const CHARSET = "pnbrqkPNBRQK";
            for (let i = 0; i < CHARSET.length; i++) {
                expect(isValidFenPiece(CHARSET[i]!));
            }
        });
        it("should not allow strings longer than a length of 1", () => {
            expect(isValidFenPiece("Pr")).toBe(false);
        });
        it("should not allow any numerical characters", () => {
            for (let i = 0; i <= 9; i ++) {
                expect(isValidFenPiece(i.toString()));
            }
        });
    });

    describe(alphaCharDistance, () => {
        it("should return a distance of 0 for the letter 'a' or 'A'", () => {
            expect(alphaCharDistance("a")).toBe(0);
            expect(alphaCharDistance("A")).toBe(0);
        });
        it("should return a distance of 25 for the letter 'z' or 'Z'", () => {
            expect(alphaCharDistance("z")).toBe(25);
            expect(alphaCharDistance("Z")).toBe(25);            
        });
        it("should return undefined for empty strings", () => {
            expect(alphaCharDistance("")).toBe(undefined);
        });
        it("should return undefined for strings larger than a length of 1", () => {
            expect(alphaCharDistance("ab")).toBe(undefined);
        });
        it("should return undefined for strings that are not alphabetical", () => {
            for (let i = 0; i < SYMBOL_CHARSET.length; i++) {
                expect(alphaCharDistance(SYMBOL_CHARSET[i]!)).toBe(undefined);
            }
            for (let i = 0; i < NUM_CHARSET.length; i++) {
                expect(alphaCharDistance(NUM_CHARSET[i]!)).toBe(undefined);
            }
        });
    });


    describe(isValidCastlingRightsString, () => {
        it("should accept a hyphen character as a 'none' option", () => {
            expect(isValidCastlingRightsString("-")).toBe(true);
        });
        it("should fail to accept anything other than KQkq order", () => {
            expect(isValidCastlingRightsString("QKkq")).toBe(false);
        });
        it("should accept partial strings as long as they retain KQkq order", () => {
            expect(isValidCastlingRightsString("Kq")).toBe(true);
            expect(isValidCastlingRightsString("q")).toBe(true);
            expect(isValidCastlingRightsString("Kk")).toBe(true);            
            expect(isValidCastlingRightsString("KQk")).toBe(true);
        });
    });
});