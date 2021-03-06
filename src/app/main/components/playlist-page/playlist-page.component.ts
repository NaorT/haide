import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
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
    private activatedRoute: ActivatedRoute,
    private playlistService: PlaylistService,
    private playlistQuery: PlaylistQuery,
    private youtubeQuery: YoutubeQuery,
    private authQuery: AuthQuery) { }

  ngOnInit(): void {
    this.setActiveByIdIfExist();
  }

  private setActiveByIdIfExist() {
    if (!this.playlistQuery.hasActive()) {
      this.activatedRoute.params.pipe(
        map((params) => params.id),
        tap((id) => {
          this.playlistService.setAsActive(id);
        })
      ).subscribe();
    }
  }

  playSong(song: YoutubeResult, shouldActivatePlaylist: boolean = false) {
    // if (shouldActivatePlaylist && song.playlistId) {
    //   this.playlistService.setAsActive(song.playlistId);
    // }
    this.playlistService.updateCurrentlyPlayed(song);
  }

  addSongToPlaylist({ item, playlist }: { item: YoutubeResult, playlist: Playlist | null }) {
    const activePlaylist: Playlist = this.playlistQuery.getActive() as Playlist;
    this.playlistService.addSongToPlaylist(activePlaylist, item)
  }

  removeSongFromPlaylist(song: YoutubeResult, playlist: Playlist) {
    this.playlistService.removeItemFromPlaylist(song, playlist);
  }

  remove(list: any) {
    this.playlistService.removePlayList(list);
  }

  updatePlaylistDetails(playlist: Playlist) {
    this.playlistService.openCreatePlaylistDialog(playlist).subscribe((res) => {
      const updatedPlaylist: Playlist = { ...playlist, name: res };
      this.playlistService.updateActiveName(updatedPlaylist);
    })
  }
}
