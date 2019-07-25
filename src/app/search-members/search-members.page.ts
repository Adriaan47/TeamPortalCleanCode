import { catchError, map } from 'rxjs/operators';
import { UsersService } from '../services/users.service';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { AlertController, PopoverController } from '@ionic/angular';
import { Users } from '../services/users.interface';
import { DataService } from '../services/data.service';
import { Subject, combineLatest } from 'rxjs';


@Component({
  selector: 'app-search-members',
  templateUrl: './search-members.page.html',
  styleUrls: ['./search-members.page.scss'],
})
export class SearchMembersPage implements OnInit {

  searchTerm: string;
  data: any;

  startAt = new Subject();
  endAt = new Subject();

  users: any[];
  allUsers: any[] = [];

  startobs = this.startAt.asObservable();
  endobs = this.endAt.asObservable();

  constructor(private afs: AngularFirestore, private user: UsersService) {
    this.getAll();
  }

  ngOnInit() {
    this.getData().subscribe((users) => {
      users.forEach((user): any => {
        this.allUsers.push(user);
        return this.allUsers;
      });

    });
    combineLatest(this.startobs, this.endobs).subscribe(value => {
      this.fireQuery(value[0], value[1]).subscribe(users => {
        this.users = users;
        console.log(users);
      });
    }
    );
    console.log(this.allUsers, this.users);
  }

  fireQuery(start, end) {
    return this.afs.collection('users', ref => ref.limit(8).orderBy('name')
      .startAt(start).endAt(end)).valueChanges();
  }
  getAll() {
    this.user.getData().subscribe(data => this.data = data);
  }
  getAllMembers() {
    return this.afs.collection('users').valueChanges();
  }

  getData() {
    return this.afs.collection('users').valueChanges();
  }

  search($event) {
    const q = $event.target.value;
    if (q !== '') {
      this.startAt.next(q);
      this.endAt.next(q + '\uf8ff');
    } else {
      this.users = this.allUsers;
    }
  }

}
