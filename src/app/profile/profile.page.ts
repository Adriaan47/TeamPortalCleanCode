import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { AlertController, MenuController } from '@ionic/angular';
import { UsersService } from '../services/users.service';

@Component({
  selector: 'app-profile',
  templateUrl: 'profile.page.html',
  styleUrls: ['profile.page.scss']
})
export class ProfilePage implements OnInit {
  mainuser: AngularFirestoreDocument;
  profilePic: string;
  sub;
  res: any;
  data: any;
  userId: string;
  constructor(
    public router: Router,
    private afs: AngularFirestore,
    private user: UsersService,
    private users: UsersService,
    private menu: MenuController,
    private http: HttpClient,
    private alertCtrl: AlertController) {
  }


  ngOnInit() {
    this.userId = this.users.getUID();
    this.users.getDatas(this.userId).subscribe((res) => {
      this.res = res;
    });

  }

  getDp() {
    this.users.getProfilePicture(this.users.getUID()).subscribe((data) => {
      this.data = data.avatar;
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
