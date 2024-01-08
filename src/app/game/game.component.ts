import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Game } from './../../models/game';
import { PlayerComponent } from './../player/player.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddPlayerComponent } from './../dialog-add-player/dialog-add-player.component';


@Component({
  selector: 'app-game',
  standalone: true,
  imports: [CommonModule, PlayerComponent, MatButtonModule, MatIconModule, DialogAddPlayerComponent],
  templateUrl: './game.component.html',
  styleUrl: './game.component.scss'
})

export class GameComponent implements OnInit {
  pickCardAnimation = false;
  currentCard: string = '';
  game: Game;
  

  constructor(public dialog: MatDialog) {
    this.game = new Game();
  }

  ngOnInit(): void {
    this.newGame();
  }
  
  newGame() {
    this.game = new Game();
    console.log(this.game);
  }

  takeCard() {
    if(!this.pickCardAnimation) {
      let newCard = this.game.stack.pop();
      if(newCard != undefined) {
        this.currentCard = newCard;
      } 
      this.pickCardAnimation = true;
      
      console.log('New card: ' + this.currentCard);
      console.log('Game is', this.game);
      
      setTimeout(() => {
        this.game.playedCards.push(this.currentCard);
        this.pickCardAnimation = false;
      }, 1000);
    }
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogAddPlayerComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
}