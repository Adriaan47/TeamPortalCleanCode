import { Component, OnInit, ViewChild } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Http } from '@angular/http';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { UsersService } from '../../services/users.service';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';
import { NgForm, NgControl } from '@angular/forms';
import { UserPublic } from '../../services/user.public.interface';

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



  }

  mainuser: AngularFirestoreDocument;
  sub;
  profilePic: any;
  userID: any;
  avatar: any;



  // tslint:disable-next-line: no-inferrable-types
  busy: boolean = false;

  @ViewChild('image') fileBtn: {
    nativeElement: HTMLInputElement
  };
  Public: UserPublic;
  username: any;

  uid: any;
  // tslint:disable-next-line:member-ordering
  imgURL: any;
  selectedIMG: File = null;
  formValue: any = {
    name: '',
    surname: '',
    careerLevel: '',
    phoneNumber: '',
    email: '',
    nickname: '',
    birthDay: '',
    eid: '',
  };

  ngOnInit() {
    this.userID = this.users.getUID();
    this.users.getDatas(this.userID).subscribe(user => {
      this.Public = user;
      this.setForm();
    });
    this.users.getProfilePicture(this.userID).subscribe(avatar => {
      this.avatar = avatar.avatar;
    });

  }

  // // tslint:disable-next-line: use-life-cycle-interface
  // ngOnDestroy() {
  //   this.sub.unsubscribe();
  // }
  setForm() {
    this.formValue = {
      name: this.Public.name,
      surname: this.Public.surname,
      careerLevel: this.Public.careerLevel,
      phoneNumber: this.Public.phoneNumber,
      email: this.Public.email,
      nickname: this.Public.nickname,
      birthDate: this.Public.birthDate,
      eid: this.Public.eid,
    };
  }

  updateDetails(details: NgForm) {
    this.users.updatePublic(this.userID, details.value).subscribe(() => {
      this.presentAlertConfirm();
    }, error => {
      this.presentAlert('Error occured', error.message);
    });
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
            this.router.navigate(['tabs/profile']);
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
            this.router.navigate(['tabs/profile']);
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

}

