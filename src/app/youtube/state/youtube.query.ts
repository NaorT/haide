import { Injectable } from '@angular/core';
import { QueryEntity } from '@datorama/akita';
import { YoutubeStore, YoutubeState } from './youtube.store';

@Injectable({ providedIn: 'root' })
export class YoutubeQuery extends QueryEntity<YoutubeState> {

  selectResults$ = this.select((entity) => entity.items)

  constructor(protected store: YoutubeStore) {
    super(store);
  }

}
