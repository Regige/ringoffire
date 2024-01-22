import { inject, Injectable } from '@angular/core';
import { Firestore, collection, collectionData, doc, onSnapshot, query, orderBy, limit, addDoc } from '@angular/fire/firestore';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})

export class GameServices {

  firestore: Firestore = inject(Firestore);

  // docRef: string;
  // unsubGame;
  // unsubNotesList;

  // items$; 
  // items;


  constructor(private router: Router) {
    // this.docRef = "";
    // this.unsubGame = this.subGame();
    // this.unsubNotesList = this.subNotesList();

    // this.items$ = collectionData(collection(this.firestore, 'games')); 
    // this.items = this.items$.subscribe((list) => {
    //   list.forEach(element => {
    //     console.log(element);
    //   });
    // });

  }

  // subNotesList() {
  //   const q = query(collection(this.firestore, 'games'), limit(100));
  //   return onSnapshot(q, (list) => {
  //     list.forEach(element => {
  //         this.docRef = element.id;
  //         console.log("Game update also new", element.data());
  //     })
  //     });
  // }


  // subGame() {
  //   if(this.docRef) {
  //     return onSnapshot(doc(this.firestore, 'games', this.docRef), (doc) => {
  //       console.log('Does it work:', doc.data());
  //       console.log('It also works:', this.docRef)
  //     });
  //   } else  {
  //     console.error('Invalid docId:', this.docRef);
  //   }
  // }


  ngonDestroy() {
    // this.unsubNotesList;
    // this.unsubGame();

    // this.items.unsubscribe();
  }


  async addGame(item: {}) {
    let gameId;
    const docRef = await addDoc(collection(this.firestore, "games"), item).then((gameInfo: any) => {
      console.log('Game Inof:', gameInfo);
      console.log('Game Id', gameInfo.id);
      gameId = gameInfo.id;
    });

    this.router.navigateByUrl('/game/' + gameId);
  }
}
