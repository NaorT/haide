import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EntityService, guid } from '@datorama/akita';
import { Observable } from 'rxjs';
import { User } from '../../auth/state/auth.model';
import { AuthQuery } from '../../auth/state/auth.query';
import { CreatePlaylistPopupComponent } from '../../main/create-playlist-popup/create-playlist-popup/create-playlist-popup.component';
import { YoutubeResult } from '../../youtube/state/youtube.model';
import { createPlaylist, Playlist } from './playlist.model';
import { PlaylistStore, PlaylistState } from './playlist.store';

@Injectable({ providedIn: 'root' })
export class PlaylistService extends EntityService<PlaylistState> {

  constructor(
    protected store: PlaylistStore,
    private dialog: MatDialog,
    private authQuery: AuthQuery
  ) {
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

  openCreatePlaylistDialog() {
    return this.dialog.open(CreatePlaylistPopupComponent,
      { width: '30vw', height: '30vh', panelClass: 'dark' }).afterClosed()
  }

  addNewPlaylist(res: string, shouldSetAsActive: boolean = false) {
    if (!res) {
      return;
    }
    const newPlaylist = createPlaylist({ id: guid(), name: res, items: [], createdBy: (this.authQuery.getActive() as User)?.displayName });
    this.store.upsert(newPlaylist.id, newPlaylist);
    if (shouldSetAsActive) {
      this.setAsActive(newPlaylist.id);
    }
  }

  addSongToPlaylist(playlist: Playlist, item: YoutubeResult) {
    const addedBy = (this.authQuery.getActive() as User)?.displayName;
    const isAlreadyExist: boolean = !!playlist.items.find((x) => item.id === x.id);
    if (!isAlreadyExist) {
      this.addItemToPlaylist(item, addedBy, playlist.id);
    }
  }
}

