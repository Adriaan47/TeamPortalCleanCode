
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
// import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import firebaseConfig from './services/firebase';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { HttpModule } from '@angular/http';
import { AngularFirestoreModule } from '@angular/fire/firestore';
// import { AuthService } from './services/auth.service';
import { ShareModule } from './services/share.module';
import { UsersService } from './services/users.service';
// import { NotifiticationsComponent } from './info/notifitications/notifitications.component';
import { HttpClientModule } from '@angular/common/http';
// import { MemberinfoComponent } from './members/memberinfo/memberinfo.component';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorageModule, StorageBucket } from '@angular/fire/storage';
import { RefreshComponent } from './refresh/refresh.component';




@NgModule({
  declarations: [
    AppComponent,
    //  NotifiticationsComponent,
      // MemberinfoComponent,
      RefreshComponent
    ],
  entryComponents: [
    // NotifiticationsComponent,
    //  MemberinfoComponent
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
    // tslint:disable-next-line: deprecation
    HttpModule,
    ShareModule,
    // ShareModule
  ],
  providers: [
    StatusBar,
    // SplashScreen,
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
