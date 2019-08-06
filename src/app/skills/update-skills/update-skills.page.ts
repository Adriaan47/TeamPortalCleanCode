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
  // tslint:disable-next-line:no-inferrable-types
  busy: boolean = false;

  level;
  lastUsed;
  activeExperience;
  active;
  id;
  skillID: string;
  res: any;
  skills: any;
  origin;
  name: any;


  constructor(
    private users: UsersService,
    private http: Http,
    private route: ActivatedRoute,
    private afs: AngularFirestore,
    private router: Router,
    private alertController: AlertController,
    private user: UsersService,
    public alertCtrl: AlertController
  ) { }
  skill: any;
  ngOnInit() {
    this.skillID = this.route.snapshot.paramMap.get('id');
    this.mainuser = this.afs.doc(`users/${this.users.getUID()}/skills/${this.skillID}`);
    this.sub = this.mainuser.valueChanges().subscribe(event => {
      this.name = event.name;
      this.level = event.level;
      this.active = event.active;
      this.lastUsed = event.lastUsed;
      this.activeExperience = event.activeExperience;
      this.origin = event.origin;
    });
  }

  async UpdateSkills() {
    this.skillID = this.route.snapshot.paramMap.get('id');
    this.busy = true;
    this.afs.doc(`users/${this.users.getUID()}/skills/${this.skillID}`).update({
      name: this.name,
      level: this.level,
      lastUsed: this.lastUsed,
      activeExperience: this.activeExperience,
      active: this.active,
      origin: this.origin,
    });

    this.presentAlertUpdateSkill();
  }

  deleteSkill(id: string) {
    this.users.deleteSkill(this.users.getUID(), id).subscribe((res) => {
      this.res = res;
      console.log(res);

    });
  }
  getSkills() {
    this.users.getSkills(this.users.getUID()).subscribe(skills => this.skills = skills);
  }

  deleteDoc() {
    this.skillID = this.route.snapshot.paramMap.get('id');
    this.afs.doc(`users/${this.users.getUID()}/skills/${this.skillID}`).delete();
  }
  doRefresh(event) {
    console.log('Begin async operation');

    setTimeout(() => {
      console.log('Async operation has ended');
      event.target.complete();
    }, 2000);
  }

  async presentAlertUpdateSkill() {
    //   this.router.navigate(['/tabs/profile']);
    // }
    const alert = await this.alertCtrl.create({
      header: 'Update successful',
      message: 'Your skill has been updated',
      buttons: [
        {
          text: 'OK',
          handler: () => {
            this.router.navigate(['/tabs/skills']);

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
}



