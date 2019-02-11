import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth'

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {

  constructor(private angularFireAuth: AngularFireAuth) {}

  loginWithEmail(email: string, password: string) {
    return this.angularFireAuth.auth.signInWithEmailAndPassword(email,password);
  }

  registryWithEmail(email: string, password: string) {
    return this.angularFireAuth.auth.createUserWithEmailAndPassword(email,password);
  }

  //manera de recuperar la sesión del usuario logueado
  getStatus(){
   return this.angularFireAuth.authState;//en qué estado se encuentra el usuario 
                              // retorna información cada que haya un cambio en la sesión del usuario
  }

  logout(){
    return this.angularFireAuth.auth.signOut();
  }
}
