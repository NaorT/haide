import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { PlaylistService } from '../../../playlist/state/playlist.service';
import { YoutubeResult } from '../../../youtube/state/youtube.model';
import { YoutubeService } from '../../../youtube/state/youtube.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  top5IL$?: Observable<YoutubeResult[]>;
  top5US$?: Observable<YoutubeResult[]>;

  constructor(
    private playlistService: PlaylistService,
    private youtubeService: YoutubeService
  ) { }

  ngOnInit(): void {
    this.top5IL$ = this.youtubeService.getTopFive('IL');
    this.top5US$ = this.youtubeService.getTopFive('US');
  }

  playSong($event: YoutubeResult) {
    this.playlistService.updateCurrentlyPlayed($event);
  }

}
