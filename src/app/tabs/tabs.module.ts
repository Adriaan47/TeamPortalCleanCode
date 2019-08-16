import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ImageCropperModule } from 'ngx-image-cropper';
import { TabsPageRoutingModule } from './tabs.router.module';

import { TabsPage } from './tabs.page';
import { ComponentsComponent } from '../profile/components/components.component';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    TabsPageRoutingModule,
    ImageCropperModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  declarations: [TabsPage, ComponentsComponent,
  ]
})
export class TabsPageModule {}
