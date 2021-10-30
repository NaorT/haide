import { Injectable } from '@angular/core';
import { QueryEntity } from '@datorama/akita';
import { Observable } from 'rxjs';
import { User } from './auth.model';
import { AuthStore, AuthState } from './auth.store';
import { map } from 'rxjs/operators';


@Injectable({ providedIn: 'root' })
export class AuthQuery extends QueryEntity<AuthState> {

  selectUser$ = this.select((entity) => entity.user);
  isLoggedIn$: Observable<boolean> = this.selectUser$.pipe(map((user: User | null) => !!user));

  constructor(protected store: AuthStore) {
    super(store);
  }

}
