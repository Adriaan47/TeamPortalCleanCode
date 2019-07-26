import { Component, OnInit, ViewChild } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Http } from '@angular/http';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { UsersService } from '../../services/users.service';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.page.html',
  styleUrls: ['./edit-profile.page.scss'],
})
export class EditProfilePage implements OnInit {

  constructor(
    private users: UsersService,
    private http: Http,
    private afs: AngularFirestore,
    private router: Router,
    private storage: AngularFireStorage,
    private alertController: AlertController,
    private user: UsersService,
    // tslint:disable-next-line:no-shadowed-variable
    public alertCtrl: AlertController) {

    this.mainuser = afs.doc(`users/${this.users.getUID()}`);
    this.sub = this.mainuser.valueChanges().subscribe(event => {
      this.profilePic = event.profilePic;
      this.email = event.email;
      this.name = event.name;
      this.surname = event.surname;
      this.careerLevel = event.careerLevel;
      this.mobile = event.mobile;
      this.avatar = event.avatar;
      this.nickname = event.nickname;
    });

  }

  mainuser: AngularFirestoreDocument;
  sub;

  email: any;
  name: string;
  surname: string;
  careerLevel: string;
  mobile: string;
  avatar: string;
  nickname: string;

  // tslint:disable-next-line: no-inferrable-types
  busy: boolean = false;

  @ViewChild('image') fileBtn: {
    nativeElement: HTMLInputElement
  };

  username: any;
  profilePic: any;
  uid: any;
  // tslint:disable-next-line:member-ordering
  imgURL: any;
  selectedIMG: File = null;

  ngOnInit() {
  }

  // tslint:disable-next-line: use-life-cycle-interface
  ngOnDestroy() {
    this.sub.unsubscribe();
  }


  async createPost() {

    this.busy = true;
    this.afs.doc(`users/${this.users.getUID()}`).update({
      name: this.name,
      surname: this.surname,
      careerLevel: this.careerLevel,
      email: this.email,
      mobile: this.mobile,
      avatar: this.avatar,
      nickname: this.nickname,
    });

    this.router.navigate(['/profile']);
  }

  async presentAlert(title: string, content: string) {
    const alert = await this.alertController.create({
      header: title,
      message: content,
      buttons: ['OK']
    });

    await alert.present();
  }

  async presentAlertConfirm() {
    // this.router.navigate(['/tabs/profile']);
    // }
    const alert = await this.alertCtrl.create({
      header: 'Update successful',
      message: 'Your profile has been updated',
      buttons: [
        {
          text: 'OK',
          handler: () => {
            this.router.navigate(['/profile']);
            this.refresh();

          }

        }
      ]
      // tslint:disable-next-line: semicolon
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
            this.router.navigate(['/tabs']);
          }
        }
      ]
      // tslint:disable-next-line: semicolon
    });
    await alert.present();
  }


  updateProfilePicture() {
    this.fileBtn.nativeElement.click();
  }

  refresh(): void {
    window.location.reload();
  }
}
