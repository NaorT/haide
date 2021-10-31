import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Playlist } from '../../../playlist/state/playlist.model';
import { PlaylistQuery } from '../../../playlist/state/playlist.query';
import { YoutubeResult } from '../../../youtube/state/youtube.model';
import { YoutubeQuery } from '../../../youtube/state/youtube.query';

@Component({
  selector: 'app-playlist-page',
  templateUrl: './playlist-page.component.html',
  styleUrls: ['./playlist-page.component.scss']
})
export class PlaylistPageComponent implements OnInit {
  selectActive$: Observable<Playlist> = this.playlistQuery.selectActive$;
  selectPlaylistPageResults$: Observable<YoutubeResult[]> = this.youtubeQuery.selectPlaylistPageResults$;

  constructor(private playlistQuery: PlaylistQuery, private youtubeQuery: YoutubeQuery) { }

  ngOnInit(): void {
  }

}
