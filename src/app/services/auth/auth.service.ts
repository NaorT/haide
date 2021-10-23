import { Injectable } from '@angular/core';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from 'firebase/auth'
import { Observable } from 'rxjs';
import { LoginDetails, User } from '../../app.models';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  register({ email, password }: LoginDetails) {
    return new Observable((o) => {
      const auth = getAuth();
      createUserWithEmailAndPassword(auth, email, password).then((userCred) => {
        o.next(userCred);
        o.complete();
      }).catch((error) => {
        o.error(error);
      })
    })
  }

  signIn({ email, password }: LoginDetails) {
    return new Observable((o) => {
      const auth = getAuth();
      signInWithEmailAndPassword(auth, email, password).then((userCred) => {
        o.next(userCred);
        o.complete();
      }).catch((error) => {
        o.error(error);
      })
    })
  }

  signInWithGoogle() {
    return new Observable((o) => {
      const auth = getAuth();
      const provider = new GoogleAuthProvider();
      signInWithPopup(auth, provider)
        .then((result) => {
          o.next(result.user);
          o.complete();
        }).catch((error) => {
          o.error(error);
        })
    });
  }

}
