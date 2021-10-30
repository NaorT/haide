import { Injectable } from '@angular/core';
import { EntityState, EntityStore, StoreConfig } from '@datorama/akita';
import { User } from './auth.model';

export interface AuthState extends EntityState<User> {
  user: User | null
}

export function createInitialState(): AuthState {
  return {
    user: null
  };
}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'auth' })
export class AuthStore extends EntityStore<AuthState> {

  constructor() {
    super(createInitialState());
  }

}
