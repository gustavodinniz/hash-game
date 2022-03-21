import {Component, OnInit} from '@angular/core';
import {HashGameService} from "./shared/hash-game.service";

@Component({
  selector: 'app-hash-game',
  templateUrl: './hash-game.component.html',
  styleUrls: ['./hash-game.component.css']
})
export class HashGameComponent implements OnInit {

  constructor(private hashGameService: HashGameService) {
  }

  ngOnInit(): void {
    this.hashGameService.initialize();
  }

  get showStart(): boolean {
    return this.hashGameService.showStart;
  }

  get showBoard(): boolean {
    return this.hashGameService.showBoard;
  }

  get showFinal(): boolean {
    return this.hashGameService.showFinal;
  }

  startGame(): void {
    this.hashGameService.startGame();
  }

  play(posX: number, posY: number): void {
    this.hashGameService.play(posX, posY)
  }

  displayX(posX: number, posY: number): boolean {
    return this.hashGameService.displayX(posX, posY);
  }

  displayO(posX: number, posY: number): boolean {
    return this.hashGameService.displayO(posX, posY);
  }

  displayVictory(posX: number, posY: number): boolean {
    return this.hashGameService.displayVictory(posX, posY);
  }
}
