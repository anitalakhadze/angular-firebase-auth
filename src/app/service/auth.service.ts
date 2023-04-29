import { Injectable } from '@angular/core';
import {AngularFireAuth} from "@angular/fire/compat/auth";
import firebase from 'firebase/compat/app';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user: firebase.User | null | undefined;

  constructor(private afAuth: AngularFireAuth) {
    this.afAuth.authState.subscribe(user => {
      this.user = user;
    });
  }

  async emailAndPasswordLogin(email: string, password: string) {
    try {
      const result = await this.afAuth.signInWithEmailAndPassword(email, password);
      this.user = result.user;
      return this.user;
    } catch (error) {
      console.log('Error logging in with email and password', error);
      throw error;
    }
  }

  async emailAndPasswordRegister(email: string, password: string) {
    try {
      const result = await this.afAuth.createUserWithEmailAndPassword(email, password);
      this.user = result.user;
      return this.user;
    } catch (error) {
      console.log('Error registering with email and password', error);
      throw error;
    }
  }

  async googleLogin() {
    try {
      const provider = new firebase.auth.GoogleAuthProvider();
      const result = await this.afAuth.signInWithPopup(provider);
      this.user = result.user;
      return this.user;
    } catch (error) {
      console.log('Error logging in with Google', error);
      throw error;
    }
  }

  async logout() {
    try {
      await this.afAuth.signOut();
      this.user = null;
    } catch (error) {
      console.log('Error logging out', error);
      throw error;
    }
  }

  isUserAuthenticated(): boolean {
    return this.user != null;
  }
}
