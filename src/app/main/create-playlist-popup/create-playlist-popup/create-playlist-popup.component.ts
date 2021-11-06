import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-playlist-popup',
  templateUrl: './create-playlist-popup.component.html',
  styleUrls: ['./create-playlist-popup.component.scss']
})
export class CreatePlaylistPopupComponent implements OnInit {
  name: string = '';
  nameCtrl = new FormControl('', [Validators.required, Validators.maxLength(50)]);
  constructor(
  ) { }

  ngOnInit(): void {
  }

}
