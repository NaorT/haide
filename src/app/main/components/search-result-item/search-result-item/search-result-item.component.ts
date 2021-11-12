import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Playlist } from '../../../../playlist/state/playlist.model';
import { PlaylistQuery } from '../../../../playlist/state/playlist.query';
import { YoutubeResult } from '../../../../youtube/state/youtube.model';

@Component({
  selector: 'app-search-result-item',
  templateUrl: './search-result-item.component.html',
  styleUrls: ['./search-result-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchResultItemComponent implements OnInit {
  @Input() item?: YoutubeResult;
  @Input() shouldOpenMenu: boolean = false;
  @Output() songAdded = new EventEmitter<{ item: YoutubeResult, playlist: Playlist | null }>();
  @Output() songStarted = new EventEmitter<YoutubeResult>();
  selectPlaylists$ = this.playlistQuery.selectPlaylists$;

  constructor(private playlistQuery: PlaylistQuery) { }

  ngOnInit(): void {
  }

  playSong(item: YoutubeResult) {
    this.songStarted.emit(item);
  }

  addSong(item: YoutubeResult, playlist: Playlist | null) {
    this.songAdded.emit({ item, playlist });
  }

}
