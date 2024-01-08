export class Game {
    public players: string[] = ['Hans', 'Freddy', 'Peter'];
    public stack: string[] = [];
    public playedCards: string[] = [];
    public currentPlayer: number = 0;

    constructor() {
        for (let i = 1; i < 14; i++) {
            this.stack.push('clubs_' + i);
            this.stack.push('diamonds_' + i);
            this.stack.push('hearts_' + i);
            this.stack.push('spade_' + i);
        }

        shuffleArray(this.stack);
    }
}


function shuffleArray<T>(array: T[]): T[] {
  return array.sort(() => Math.random() - 0.5);
}