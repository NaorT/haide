import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EntityService } from '@datorama/akita';
import { Observable, of } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { mock } from '../../mock';
import { YoutubeResult } from './youtube.model';
import { YoutubeStore, YoutubeState } from './youtube.store';

const YOUTUBE_BASE_URL = 'https://www.googleapis.com/youtube/v3';
@Injectable({ providedIn: 'root' })
export class YoutubeService extends EntityService<YoutubeState> {

  constructor(protected store: YoutubeStore, private http: HttpClient) {
    super();
  }

  search(value: string, ctx: string = 'search | playlist') {
    // return this.http.get(`${YOUTUBE_BASE_URL}/search?type=video&part=snippet,id&maxResults=2&q=${value}&key=${'AIzaSyDOCGnCtKje_Zex8vUGWji_g4NwQ_wJTHI'}&videoEmbeddable=true`)
    return of(mock)
      .pipe(
        map((res: any) => res.items),
        map((items: any[]) => items.map(item => ({
          title: item.snippet.title,
          id: item.id.videoId,
          thumbnails: item.snippet.thumbnails
        }))),
        tap((results: YoutubeResult[]) => this.store.update((state) => {
          let items = ctx === 'search' ? 'searchPageItems' : 'playlistPageItems';
          return { ...state, [items]: results }
        }))
      )
  }






  get<T>(id?: any, config?: any): Observable<T> {
    throw new Error('Method not implemented.');
  }
  add<T>(entity: any, config?: any): Observable<T> {
    throw new Error('Method not implemented.');
  }
  update<T>(id: any, entity: Partial<YoutubeResult>, config: any): Observable<T> {
    throw new Error('Method not implemented.');
  }
  delete<T>(id: any, config: any): Observable<T> {
    throw new Error('Method not implemented.');
  }


}
