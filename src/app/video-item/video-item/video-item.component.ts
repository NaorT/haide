import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { YouTubePlayer } from '@angular/youtube-player';
import { Playlist } from '../../playlist/state/playlist.model';
import { PlaylistQuery } from '../../playlist/state/playlist.query';
import { PlaylistService } from '../../playlist/state/playlist.service';
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

  constructor(private playlistQuery: PlaylistQuery, private cdr: ChangeDetectorRef, private playlistService: PlaylistService) { }

  ngOnChanges(changes: SimpleChanges): void {
    this.video = undefined;
    this.cdr.detectChanges();
    setTimeout(() => {
      this.video = changes.video.currentValue;
      this.cdr.detectChanges();
      // this.playlistService.updateCurrentlyPlayed(changes.video);
    });
  }

  ngOnInit(): void {
    this.initYTiframe();
  }

  private initYTiframe() {
    const tag = document.createElement('script');
    tag.src = 'https://www.youtube.com/iframe_api';
    document.body.appendChild(tag);
  }

  onReady() {
    setTimeout(() => {
      if (this.player) {
        this.player?.playVideo();
      }
    });
  }

  videoStateChange($event: any, player: YouTubePlayer) {
    // end of video
    if ($event.data === 0) {
      const active: Playlist = this.playlistQuery.getActive() as Playlist;
      if (active) {
        let currentIndex: number = active.items.findIndex((x) => x.id === this.video?.id);
        if (currentIndex > -1) {
          let nextItem: YoutubeResult = active.items[currentIndex + 1];
          if (nextItem) {
            this.video = undefined;
            this.cdr.detectChanges();
            this.playlistService.updateCurrentlyPlayed(nextItem);
            this.onReady();
          }
        }
      }
    }
  }

}
