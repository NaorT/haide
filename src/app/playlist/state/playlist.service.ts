import { Injectable } from '@angular/core';
import { EntityService } from '@datorama/akita';
import { Observable } from 'rxjs';
import { YoutubeResult } from '../../youtube/state/youtube.model';
import { Playlist } from './playlist.model';
import { PlaylistStore, PlaylistState } from './playlist.store';

@Injectable({ providedIn: 'root' })
export class PlaylistService extends EntityService<PlaylistState> {

  constructor(protected store: PlaylistStore) {
    super();
  }

  get<T>(id?: any, config?: any): Observable<T> {
    throw new Error('Method not implemented.');
  }
  add<T>(entity: any): Observable<T> {
    throw new Error('Method not implemented.');
  }
  update<T>(id: any, entity: Partial<Playlist>, config: any): Observable<T> {
    throw new Error('Method not implemented.');
  }
  delete<T>(id: any, config: any): Observable<T> {
    throw new Error('Method not implemented.');
  }

  createNewPlayList(playlist: Playlist) {
    this.store.upsert(playlist.id, playlist);
  }

  setAsActive(playlistId: string) {
    this.store.setActive(playlistId);
  }

  addItemToPlaylist(item: YoutubeResult, addedBy?: string, playListId?: string) {
    this.store.updateActive(active => {
      return {
        items: [...active.items, { ...item, addedBy, playListId }]
      }
    })
  }

  removeItemFromPlaylist(item: YoutubeResult) {
    this.store.updateActive(active => {
      return {
        items: [...active.items.filter((x) => x.id !== item.id)]
      }
    })
  }

  updateCurrentlyPlayed(item: YoutubeResult) {
    this.store.update({ currentlyPlayed: item });
  }

  updateActive(id: string) {
    this.store.updateActive({ id })
  }

}
