import { Injectable } from '@angular/core';
import { EntityService } from '@datorama/akita';
import { Observable, of } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { YoutubeResult } from './youtube.model';
import { YoutubeStore, YoutubeState } from './youtube.store';

@Injectable({ providedIn: 'root' })
export class YoutubeService extends EntityService<YoutubeState> {

  constructor(protected store: YoutubeStore) {
    super();
  }

  search(value: string) {
    return of(
      {
        items: [
          {
            vidName: 'video1'
          },
          {
            vidName: 'video2'
          }
        ],
      }
    ).pipe(
      map((res: any) => res.items),
      map((items: any[]) => items.map(item => ({
        name: item.vidName
      }))),
      tap((results) => this.store.update((state) => {
        return { ...state, items: results }
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
