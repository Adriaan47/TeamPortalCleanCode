import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import { AngularFireStorage } from '@angular/fire/storage';
import { AngularFirestore } from '@angular/fire/firestore';
import { finalize } from 'rxjs/operators';
import { FormGroup, FormControl } from '@angular/forms';
import { Location } from '@angular/common';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-components',
  templateUrl: './components.component.html',
  styleUrls: ['./components.component.scss'],
})
export class ComponentsComponent implements OnInit {
  form: FormGroup = new FormGroup({
    image: new FormControl(),
  });

  imageChangedEvent: any = '';
  croppedImage: any = '';
  uid: string;
  imgURL: any;
  selectedIMG: File = null;

  constructor(
    public memberSVC: UsersService,
    private router: Router,
    private storage: AngularFireStorage,
    private afs: AngularFirestore,
    private location: Location, ) { }

  ngOnInit() {
    this.uid = this.memberSVC.getUID();
    // get profile picture
    this.memberSVC.getProfilePicture(this.uid).subscribe(pictures => {
      return this.croppedImage = pictures.profilePicture;
    });
  }

  fileChangeEvent(event: any): void {
    this.imageChangedEvent = event;
  }
  imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = event.base64;
    const fileBeforeCrop = this.imageChangedEvent.target.files[0];
    this.selectedIMG = new File([event.file], fileBeforeCrop.name,
      { type: fileBeforeCrop.type });
  }

  uploadImg() {
    const filePath = `profile/${this.uid}/${this.selectedIMG.name}`;
    const fileRef = this.storage.ref(filePath);
    this.storage.upload(filePath, this.selectedIMG).snapshotChanges().pipe(
      finalize(() => fileRef.getDownloadURL().subscribe((url) => {
        this.imgURL = url;
        const imgage: string = this.imgURL;
        this.afs.collection(`users`)
          .doc(this.uid)
          .update({
            profilePicture: imgage,
          }).then(() => {
            this.router.navigate(['/tabs/profile/edit-profile']);
            this.refresh();
          }).catch(err => {
            return err.message;
          });
      })
      )
    ).subscribe();
  }
  delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  async refresh() {
    this.router.navigate(['/tabs/profile/edit-profile']);
    console.log('before delay')

    await this.delay(500);

    // Do something after
    console.log('after delay');
    window.location.reload();
  }


}
