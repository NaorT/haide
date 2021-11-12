import { ChangeDetectionStrategy, Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { YouTubePlayer } from '@angular/youtube-player';
import { YoutubeResult } from '../../youtube/state/youtube.model';

@Component({
  selector: 'app-video-item',
  templateUrl: './video-item.component.html',
  styleUrls: ['./video-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class VideoItemComponent implements OnInit, OnChanges {
  @ViewChild('player') player?: YouTubePlayer;
  @Input() video?: YoutubeResult;

  constructor() { }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes);
  }

  ngOnInit(): void {
    this.initYTiframe();
  }

  private initYTiframe() {
    const tag = document.createElement('script');
    tag.src = 'https://www.youtube.com/iframe_api';
    document.body.appendChild(tag);
  }

  videoStateChange($event: any) {
    console.log(1);
    
    // end of video
    if ($event.data === 0) {
    }
  }

}
