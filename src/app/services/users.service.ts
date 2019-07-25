import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { first, switchMap } from 'rxjs/operators';
import { auth } from 'firebase/app';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Skills } from '../services/skills';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { AuthMember } from '../interfaces/authMember';
import { ToastController } from '@ionic/angular';
import { UserPublic } from './user.public.interface';


// tslint:disable-next-line: class-name
interface user {
  username: string;
  uid: string;
}
// tslint:disable-next-line: no-unused-expression
interface Pictures {
  avatar: string;
  profilePicture: string;
}
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class UsersService {
    isAuthenticated() {
        throw new Error("Method not implemented.");
    }
  public user: user;
  id: string;
  sid: string;
  skillID: string;
  user$: Observable<any>;

  // tslint:disable-next-line: no-inferrable-types
  private url: string = 'https://demoproject-8b1fa.appspot.com/users';
  // tslint:disable-next-line: no-inferrable-types
  private skillUrl: string = `https://demoproject-8b1fa.appspot.com/users/skills`;

  constructor(
    private afAuth: AngularFireAuth,
    private router: Router,
    private afs: AngularFirestore,
    private http: HttpClient,
    public toastController: ToastController,
  ) { // track current user state
    this.user$ = this.afAuth.authState.pipe(
      switchMap(curUser => {
        if (curUser) {
          return this.afs.doc<AuthMember>(`users/${curUser.uid}`).valueChanges();
        } else {
          return of(null);
        }
      })
    );
  }


  // tslint:disable-next-line: no-shadowed-variable
  setUser(user: user) {
    this.user = user;
  }
  getUsername(): string {
    return this.user.username;
  }

  getName(): string {
    return this.user.username;
  }

  deleteSkill(uid: string, id: string) {
    return this.http.delete(this.skillUrl + `/${uid}/delete/${id}`);
  }

  createSkill(uid: string, skill: Skills) {
    return this.http.post(this.skillUrl + `/${uid}/create`, skill);
  }



  getCurrentUserSkill(uid: string, sid: string): Observable<Skills> {
    return this.http.get<Skills>(`https://demoproject-8b1fa.appspot.com/users/skills/${uid}/skill/${sid}`);
  }

  getData(): Observable<object> {
    return this.http.get(this.url);
  }

  getProfilePicture(id: string): Observable<Pictures> {
    return this.http.get<Pictures>(`https://demoproject-8b1fa.appspot.com/users/${id}/pictures`);
  }

  getDatas(id: string): Observable<UserPublic> {
    return this.http.get<UserPublic>(`https://demoproject-8b1fa.appspot.com/users/${id}/get-public`);
  }

  getMember(id: string) {
    return this.http.get(`https://demoproject-8b1fa.appspot.com/users/${id}/member`);
  }

  getSkills(id: string): Observable<Skills> {
    return this.http.get<Skills>(`https://demoproject-8b1fa.appspot.com/skills/${id}`);
  }

  getSkillID(id: string, sid: string): Observable<Skills> {
    return this.http.get<Skills>(`https://demoproject-8b1fa.appspot.com/skills/${id}/skill/${sid}`);
  }

  reAuth(username: string, password: string) {
    return this.afAuth.auth.currentUser.reauthenticateWithCredential(auth.EmailAuthProvider.credential(username, password));
  }


  updateEmail(newemail: string) {
    return this.afAuth.auth.currentUser.updateEmail(newemail);
  }


  getUID() {
    if (!this.user) {
      if (this.afAuth.auth.currentUser) {
        // tslint:disable-next-line: no-shadowed-variable
        const user = this.afAuth.auth.currentUser;
        this.setUser({
          username: user.email.split('@')[0],
          uid: user.uid
        });
        return user.uid;
      } else {
        throw new Error('User not logged in');
      }
    } else {
      return this.user.uid;
    }
  }
  // get profile picture
  getPictures(id: string): Observable<Pictures> {
    return this.http.get<Pictures>(`https://demoproject-8b1fa.appspot.com/users/${id}/pictures`);
  }

  notifcation(msg: string, type: string) {
    return this.toastController.create({
      message: msg,
      color: type,
      duration: 4000,
      position: 'bottom'
    });
  }
}
