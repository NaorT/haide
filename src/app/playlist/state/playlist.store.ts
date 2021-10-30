import { Injectable } from '@angular/core';
import { EntityState, EntityStore, StoreConfig } from '@datorama/akita';
import { Playlist } from './playlist.model';

export interface PlaylistState extends EntityState<Playlist> {}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'playlist' })
export class PlaylistStore extends EntityStore<PlaylistState> {

  constructor() {
    super();
  }

}
