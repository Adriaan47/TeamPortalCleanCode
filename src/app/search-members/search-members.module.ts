import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { SearchMembersPage } from './search-members.page';
import { MaterialsModule } from '../materials/materials.module';

const routes: Routes = [
  {
    path: '',
    component: SearchMembersPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    MaterialsModule,
  ],
  declarations: [SearchMembersPage]
})
export class SearchMembersPageModule {}
