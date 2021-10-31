import { Injectable } from '@angular/core';
import { QueryEntity } from '@datorama/akita';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Playlist } from './playlist.model';
import { PlaylistStore, PlaylistState } from './playlist.store';

@Injectable({ providedIn: 'root' })
export class PlaylistQuery extends QueryEntity<PlaylistState> {
  selectPlaylists$: Observable<Playlist[]> = this.selectAll();
  selectPlaylistsLength$: Observable<number> = this.selectPlaylists$.pipe(map(items => items.length));
  selectActive$: Observable<Playlist> = this.selectActive() as Observable<Playlist>;

  constructor(protected store: PlaylistStore) {
    super(store);
  }

}
