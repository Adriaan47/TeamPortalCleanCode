import { firestore } from 'firebase/app';
import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { UsersService } from '../../services/users.service';
import { NgForm } from '@angular/forms';
import { Location } from '@angular/common';


@Component({
  selector: 'app-add-skills',
  templateUrl: './add-skills.page.html',
  styleUrls: ['./add-skills.page.scss'],
})
export class AddSkillsPage implements OnInit {


  mainuser: AngularFirestoreDocument;
  userId: any;
  model: any = {};
  // tslint:disable-next-line: max-line-length
  constructor(
    public router: Router,
    private afs: AngularFirestore,
    private users: UsersService,
    private location: Location,
    private alertCtrl: AlertController) {

  }



  ngOnInit() {
    this.userId = this.users.getUID();
<<<<<<< HEAD
=======

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
            this.router.navigate(['tabs/login']);
          }
        }
      ]
      // tslint:disable-next-line: semicolon
    });
    await alert.present();
>>>>>>> 5aa587f100cacf2b8ceaee1313c4788c669993a7
  }



  async presentAlertConfirmAddSkill() {
    const alert = await this.alertCtrl.create({
      header: 'Skill added successfully',
      message: 'Your new skill has has been added',
      buttons: [
        {
          text: 'OK',
<<<<<<< HEAD
          handler: () => {
            this.Nav();

=======
          handler: async () => {
           await this.router.navigate(['tabs/skills']);
           this.refresh();
>>>>>>> 5aa587f100cacf2b8ceaee1313c4788c669993a7
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
<<<<<<< HEAD
            this.Nav();
=======
>>>>>>> 5aa587f100cacf2b8ceaee1313c4788c669993a7
          }
        }
      ]
      // tslint:disable-next-line: semicolon
    });
    await alert.present();
  }


  CreateSkill(skill: NgForm) {
     this.users.createSkill(this.users.getUID(), skill.value).subscribe(async () => {
      await this.presentAlertConfirmAddSkill();
    }, err => {
      return null;
    });

  }
  delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
<<<<<<< HEAD
  refresh(): void {
    window.location.reload();
  }
  Nav() {
    this.router.navigate(['tabs/skills']);
    this.ngOnInit();
     }
=======

  refresh() {
    window.location.reload();
    this.router.navigate(['tabs/skills']);
  }

>>>>>>> 5aa587f100cacf2b8ceaee1313c4788c669993a7
}
