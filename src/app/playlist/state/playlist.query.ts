import { Injectable } from '@angular/core';
import { Order, QueryEntity } from '@datorama/akita';
import { forkJoin, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { YoutubeResult } from '../../youtube/state/youtube.model';
import { Playlist } from './playlist.model';
import { PlaylistStore, PlaylistState } from './playlist.store';

@Injectable({ providedIn: 'root' })
export class PlaylistQuery extends QueryEntity<PlaylistState> {
  selectPlaylists$: Observable<Playlist[]> = this.selectAll();
  selectPlaylistsLength$: Observable<number> = this.selectPlaylists$.pipe(map(items => items.length));
  selectActive$: Observable<Playlist> = this.selectActive() as Observable<Playlist>;
  selectCurrentlyPlayed$: Observable<YoutubeResult | null> = this.select((state) => state.currentlyPlayed);
  selectLastUpdatedPlaylists$: Observable<Playlist[]> = this.selectAll({
    sortBy: 'lastUpdate',
    sortByOrder: Order.DESC,
    limitTo: 5,
    filterBy: entity => entity.items.length > 0
  });

  constructor(protected store: PlaylistStore) {
    super(store);
  }


}
