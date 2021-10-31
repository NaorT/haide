import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { guid } from '@datorama/akita';
import { Observable } from 'rxjs';
import { User } from '../../auth/state/auth.model';
import { AuthQuery } from '../../auth/state/auth.query';
import { createPlaylist, Playlist } from '../../playlist/state/playlist.model';
import { PlaylistQuery } from '../../playlist/state/playlist.query';
import { PlaylistService } from '../../playlist/state/playlist.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  options?: FormGroup = new FormGroup({
    bottom: new FormControl(0),
    fixed: new FormControl(true),
    top: new FormControl(0)
  });
  user$: Observable<User | null> = this.authQuery.selectUser$;
  selectPlaylists$: Observable<Playlist[]> = this.playlistQuery.selectPlaylists$;

  constructor(
    private authQuery: AuthQuery,
    private playlistService: PlaylistService,
    private playlistQuery: PlaylistQuery,
    private router: Router
  ) { }

  ngOnInit(): void { }

  createNewPlaylist() {
    const newPlaylist = createPlaylist({ id: guid(), name: `New Playlist`, items: [] });
    this.playlistService.createNewPlayList(newPlaylist);
    this.setActiveList(newPlaylist);
    this.router.navigate([`main/playlist/${newPlaylist.id}`]);
  }

  setActiveList(list: Playlist) {
    this.playlistService.setAsActive(list);
  }
}
