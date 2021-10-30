import { Injectable } from '@angular/core';
import { QueryEntity } from '@datorama/akita';
import { PlaylistStore, PlaylistState } from './playlist.store';

@Injectable({ providedIn: 'root' })
export class PlaylistQuery extends QueryEntity<PlaylistState> {

  constructor(protected store: PlaylistStore) {
    super(store);
  }

}
