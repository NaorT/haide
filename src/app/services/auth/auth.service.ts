import { Injectable } from '@angular/core';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth'
import { Observable } from 'rxjs';
import { LoginDetails, User } from '../../app.models';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  register({ email, password }: Partial<User>) {
    if (!email || !password) {
      return;
    }
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, email, password).then((userCred) => {

    }).catch((error) => {
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

}
