import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { guid } from '@datorama/akita';
import { Observable } from 'rxjs';
import { User } from '../../../auth/state/auth.model';
import { AuthQuery } from '../../../auth/state/auth.query';
import { createPlaylist, Playlist } from '../../../playlist/state/playlist.model';
import { PlaylistQuery } from '../../../playlist/state/playlist.query';
import { PlaylistService } from '../../../playlist/state/playlist.service';
import { YoutubeResult } from '../../../youtube/state/youtube.model';
import { YoutubeQuery } from '../../../youtube/state/youtube.query';
import { CreatePlaylistPopupComponent } from '../../create-playlist-popup/create-playlist-popup/create-playlist-popup.component';

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchPageComponent implements OnInit {
  searchPageResults$?: Observable<YoutubeResult[]> = this.youtubeQuery.selectSearchPageResults$;

  constructor(
    private youtubeQuery: YoutubeQuery,
    private playlistService: PlaylistService,
    private playlistQuery: PlaylistQuery,
    private dialog: MatDialog,
    private authQuery: AuthQuery
  ) { }

  ngOnInit(): void { }

  playSong(item: YoutubeResult) {
    this.playlistService.updateCurrentlyPlayed(item);
  }

  addSongToPlaylist({ item, playlist }: { item: YoutubeResult, playlist: Playlist | null }) {
    if (playlist) {
      this.playlistService.setAsActive(playlist.id);
      this.playlistService.addSongToPlaylist(playlist, item);
    } else {
      this.playlistService.openCreatePlaylistDialog().subscribe((res) => {
        this.playlistService.addNewPlaylist(res);
      })
    }
  }
}
