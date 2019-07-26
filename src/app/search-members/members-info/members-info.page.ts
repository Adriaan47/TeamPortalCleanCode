
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UsersService } from '../../services/users.service';
import { AngularFirestoreDocument } from '@angular/fire/firestore';
import { Router } from '@angular/router';

@Component({
  selector: 'app-members-info',
  templateUrl: './members-info.page.html',
  styleUrls: ['./members-info.page.scss'],
})
export class MembersInfoPage implements OnInit {

  userID: any;
  mainuser: AngularFirestoreDocument;
  sub;
  user: any;
  alertCtrl: any;
  router: any;
  res: any;
  dp: any;

  constructor(
    private route: ActivatedRoute, private users: UsersService, private rout: Router
  ) {
  }

  ngOnInit() {
    this.userID = this.route.snapshot.paramMap.get('id');

    this.users.getDatas(this.userID).subscribe(user => {
      this.res = user;
    });
    this.users.getProfilePicture(this.userID).subscribe(userAv => {
      this.dp = userAv.avatar;
      console.log(this.dp);
    });
  }


  back() {
    this.rout.navigate(['tabs/members']);
  }


}
