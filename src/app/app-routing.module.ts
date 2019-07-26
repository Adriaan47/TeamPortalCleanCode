import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guard/auth.guard';

const routes: Routes = [
  { path: 'login', loadChildren: './login/login.module#LoginPageModule' },
  { path: '', loadChildren: './tabs/tabs.module#TabsPageModule', canActivate: [AuthGuard] },
  { path: 'edit-profile', loadChildren: './profile/edit-profile/edit-profile.module#EditProfilePageModule', canActivate: [AuthGuard] },
  { path: 'project-info', loadChildren: './projects/project-info/project-info.module#ProjectInfoPageModule', canActivate: [AuthGuard] },
  { path: 'update-skills', loadChildren: './skills/update-skills/update-skills.module#UpdateSkillsPageModule', canActivate: [AuthGuard] },
  { path: 'add-skills', loadChildren: './skills/add-skills/add-skills.module#AddSkillsPageModule', canActivate: [AuthGuard] },
  { path: 'user-details/:id', loadChildren: './search-members/members-info/members-info.module#MembersInfoPageModule',
   canActivate: [AuthGuard]},
  { path: '**', loadChildren: './login/login.module#LoginPageModule' }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
