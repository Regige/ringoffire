import { Component } from '@angular/core';
import { GameServices } from '../firebase-services/game-services';
import { Game } from '../../models/game';

@Component({
  selector: 'app-start-screen',
  standalone: true,
  imports: [],
  templateUrl: './start-screen.component.html',
  styleUrl: './start-screen.component.scss'
})
export class StartScreenComponent {

  constructor(private gameService: GameServices) { }


  newGame() {
    //Start game
    let game = new Game();
    this.gameService.addGame(game.toJson());
  }
}

