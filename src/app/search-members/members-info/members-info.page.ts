
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
    this.getdp();
  }

  ngOnInit() {
    this.userID = this.route.snapshot.paramMap.get('id');
    console.log(this.userID);

    this.users.getDatas(this.userID).subscribe(res => {
      this.res = res;
      console.log(this.res);
    });
  }

  getdp() {
    this.userID = this.route.snapshot.paramMap.get('id');
    console.log(this.userID);

    this.users.getProfilePicture(this.userID).subscribe(dp => {
      this.dp = dp;
      console.log(this.dp);
    });
  }

  back() {
    this.rout.navigate(['tabs/members']);
  }


}
