import { Injectable } from '@angular/core';
import { QueryEntity } from '@datorama/akita';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { YoutubeResult } from '../../youtube/state/youtube.model';
import { Playlist } from './playlist.model';
import { PlaylistStore, PlaylistState } from './playlist.store';
import { Firestore } from "@angular/fire/firestore";
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({ providedIn: 'root' })
export class PlaylistQuery extends QueryEntity<PlaylistState> {
  selectPlaylists$: Observable<Playlist[]> = this.selectAll();
  // selectPlaylists$: Observable<Playlist[]> = this.db.collection('playlists').valueChanges() as Observable<Playlist[]>;
  selectPlaylistsLength$: Observable<number> = this.selectPlaylists$.pipe(map(items => items.length));
  selectActive$: Observable<Playlist> = this.selectActive() as Observable<Playlist>;
  selectCurrentlyPlayed$: Observable<YoutubeResult | null> = this.select((state) => state.currentlyPlayed);
  selectNextPlayed$: Observable<YoutubeResult | null> = this.selectCurrentlyPlayed$.pipe(
    map((item) => {
      return this.getNextSong(item);
    })
  )

  constructor(
    protected store: PlaylistStore,
    private db: AngularFirestore) {
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
