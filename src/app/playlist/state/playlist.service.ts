import { Injectable } from '@angular/core';
import { NgEntityService } from '@datorama/akita-ng-entity-service';
import { PlaylistStore, PlaylistState } from './playlist.store';

@Injectable({ providedIn: 'root' })
export class PlaylistService extends NgEntityService<PlaylistState> {

  constructor(protected store: PlaylistStore) {
    super(store);
  }

}
