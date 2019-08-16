import { Component, OnInit } from '@angular/core';
import {Title, Meta} from '@angular/platform-browser';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-refresh',
  templateUrl: './refresh.component.html',
  styleUrls: ['./refresh.component.scss'],
})
export class RefreshComponent implements OnInit {

  constructor(private titleSvc: Title, private meta: Meta) {
    titleSvc.setTitle('Team Portal');
    meta.addTag({name: 'viewport', content: 'width=device-width, initial-scale=1, shrink-to-fit=no'}, true);

  }
  ngOnInit() {}

}
