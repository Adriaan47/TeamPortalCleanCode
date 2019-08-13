
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import firebaseConfig from './services/firebase';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';
// import { AuthService } from './services/auth.service';
import { ShareModule } from './services/share.module';
import { UsersService } from './services/users.service';
import { HttpClientModule } from '@angular/common/http';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorageModule, StorageBucket } from '@angular/fire/storage';
// import { RefreshComponent } from './refresh/refresh.component';

import { MaterialsModule } from './materials/materials.module';
import { SearchMembersPageModule } from './search-members/search-members.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';



@NgModule({
  declarations: [
    AppComponent,
    ],
  entryComponents: [
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireAuthModule,
    AngularFirestoreModule,
    AngularFireStorageModule,
    HttpClientModule,
    ShareModule,
    MaterialsModule,
    SearchMembersPageModule,
    BrowserAnimationsModule,
    // ShareModule
  ],
  providers: [
    StatusBar,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    UsersService,
    // AuthService,
    AngularFirestore,
    UsersService,
    { provide: StorageBucket, useValue: 'demoproject-8b1fa.appspot.com' }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
