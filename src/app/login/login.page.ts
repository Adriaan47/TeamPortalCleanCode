import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { UsersService } from '../services/users.service';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { NgForm } from '@angular/forms';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

loginUser: any = {};

  constructor(
    public afAuth: AngularFireAuth,
    public user: UsersService,
    public router: Router,
    public toastController: ToastController,
    ) {

  }

  ngOnInit() {
  }

  onSubmit(user: NgForm) {
    const eid = user.value.eid + '@accenture.com';
    this.afAuth.auth.signInWithEmailAndPassword(eid, user.value.password).then(async () => {
      const toast = await this.toastController.create({
        message: `${user.value.eid} logged in successfully`,
        duration: 3000,
        color: 'success'
      });
      toast.present();
      this.router.navigate(['tabs/profile'])
    }).catch(async () => {
      const toast = await this.toastController.create({
        message: 'Incorrect password or email!.',
        duration: 3000,
        color: 'danger'
      });
      toast.present();
    });
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

