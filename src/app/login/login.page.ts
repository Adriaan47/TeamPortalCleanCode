import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { UsersService } from '../services/users.service';
import { Router } from '@angular/router';
import { ToastController, MenuController, AlertController } from '@ionic/angular';
import { AngularFirestoreDocument, AngularFirestore } from '@angular/fire/firestore';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  mainuser: AngularFirestoreDocument;
  profilePic: string;
  sub;
  res: any;
  data: any;

  constructor(
    public router: Router,
    private afs: AngularFirestore,
    private user: UsersService,
    private users: UsersService,
    private menu: MenuController,
    private http: HttpClient,
    private alertCtrl: AlertController) {
    this.mainuser = afs.doc(`users/${this.users.getUID()}`);
    this.sub = this.mainuser.valueChanges().subscribe(event => {
      this.profilePic = event.profilePic;
    });
    this.getDp();
  }


  ngOnInit() {
    this.users.getMember(this.users.getUID()).subscribe((res) => {
      this.res = res;
      console.log(res);
    });

  }

  getDp() {
    this.users.getProfilePicture(this.users.getUID()).subscribe((data) => {
      this.data = data;
      console.log(data);
    });
  }


  edit() {
    this.router.navigate(['/tabs/profile']);
  }

  async presentAlertConfirm() {
    const alert = await this.alertCtrl.create({
      header: 'Logout',
      message: 'Are you sure you want to logout?',
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel: ?');
          }
        }, {
          text: 'Yes',
          handler: () => {
            this.router.navigate(['/login']);
          }
        }
      ]
      // tslint:disable-next-line: semicolon
    });
    await alert.present();
  }

  openFirst() {
    this.menu.enable(true, 'first');
    this.menu.open('first');
  }
}
