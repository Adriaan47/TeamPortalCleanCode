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
  skills;
  sub;
  sk: Skills;
  skillID: string;
  postReference: AngularFirestoreDocument;
  res: any;
  id: string;


  constructor(
    private popoverController: PopoverController,
    private http: Http,
    public router: Router,
    private afs: AngularFirestore,
    private users: UsersService,
    private route: ActivatedRoute,
    private alertCtrl: AlertController,
  ) {
    this.getSkills();
  }


  async DismissClick() {
    await this.popoverController.dismiss();
  }

  ngOnInit() {
    this.id = this.users.getUID();
    console.log(this.id);
  }

  getSkills() {
    this.users.getSkillID(this.users.getUID(), 'html').subscribe(skills => this.skills = skills);
  }

  go() {
    this.router.navigate(['/tabs/profile']);
  }

  getUserSkill(uid: string, id) {
    this.users.getCurrentUserSkill(this.users.getUID(), id);

  }

}
