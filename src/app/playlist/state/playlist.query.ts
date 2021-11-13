import { Injectable } from '@angular/core';
import { Order, QueryEntity } from '@datorama/akita';
import { collection, CollectionReference, doc, getFirestore, onSnapshot } from 'firebase/firestore';
import { forkJoin, Observable, of } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { YoutubeResult } from '../../youtube/state/youtube.model';
import { Playlist } from './playlist.model';
import { PlaylistStore, PlaylistState } from './playlist.store';

@Injectable({ providedIn: 'root' })
export class PlaylistQuery extends QueryEntity<PlaylistState> {
  selectPlaylists$: Observable<Playlist[]> = this.selectAll();
  selectPlaylistsLength$: Observable<number> = this.selectPlaylists$.pipe(map(items => items.length));
  selectActive$: Observable<Playlist> = this.selectActive() as Observable<Playlist>;
  selectCurrentlyPlayed$: Observable<YoutubeResult | null> = this.select((state) => state.currentlyPlayed);
  selectNextPlayed$: Observable<YoutubeResult | null> = this.selectCurrentlyPlayed$.pipe(
    map((item) => {
      return this.getNextSong(item);
    })
  )

  constructor(protected store: PlaylistStore) {
    super(store);
  }

  private getNextSong(item: YoutubeResult | null) {
    if (!item) {
      return null;
    }
    const active: Playlist = (this.getActive() as Playlist);
    if (!active) {
      return null;
    }
    let currentIndex: number = active.items.findIndex((x) => x.id === item?.id);
    if (currentIndex > -1) {
      let nextItem: YoutubeResult = active.items[currentIndex + 1];
      if (nextItem) {
        return nextItem;
      }
    }
    return null;
  }

}
