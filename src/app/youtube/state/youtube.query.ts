import { Injectable } from '@angular/core';
import { QueryEntity } from '@datorama/akita';
import { Observable } from 'rxjs';
import { YoutubeResult } from './youtube.model';
import { YoutubeStore, YoutubeState } from './youtube.store';

@Injectable({ providedIn: 'root' })
export class YoutubeQuery extends QueryEntity<YoutubeState> {

  selectSearchPageResults$: Observable<YoutubeResult[]> = this.select((entity) => entity.searchPageItems);
  selectPlaylistPageResults$: Observable<YoutubeResult[]> = this.select((entity) => entity.playlistPageItems);


  constructor(protected store: YoutubeStore) {
    super(store);
  }

}
