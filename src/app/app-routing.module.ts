import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guard/auth.guard';
import { ComponentsComponent } from './profile/components/components.component';


const routes: Routes = [
  { path: 'login', loadChildren: './login/login.module#LoginPageModule' },
  { path: '', loadChildren: './tabs/tabs.module#TabsPageModule', canActivate: [AuthGuard] },
  { path: 'upload-picture', component: ComponentsComponent },
  { path: '**', loadChildren: './login/login.module#LoginPageModule' },

];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
