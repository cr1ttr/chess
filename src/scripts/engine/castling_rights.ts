export default class CastlingRights {
    kingSide: boolean
    queenSide: boolean

    constructor(args: { kingSide: boolean, queenSide: boolean}) {
        this.kingSide = args.kingSide;
        this.queenSide = args.queenSide;
    }
}