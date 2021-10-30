import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { YoutubePlayerComponent } from 'ngx-youtube-player';
import { YoutubeResult } from '../../youtube/state/youtube.model';


@Component({
  selector: 'app-video-item',
  templateUrl: './video-item.component.html',
  styleUrls: ['./video-item.component.scss']
})
export class VideoItemComponent implements OnInit {
  @Input() item?: YoutubeResult;
  @ViewChild('player') player?: YoutubePlayerComponent;

  constructor() { }

  ngOnInit(): void { }


  onStateChange($event: any) {
    console.log($event);
  }
}
