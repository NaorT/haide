import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { EntityService } from '@datorama/akita';
import { Observable } from 'rxjs';
import { createUser, User } from './auth.model';
import { AuthStore, AuthState } from './auth.store';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';
@Injectable({ providedIn: 'root' })
export class AuthService extends EntityService<AuthState> {

  constructor(
    protected store: AuthStore,
    private router: Router,
    private auth: AngularFireAuth,
  ) {
    super();
  }

  signIn(providerOption: 'facebook' | 'google') {
    const provider = providerOption === 'facebook' ? new firebase.auth.FacebookAuthProvider() : new firebase.auth.GoogleAuthProvider();
    this.auth.signInWithPopup(provider)
      .then((result) => {
        if (result && result.user) {
          const loggedInUser = createUser(
            {
              displayName: result.user.displayName || '',
              email: result.user.email || '',
              photoURL: result.user.photoURL || '',
              id: result.user.uid
            }
          )
          this.store.update((state) => {
            return { ...state, user: loggedInUser }
          })
          this.router.navigate(['main'])
        }
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
