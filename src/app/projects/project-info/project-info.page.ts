import { Component, OnInit, Input } from '@angular/core';
import { ToastController } from '@ionic/angular';


@Component({
  selector: 'app-project-info',
  templateUrl: './project-info.page.html',
  styleUrls: ['./project-info.page.scss'],
})
export class ProjectInfoPage implements OnInit {

  // tslint:disable-next-line:no-input-rename
  @Input('project') project: any;

  constructor(private toastCrtl: ToastController) { }

  ngOnInit() {
  }

}
