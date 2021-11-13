import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { EntityService, guid } from '@datorama/akita';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { User } from '../../auth/state/auth.model';
import { AuthQuery } from '../../auth/state/auth.query';
import { CreatePlaylistPopupComponent } from '../../main/create-playlist-popup/create-playlist-popup/create-playlist-popup.component';
import { SnackBarService } from '../../services/snack-bar/snack-bar.service';
import { YoutubeResult } from '../../youtube/state/youtube.model';
import { YoutubeService } from '../../youtube/state/youtube.service';
import { createPlaylist, Playlist } from './playlist.model';
import { PlaylistStore, PlaylistState } from './playlist.store';


@Injectable({ providedIn: 'root' })
export class PlaylistService extends EntityService<PlaylistState> {
  playlistsCollectionRef = this.db.collection('playlists');

  constructor(
    protected store: PlaylistStore,
    private router: Router,
    private dialog: MatDialog,
    private authQuery: AuthQuery,
    private snackBarService: SnackBarService,
    private youtubeService: YoutubeService,
    private db: AngularFirestore
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

  getPlaylists() {
    return this.db.collection('playlists').valueChanges().pipe(
      tap((items) => {
        this.store.upsertMany(items as Playlist[]);
      })
    );
  }



  setAsActive(playlistId: string) {
    this.store.setActive(playlistId);
  }

  // addItemToPlaylist(item: YoutubeResult, addedBy?: string, playListId?: string) {
  //   this.store.updateActive(active => {
  //     return {
  //       lastUpdate: new Date().getTime(),
  //       items: [...active.items, { ...item, addedBy, playListId }]
  //     }
  //   })
  // }

  removePlayList(playList: Playlist) {
    this.playlistsCollectionRef.doc(playList.id).delete().then(() => {
      this.router.navigate(['main', 'home']);
      this.store.remove(playList.id)
    })
  }

  removeItemFromPlaylist(item: YoutubeResult, playlist: Playlist) {
    this.playlistsCollectionRef.doc(playlist.id).update({ items: playlist.items.filter((x) => x.id !== item.id) })
    // this.store.updateActive(active => {
    //   return {
    //     items: [...active.items.filter((x) => x.id !== item.id)]
    //   }
    // })
  }

  updateCurrentlyPlayed(item: YoutubeResult) {
    this.store.update({ currentlyPlayed: item });
  }

  updateActiveName(playlist: Playlist) {
    this.playlistsCollectionRef.doc(playlist.id).update({ name: playlist.name })
  }

  openCreatePlaylistDialog(playlist?: Playlist) {
    return this.dialog.open(CreatePlaylistPopupComponent,
      { width: '30vw', height: 'auto', panelClass: 'dark', data: playlist }).afterClosed();
  }


  addNewPlaylist(res: string) {
    if (!res) {
      return;
    }
    const newPlaylist = createPlaylist(
      {
        id: guid(),
        name: res,
        items: [],
        createdBy: (this.authQuery.getActive() as User)?.displayName || '',
      });
    this.playlistsCollectionRef.doc(newPlaylist.id).set(newPlaylist);
    // this.store.upsert(newPlaylist.id, newPlaylist);
    this.snackBarService.openSnackBar('New playlist created');
    return newPlaylist;
  }

  addSongToPlaylist(playlist: Playlist, item: YoutubeResult) {
    const isAlreadyExist: boolean = !!playlist.items.find((x) => item.id === x.id);
    if (!isAlreadyExist) {
      const addedBy = (this.authQuery.getActive() as User)?.displayName || '';
      this.playlistsCollectionRef.doc(playlist.id).update({ items: [...playlist.items, { ...item, addedBy, playlistId: playlist.id }] })
      // this.addItemToPlaylist(item, addedBy, playlist.id);
      this.snackBarService.openSnackBar('Song added to your playlist');
    } else {
      this.snackBarService.openSnackBar('Song already exist in your playlist', false);
    }
  }
}

