import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { guid } from '@datorama/akita';
import { Observable } from 'rxjs';
import { User } from '../../auth/state/auth.model';
import { AuthQuery } from '../../auth/state/auth.query';
import { createPlaylist, Playlist } from '../../playlist/state/playlist.model';
import { PlaylistQuery } from '../../playlist/state/playlist.query';
import { PlaylistService } from '../../playlist/state/playlist.service';
import { YoutubeResult } from '../../youtube/state/youtube.model';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CreatePlaylistPopupComponent } from '../create-playlist-popup/create-playlist-popup/create-playlist-popup.component';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MainComponent implements OnInit {
  options?: FormGroup = new FormGroup({
    bottom: new FormControl(0),
    fixed: new FormControl(true),
    top: new FormControl(0)
  });
  user$: Observable<User | null> = this.authQuery.selectUser$;
  selectPlaylists$: Observable<Playlist[]> = this.playlistQuery.selectPlaylists$;
  selectActivePlaylist$: Observable<Playlist> = this.playlistQuery.selectActive() as Observable<Playlist>;
  selectCurrentlyPlayed$: Observable<YoutubeResult | null> = this.playlistQuery.selectCurrentlyPlayed$;
  selectNextPlayed$ = this.playlistQuery.selectNextPlayed$

  constructor(
    private authQuery: AuthQuery,
    private playlistService: PlaylistService,
    private playlistQuery: PlaylistQuery,
    private router: Router,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.playlistService.getPlaylists().subscribe();
  }

  createNewPlaylist() {
    this.playlistService.openCreatePlaylistDialog().subscribe((res) => {
      const playlist = this.playlistService.addNewPlaylist(res);
      if (playlist) {
        this.setActiveList(playlist)
        this.router.navigate([`main/playlist/${playlist?.id}`]);
      }
    })
  }

  setActiveList(list: Playlist) {
    if (list && list.id) {
      this.playlistService.setAsActive(list.id);
    }
  }

  
}
