import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { UsersService } from '../../services/users.service';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: '../login/login.page.html',
  styleUrls: ['../login/login.page.scss'],
})
export class LoginPage implements OnInit {
  // tslint:disable-next-line: no-inferrable-types
  username: string = '';
  // tslint:disable-next-line: no-inferrable-types
  password: string = '';

  constructor(
    public afAuth: AngularFireAuth,
    public user: UsersService,
    public router: Router,
    public toastController: ToastController,
  ) {

  }

  ngOnInit() {
  }
  async login() {
    // tslint:disable-next-line: indent
    const { username, password } = this;
    // this.username = '';
    // this.password = '';
    // tslint:disable-next-line: indent
    try {
      // tslint:disable-next-line: indent
      // Only sign in with accenture email
      const res = await this.afAuth.auth.signInWithEmailAndPassword(username + '@accenture.com', password);

      if (res.user) {
        this.user.setUser({
          username,
          uid: res.user.uid
        });

        this.router.navigate(['/tabs']);
        console.log(username);
      }

    } catch (err) {
      console.log(err);
      const toast = await this.toastController.create({
        message: 'Incorrect password or email!.',
        duration: 3000,
        color: 'danger'
      });
      toast.present();

    }
    // this.wait(3000);
    // this.refresh();
  }
  refresh(): void {
    window.location.reload();
  }

  wait(ms) {
    const start = new Date().getTime();
    let end = start;
    while (end < start + ms) {
      end = new Date().getTime();
    }
  }

}
