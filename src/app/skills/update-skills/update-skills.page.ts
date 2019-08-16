import { Skills } from '../../services/skills';
import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { FormGroup, NgForm } from '@angular/forms';
import { Http } from '@angular/http';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, PopoverController } from '@ionic/angular';
import { UsersService } from '../../services/users.service';


@Component({
  selector: 'app-update-skills',
  templateUrl: './update-skills.page.html',
  styleUrls: ['./update-skills.page.scss'],
})
export class UpdateSkillsPage implements OnInit {

  mainuser: AngularFirestoreDocument;
  sub;
  skillID: string;
  res: any;


  constructor(
    private users: UsersService,
    private route: ActivatedRoute,
    private afs: AngularFirestore,
    private router: Router,
    private alertController: AlertController,
    private user: UsersService,
    public alertCtrl: AlertController
  ) { }
  skill: any;
  uid: any;
  ngOnInit() {
    this.uid = this.users.getUID();
    this.skillID = this.route.snapshot.paramMap.get('id');
    this.users.getCurrentUserSkill(this.uid, this.skillID).subscribe(skill => {
      this.sub = skill;
    });
  }

  async UpdateSkills(form: NgForm) {
  await this.users.updateSkill(this.uid, this.skillID, form.value).subscribe(() => {
    return null;
  }, () => {
    this.presentAlertUpdateSkill();
    return null;
  });
  }



  doRefresh(event) {
    console.log('Begin async operation');

    setTimeout(() => {
      console.log('Async operation has ended');
      event.target.complete();
    }, 2000);
  }

  async presentAlertUpdateSkill() {
    const alert = await this.alertCtrl.create({
      header: 'Update successful',
      message: 'Your skill has been updated',
      buttons: [
        {
          text: 'OK',
          handler: () => {
            this.router.navigate(['/tabs/skills']).then(() => {
              this.ngOnInit();
              this.refresh();
            });
          }
        }
      ]
      // tslint:disable-next-line: semicolon
    });
    await alert.present();
  }
  async presentAlertDiscard() {
    const alert = await this.alertCtrl.create({
      header: 'Discard changes?',
      message: 'Are you sure you want to discard changes?',
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: ?');
          }
        }, {
          text: 'Yes',
          handler: () => {
            this.router.navigate(['/tabs/skills']);
          }
        }
      ]
      // tslint:disable-next-line: semicolon
    });
    await alert.present();
  }
  refresh() {
    window.location.reload();
    this.router.navigate(['tabs/skills']);
  }
}



