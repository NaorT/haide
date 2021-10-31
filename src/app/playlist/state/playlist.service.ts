import { Injectable } from '@angular/core';
import { EntityService } from '@datorama/akita';
import { Observable } from 'rxjs';
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
    this.store.add(playlist);
  }

  setAsActive(playlist: Playlist) {
    this.store.setActive(playlist.id);
  }


}
