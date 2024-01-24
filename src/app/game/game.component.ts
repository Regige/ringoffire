import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Game } from './../../models/game';
import { PlayerComponent } from './../player/player.component';
import { PlayerMobileComponent } from '../player-mobile/player-mobile.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddPlayerComponent } from './../dialog-add-player/dialog-add-player.component';
import { GameInfoComponent } from '../game-info/game-info.component';
import { Observable } from 'rxjs';
import { GameServices } from '../firebase-services/game-services';
import { ActivatedRoute } from '@angular/router';
import { Firestore, doc, collectionData, collection, onSnapshot, updateDoc } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { EditPlayerComponent } from '../edit-player/edit-player.component';


@Component({
  selector: 'app-game',
  standalone: true,
  imports: [CommonModule, PlayerComponent, PlayerMobileComponent, MatButtonModule, MatIconModule, DialogAddPlayerComponent, GameInfoComponent],
  templateUrl: './game.component.html',
  styleUrl: './game.component.scss'
})

export class GameComponent implements OnInit {
  game: Game;
  gameOver = false;

  docRef: string = '';
  docData: any;
  unsubGame;
  

  firestore: Firestore = inject(Firestore);

  constructor( private route: ActivatedRoute, private gameService: GameServices, public dialog: MatDialog, private router: Router) {
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
          this.game.player_images = this.docData.player_images;
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
    if(this.game.stack.length == 0) {
      this.gameOver = true;
      setTimeout (() => {
        this.router.navigateByUrl('');
      }, 10000);
    } else if(!this.game.pickCardAnimation) {
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
        this.game.player_images.push('1.webp');
        this.saveGame();
      }
    });
  }


  editPlayer(playerId: number) {
    
    const dialogRef = this.dialog.open(EditPlayerComponent);
    dialogRef.afterClosed().subscribe((change: string) => {
      if(change) {
          if(change == 'DELETE') {
            this.game.players.splice(playerId, 1)
            this.game.player_images.splice(playerId, 1)
        } else {
          this.game.player_images[playerId] = change;
        }
        this.saveGame();
      }
    });
  }
}
