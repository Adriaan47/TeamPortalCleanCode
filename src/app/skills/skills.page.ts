import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, PopoverController } from '@ionic/angular';
import { Skills } from '../services/skills';
import { UsersService } from '../services/users.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-skills',
  templateUrl: './skills.page.html',
  styleUrls: ['./skills.page.scss'],

})
export class SkillsPage implements OnInit {
  res: any;
  skills: any;
  Skills: Skills[];
  skillID: Skills;
  uid: string;
  id: any;

  constructor(
    public router: Router,
    private users: UsersService,
    private alertCtrl: AlertController,
    private location: Location,
    public popoverController: PopoverController,
  ) {
    this.ngOnInit();
  }

  ngOnInit() {
    this.uid = this.users.getUID();
    this.users.getSkills(this.uid).subscribe((res) => {
      this.skills = res;
    });
  }


  async presentAlertConfirm() {
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
            this.refresh();
          }
        }
      ]
      // tslint:disable-next-line: semicolon
    });
    await alert.present();
  }

  async presentAlertConfirmDelete(id: string) {
    const alert = await this.alertCtrl.create({
      header: `Delete Skill?`,
      message: 'Are you sure you want to delete this skill?',
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
            this.users.deleteSkill(this.users.getUID(), id).subscribe(async () => {
              this.ngOnInit();
            }, err => {
              this.ngOnInit();
              return null;
            });
          }
        }
      ]
      // tslint:disable-next-line: semicolon
    });
    await alert.present();
  }

  async DismissClick() {
    await this.popoverController.dismiss();
  }

  deleteSkill(id: string) {
    this.users.deleteSkill(this.users.getUID(), id);
  }

  refresh() {
    window.location.reload();
    this.router.navigate(['/login']);
  }
}
