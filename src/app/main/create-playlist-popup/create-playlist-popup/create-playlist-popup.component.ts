import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-create-playlist-popup',
  templateUrl: './create-playlist-popup.component.html',
  styleUrls: ['./create-playlist-popup.component.scss']
})
export class CreatePlaylistPopupComponent implements OnInit {
  name: string = '';
  constructor(
  ) { }

  ngOnInit(): void {
  }

}
