export type PieceKind = 'pawn' | 'knight' | 'bishop' | 'rook' | 'queen' | 'king';
export type PieceTeam = 'black' | 'white';

export default class Piece {
    kind: PieceKind;
    team: PieceTeam;

    constructor(kind: PieceKind, team: PieceTeam) {
        this.kind = kind;
        this.team = team;
    }
}
