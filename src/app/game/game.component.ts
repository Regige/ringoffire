import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Game } from './../../models/game';
import { PlayerComponent } from './../player/player.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddPlayerComponent } from './../dialog-add-player/dialog-add-player.component';
import { GameInfoComponent } from '../game-info/game-info.component';
import { Observable } from 'rxjs';
import { GameServices } from '../firebase-services/game-services';
import { ActivatedRoute } from '@angular/router';
import { Firestore, doc, collectionData, collection, onSnapshot, updateDoc } from '@angular/fire/firestore';


@Component({
  selector: 'app-game',
  standalone: true,
  imports: [CommonModule, PlayerComponent, MatButtonModule, MatIconModule, DialogAddPlayerComponent, GameInfoComponent],
  templateUrl: './game.component.html',
  styleUrl: './game.component.scss'
})

export class GameComponent implements OnInit {
  game: Game;

  docRef: string = '';
  docData: any;
  unsubGame;
  

  firestore: Firestore = inject(Firestore);

  constructor( private route: ActivatedRoute, private gameService: GameServices, public dialog: MatDialog) {
    this.game = new Game();

    this.route.params.subscribe((params) => {
      this.docRef = params['id'];
    })

    this.unsubGame = this.subGame();
  }

  ngOnInit(): void {
    this.newGame();  
  }

  newGame() {
    this.game = new Game();

    // this.gameService.addGame(this.game.toJson());
  }

  subGame() {
      return onSnapshot(doc(this.firestore, 'games', this.docRef), (doc) => {
        console.log('Does it work:', doc.data());
        console.log('It also works:', this.docRef);
        
        if(doc.exists()){
          this.docData = doc.data();

          this.game.currentPlayer = this.docData.currentPlayer;
          this.game.playedCards = this.docData.playedCards;
          this.game.players = this.docData.players;
          this.game.stack = this.docData.stack;
          this.game.pickCardAnimation = this.docData.pickCardAnimation,
          this.game.currentCard = this.docData.currentCard
        }
      });
  }

  ngonDestroy() {
    this.unsubGame();
  }

  async saveGame() { // update Game
     await updateDoc(doc(this.firestore, "games", this.docRef), this.game.toJson()).catch((err) => { console.log(err); });
  }
  
  
  takeCard() {
    if(!this.game.pickCardAnimation) {
      let newCard = this.game.stack.pop();
      if(newCard != undefined) {
        this.game.currentCard = newCard;
      } 
      this.game.pickCardAnimation = true;
      
      this.game.currentPlayer++;
      this.game.currentPlayer = this.game.currentPlayer % this.game.players.length;
      this.saveGame();
      setTimeout(() => {
        this.game.playedCards.push(this.game.currentCard);
        this.game.pickCardAnimation = false;
        this.saveGame();
      }, 1000);
    }
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogAddPlayerComponent);

    dialogRef.afterClosed().subscribe((name: string) => {
      if(name && name.length > 0) {
        this.game.players.push(name);
        this.saveGame();
      }
    });
  }
}
