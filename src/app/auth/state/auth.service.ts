import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { EntityService } from '@datorama/akita';
import { NgEntityService } from '@datorama/akita-ng-entity-service';
import { FacebookAuthProvider, getAuth, GoogleAuthProvider, signInWithPopup, UserCredential } from 'firebase/auth';
import { Observable } from 'rxjs';
import { createUser, User } from './auth.model';
import { AuthStore, AuthState } from './auth.store';

@Injectable({ providedIn: 'root' })
export class AuthService extends EntityService<AuthState> {

  constructor(protected store: AuthStore, private router: Router) {
    super();
  }

  signIn(providerOption: 'facebook' | 'google') {
    const auth = getAuth();
    const provider = providerOption === 'facebook' ? new FacebookAuthProvider() : new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((result: UserCredential) => {
        const user = result.user;
        const loggedInUser = createUser(
          {
            displayName: user.displayName || '',
            email: user.email || '',
            photoURL: user.photoURL || '',
            id: user.uid
          }
        )
        this.store.update((state) => {
          return { ...state, user: loggedInUser }
        })
        this.router.navigate(['main'])
      }).catch((error) => {
      })
  }


  get<T>(id?: any, config?: any): Observable<T> {
    throw new Error('Method not implemented.');
  }
  add<T>(entity: any, config?: any): Observable<T> {
    throw new Error('Method not implemented.');
  }
  update<T>(id: any, entity: Partial<User>, config: any): Observable<T> {
    throw new Error('Method not implemented.');
  }
  delete<T>(id: any, config: any): Observable<T> {
    throw new Error('Method not implemented.');
  }

}
