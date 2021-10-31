import { Injectable } from '@angular/core';
import { EntityState, EntityStore, StoreConfig } from '@datorama/akita';
import { YoutubeResult } from './youtube.model';

export interface YoutubeState extends EntityState<YoutubeResult> {
  searchPageItems: YoutubeResult[];
  playlistPageItems: YoutubeResult[];
 }


@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'youtube' })
export class YoutubeStore extends EntityStore<YoutubeState> {

  constructor() {
    super();
  }

}
