import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-playlist-popup',
  templateUrl: './create-playlist-popup.component.html',
  styleUrls: ['./create-playlist-popup.component.scss']
})
export class CreatePlaylistPopupComponent implements OnInit {
  nameCtrl = new FormControl('', [Validators.required, Validators.maxLength(15)]);
  
  constructor() { }

  ngOnInit(): void {
  }

}
