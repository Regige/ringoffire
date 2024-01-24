import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-edit-player',
  standalone: true,
  imports: [CommonModule, FormsModule, MatDialogModule, MatButtonModule],
  templateUrl: './edit-player.component.html',
  styleUrl: './edit-player.component.scss'
})
export class EditPlayerComponent {
  allProfilePictures = ['1.webp', '2.png', 'monkey.png', 'pinguin.svg', 'serious-woman.svg', 'winkboy.svg']

  change: string = '';

  constructor( public dialogRef: MatDialogRef<EditPlayerComponent> ) {

  }
}
