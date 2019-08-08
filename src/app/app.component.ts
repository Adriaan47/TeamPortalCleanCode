import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { MenuController } from '@ionic/angular';
import { UsersService } from '../app/services/users.service';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {

  constructor(
    private menu: MenuController,
    public router: Router,
    private alertCtrl: AlertController,
    private platform: Platform,
    private statusBar: StatusBar,
    private afAuth: AngularFireAuth,
    private userServ: UsersService
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();

    });
  }

  async presentAlertConfirmLogout() {
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
            this.logout();
          }
        }
      ]
      // tslint:disable-next-line: semicolon
    });
    await alert.present();
  }

  openEnd() {
    this.menu.open('end');
  }
  reset() {
    const userEmail = this.afAuth.auth.currentUser.email;
    this.userServ.resetPassword(userEmail)
  }

  async logout() {
    await this.userServ.logout();
  }

}
