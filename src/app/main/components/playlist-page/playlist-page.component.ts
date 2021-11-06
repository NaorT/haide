import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../../../auth/state/auth.model';
import { AuthQuery } from '../../../auth/state/auth.query';
import { Playlist } from '../../../playlist/state/playlist.model';
import { PlaylistQuery } from '../../../playlist/state/playlist.query';
import { PlaylistService } from '../../../playlist/state/playlist.service';
import { YoutubeResult } from '../../../youtube/state/youtube.model';
import { YoutubeQuery } from '../../../youtube/state/youtube.query';

@Component({
  selector: 'app-playlist-page',
  templateUrl: './playlist-page.component.html',
  styleUrls: ['./playlist-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PlaylistPageComponent implements OnInit {
  selectActive$: Observable<Playlist> = this.playlistQuery.selectActive$;
  selectPlaylistPageResults$: Observable<YoutubeResult[]> = this.youtubeQuery.selectPlaylistPageResults$;
  selectUser$: Observable<User | null> = this.authQuery.selectUser$;

  constructor(
    private playlistService: PlaylistService,
    private playlistQuery: PlaylistQuery,
    private youtubeQuery: YoutubeQuery,
    private authQuery: AuthQuery) { }

  ngOnInit(): void {
  }

  playSong(song: YoutubeResult, shouldActivatePlaylist: boolean = false) {
    if (shouldActivatePlaylist) {
      if (song.playlistId) {
        this.playlistService.updateActive(song.playlistId);
      }
    }
    this.playlistService.updateCurrentlyPlayed(song);
  }

  addSongToPlaylist(item: YoutubeResult) {
    const addedBy = (this.authQuery.getActive() as User)?.displayName;
    const playlist: Playlist = this.playlistQuery.getActive() as Playlist;
    const isAlreadyExist: boolean = !!playlist.items.find((x) => item.id === x.id);
    if (!isAlreadyExist) {
      this.playlistService.addItemToPlaylist(item, addedBy, playlist.id);
    }
  }

  removeSongFromPlaylist(song: YoutubeResult) {
    this.playlistService.removeItemFromPlaylist(song);
  }
}
