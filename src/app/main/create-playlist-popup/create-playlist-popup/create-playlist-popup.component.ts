import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Playlist } from '../../../playlist/state/playlist.model';

@Component({
  selector: 'app-create-playlist-popup',
  templateUrl: './create-playlist-popup.component.html',
  styleUrls: ['./create-playlist-popup.component.scss']
})
export class CreatePlaylistPopupComponent implements OnInit {
  nameCtrl = new FormControl('', [Validators.required, Validators.maxLength(30)]);

  constructor(@Inject(MAT_DIALOG_DATA) public playlist: Playlist) { }

  ngOnInit(): void {
    if (this.playlist) {
      this.nameCtrl.setValue(this.playlist.name)
    }
  }

}
