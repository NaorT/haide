import { Injectable } from '@angular/core';
import { EntityState, EntityStore, StoreConfig } from '@datorama/akita';
import { YoutubeResult } from '../../youtube/state/youtube.model';
import { Playlist } from './playlist.model';

export interface PlaylistState extends EntityState<Playlist> {
  currentlyPlayed: YoutubeResult | null;
  playlists: Playlist[];
}

export function createInitialStore(): PlaylistState {
  return {
    currentlyPlayed: null,
    playlists: []
  }
}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'playlist' })
export class PlaylistStore extends EntityStore<PlaylistState> {

  constructor() {
    super();
  }

}
