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
import { ToastController, AlertController } from '@ionic/angular';
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
  public user: user;
  id: string;
  sid: string;
  skillID: string;
  user$: Observable<any>;
  userData: any;
  private url = 'https://demoproject-8b1fa.appspot.com/users';
  private skillUrl = `https://demoproject-8b1fa.appspot.com/skills`;


  constructor(
    private afAuth: AngularFireAuth,
    private router: Router,
    private afs: AngularFirestore,
    private http: HttpClient,
    public toastController: ToastController,
    private alertController: AlertController,
  ) { // track current user state
    this.user$ = this.afAuth.authState.pipe(
      switchMap(curUser => {
        if (curUser) {
          this.userData = curUser;
          localStorage.setItem('user', JSON.stringify(this.userData));
          JSON.parse(localStorage.getItem('user'));
          return this.afs.doc<AuthMember>(`users/${curUser.uid}`).valueChanges();
        } else {
          localStorage.setItem('user', null);
          JSON.parse(localStorage.getItem('user'));
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
    return this.http.get<Skills>(`${this.skillUrl}/${uid}/skill/${sid}`);
  }

  updateSkill(uId: string, idSkill: string, skill: Skills) {
    return this.http.put(`${this.skillUrl}/${uId}/update/${idSkill}`, skill, httpOptions);
  }

  getData(): Observable<object> {
    return this.http.get(this.url);
  }

  getProfilePicture(id: string): Observable<Pictures> {
    return this.http.get<Pictures>(`${this.url}/${id}/pictures`);
  }

  getDatas(id: string): Observable<UserPublic> {
    return this.http.get<UserPublic>(`${this.url}/${id}/get-public`);
  }
  updatePublic(id: string, publicDetails: UserPublic) {
    return this.http.put(`${this.url}/${id}/public`, publicDetails, httpOptions);
  }
  getMember(id: string) {
    return this.http.get(`${this.url}/${id}/member`);
  }

  getSkills(id: string): Observable<Skills[]> {
    return this.http.get<Skills[]>(`${this.skillUrl}/${id}`);
  }

  getSkillID(id: string, sid: string): Observable<Skills> {
    return this.http.get<Skills>(`${this.skillUrl}/${id}/skill/${sid}`);
  }

  reAuth(username: string, password: string) {
    return this.afAuth.auth.currentUser.reauthenticateWithCredential(auth.EmailAuthProvider.credential(username, password));
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

  notifcation(msg: string, type: string) {
    return this.toastController.create({
      message: msg,
      color: type,
      duration: 4000,
      position: 'bottom'
    });
  }
  // Email link to reset password
  resetPassword(email: string) {
    return this.afAuth.auth.sendPasswordResetEmail(email).then(() => {
      this.presentAlert('Password reset', 'Password reset email sent, check your inbox.');
    }).catch(error => this.presentAlert('Error occured ', error.message));
    }
    async presentAlert(title: string, content: string) {
      const alert = await this.alertController.create({
        header: title,
        message: content,
        buttons: ['OK']

      });
      await alert.present();
    }
  }

