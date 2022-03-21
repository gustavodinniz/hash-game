import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HashGameService {

  private readonly TAM_TAB: number = 3;
  private readonly X: number = 1;
  private readonly O: number = 2;
  private readonly EMPTY: number = 0;

  private board: any;
  private numMovements: number;
  private victory: any;

  private _player: number;
  private _showStart: boolean;
  private _showBoard: boolean;
  private _showFinal: boolean;

  constructor() { }

  initialize(): void {
    this._showStart = true;
    this._showBoard = false;
    this._showFinal = false;
    this.numMovements = 0;
    this._player = this.X;
    this.victory = false;
    this.initializeBoard();
  }

  initializeBoard(): void {
    this.board = [this.TAM_TAB];
    for (let i = 0; i < this.TAM_TAB; i++) {
      this.board[i] = [this.EMPTY, this.EMPTY, this.EMPTY];
    }
  }

  get showStart(): boolean {
    return this._showStart;
  }

  get showBoard(): boolean {
    return this._showBoard;
  }

  get showFinal(): boolean {
    return this._showFinal;
  }

  get player(): number {
    return this._player;
  }

  startGame(): void {
    this._showStart = false;
    this._showBoard = true;
  }

  play(posX: number, posY: number): void {
    // jogada inválida
    if (this.board[posX][posY] !== this.EMPTY ||
      this.victory) {
      return;
    }

    this.board[posX][posY] = this._player;
    this.numMovements++;
    this.victory = this.endGame(posX, posY,
      this.board, this._player);
    this._player = (this._player === this.X) ? this.O : this.X;

    if (!this.victory && this.numMovements < 9) {
      this.cpuPlay();
    }

    // houve vitória
    if (this.victory !== false) {
      this._showFinal = true;
    }

    // empate
    if (!this.victory && this.numMovements === 9) {
      this._player = 0;
      this._showFinal = true;
    }
  }

  endGame(line: number, column: number,
          board: any, player: number) {
    let end: any = false;

    // valida a line
    if (board[line][0] === player &&
      board[line][1] === player &&
      board[line][2] === player) {
      end = [[line, 0], [line, 1], [line, 2]];
    }

    // valida a column
    if (board[0][column] === player &&
      board[1][column] === player &&
      board[2][column] === player) {
      end = [[0, column], [1, column], [2, column]];
    }

    // valida as diagonais
    if (board[0][0] === player &&
      board[1][1] === player &&
      board[2][2] === player) {
      end = [[0, 0], [1, 1], [2, 2]];
    }

    if (board[0][2] === player &&
      board[1][1] === player &&
      board[2][0] === player) {
      end = [[0, 2], [1, 1], [2, 0]];
    }

    return end;
  }

  cpuPlay(): void {
    // verifica jogada de vitória
    let play: number[] = this.getPlay(this.O);

    if (play.length <= 0) {
      // tenta jogar para evitar derrota
      play = this.getPlay(this.X);
    }

    if (play.length <= 0) {
      // joga aleatório
      let plays: any = [];
      for (let i=0; i<this.TAM_TAB; i++) {
        for (let j=0; j<this.TAM_TAB; j++) {
          if (this.board[i][j] === this.EMPTY) {
            plays.push([i, j]);
          }
        }
      }
      let k = Math.floor((Math.random() * (plays.length - 1)));
      play = [plays[k][0], plays[k][1]];
    }

    this.board[play[0]][play[1]] = this._player;
    this.numMovements++;
    this.victory = this.endGame(play[0], play[1],
      this.board, this._player);
    this._player = (this._player === this.X) ? this.O : this.X;
  }

  getPlay(player: number): number[] {
    let tab = this.board;
    for (let lin = 0; lin < this.TAM_TAB; lin++) {
      for (let col = 0; col < this.TAM_TAB; col++) {
        if (tab[lin][col] !== this.EMPTY) {
          continue;
        }
        tab[lin][col] = player;
        if (this.endGame(lin, col, tab, player)) {
          return [lin, col];
        }
        tab[lin][col] = this.EMPTY;
      }
    }
    return [];
  }

  displayX(posX: number, posY: number): boolean {
    return this.board[posX][posY] === this.X;
  }

  displayO(posX: number, posY: number): boolean {
    return this.board[posX][posY] === this.O;
  }

  displayVictory(posX: number, posY: number): boolean {
    let displayVictory: boolean = false;

    if (!this.victory) {
      return displayVictory;
    }

    for (let pos of this.victory) {
      if (pos[0] === posX && pos[1] === posY) {
        displayVictory = true;
        break;
      }
    }

    return displayVictory;
  }

  newGame(): void {
    this.initialize();
    this._showFinal = false;
    this._showStart = false;
    this._showBoard = true;
  }
}
