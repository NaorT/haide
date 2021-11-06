import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PlaylistService } from '../../../../playlist/state/playlist.service';
import { YoutubeResult } from '../../../../youtube/state/youtube.model';

@Component({
  selector: 'app-search-result-item',
  templateUrl: './search-result-item.component.html',
  styleUrls: ['./search-result-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchResultItemComponent implements OnInit {
  @Input() item?: YoutubeResult;
  @Output() songAdded = new EventEmitter<YoutubeResult>();
  @Output() songStarted = new EventEmitter<YoutubeResult>();


  constructor(private playlistService: PlaylistService) { }

  ngOnInit(): void {
  }

  playSong(item: YoutubeResult) {
    this.songStarted.emit(item);
  }

  addSong(item: YoutubeResult) {
    this.songAdded.emit(item);
  }

}
