import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { first } from 'rxjs/operators';
import { auth } from 'firebase/app';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Skills } from '../services/skills';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';


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
  // tslint:disable-next-line: no-inferrable-types
  private url: string = 'https://demoproject-8b1fa.appspot.com/users';
// tslint:disable-next-line: no-inferrable-types
  private skillUrl: string = `https://demoproject-8b1fa.appspot.com/users/skills`;

  constructor(
    private afAuth: AngularFireAuth,
    private router: Router,
    private afs: AngularFirestore,
    private http: HttpClient,
     ) {


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

      deleteSkill(uid: string, id: string) {
        return this.http.delete(this.skillUrl + `/${uid}/delete/${id}`);
        }

        createSkill (uid: string, skill: Skills) {
          return this.http.post(this.skillUrl + `/${uid}/create`, skill );
        }



        getCurrentUserSkill(uid: string, sid: string): Observable<Skills> {
          return this.http.get<Skills>(`https://demoproject-8b1fa.appspot.com/users/skills/${uid}/skill/${sid}`);
          }

      getData(): Observable<Object> {
          return this.http.get(this.url);
        }

        getProfilePicture(id: string): Observable<Object> {
          return this.http.get(`https://demoproject-8b1fa.appspot.com/users/${id}/pictures`);
        }

        getDatas(id: string): Observable<Object> {
          return this.http.get(`https://demoproject-8b1fa.appspot.com/users/${id}/get-public`);
        }

        getMember(id: string) {
          return this.http.get(`https://demoproject-8b1fa.appspot.com/users/${id}/member`);
        }

        getSkills(id: string): Observable<Object> {
          return this.http.get(`https://demoproject-8b1fa.appspot.com/skills/${id}`);
        }

        getSkillID(id: string, sid: string): Observable<Object> {
          return this.http.get(`https://demoproject-8b1fa.appspot.com/skills/${id}/skill/${sid}`);
        }

    reAuth(username: string, password: string) {
    return this.afAuth.auth.currentUser.reauthenticateWithCredential(auth.EmailAuthProvider.credential(username, password));
    }

  updatePassword(newpassword: string) {
  return this.afAuth.auth.currentUser.updatePassword(newpassword);
  }

  updateEmail(newemail: string) {
  return this.afAuth.auth.currentUser.updateEmail(newemail);
  }

  async isAuthenticated() {
  if (this.user) { return true; }

  // tslint:disable-next-line: no-shadowed-variable
  const user = await this.afAuth.authState.pipe(first()).toPromise();

  if (user) {
  this.setUser({
  username: user.email.split('@')[0],
  uid: user.uid
  });

  return true;
  }
  return false;
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
              throw new Error ('User not logged in');
          }    } else {
          return this.user.uid;
      }

  }
  // get profile picture
  getPictures(id: string): Observable<Pictures> {
    return this.http.get<Pictures>(`https://demoproject-8b1fa.appspot.com/users/${id}/pictures`);
  }

  }
