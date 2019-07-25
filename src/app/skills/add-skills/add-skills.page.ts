import { firestore } from 'firebase/app';
import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { UsersService } from '../../services/users.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-add-skills',
  templateUrl: './add-skills.page.html',
  styleUrls: ['./add-skills.page.scss'],
})
export class AddSkillsPage implements OnInit {


  mainuser: AngularFirestoreDocument;


  // tslint:disable-next-line: max-line-length
  constructor(public router: Router, private afs: AngularFirestore, private users: UsersService, private alertCtrl: AlertController, private keyboard: Keyboard) {

  }



  ngOnInit() {
  }

  async presentAlertConfirmLogout() {
    const alert = await this.alertCtrl.create({
      header: 'Logout?',
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

  async presentAlertConfirmAddSkill() {
    const alert = await this.alertCtrl.create({
      header: 'Skill added successfully',
      message: 'Your new skill has has been added',
      buttons: [
        {
          text: 'OK',
          handler: () => {
            this.router.navigate(['/tabs/info']);
            this.refresh();
          }
        }
      ]
    });
    await alert.present();
  }

  async presentAlertBack() {
    const alert = await this.alertCtrl.create({
      header: 'Discard changes?',
      message: 'Any unsaved work will be discarded.',
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
            this.router.navigate(['tabs/info']);
          }
        }
      ]
      // tslint:disable-next-line: semicolon
    });
    await alert.present();
  }


  CreateSkill(skill: NgForm) {
    console.log(skill.value);
    this.users.createSkill(this.users.getUID(), skill.value).subscribe(() => {
      return this.presentAlertConfirmAddSkill().then(() => {
        this.router.navigate(['skills']);
      });
    });
  }

  refresh(): void {
    window.location.reload();
    this.router.navigate(['tabs/info']);
  }
  
}
