import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { PlaylistService } from '../../../playlist/state/playlist.service';
import { YoutubeResult } from '../../../youtube/state/youtube.model';
import { YoutubeQuery } from '../../../youtube/state/youtube.query';

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchPageComponent implements OnInit {
  searchPageResults$?: Observable<YoutubeResult[]> = this.youtubeQuery.selectSearchPageResults$;

  constructor(private youtubeQuery: YoutubeQuery, private playlistService: PlaylistService) { }

  ngOnInit(): void { }

  playSong(item: YoutubeResult) {
    this.playlistService.updateCurrentlyPlayed(item);
  }

}
