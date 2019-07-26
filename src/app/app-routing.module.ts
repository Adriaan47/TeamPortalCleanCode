import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { LoginPage } from './login/login.page';
import { AuthGuard } from './guard/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: 'profile', pathMatch: 'full' },
  { path: 'login', loadChildren: './login/login.module#LoginPageModule' },
  { path: 'profile', loadChildren: './profile/profile.module#ProfilePageModule', canActivate: [AuthGuard] },
  { path: 'edit-profile', loadChildren: './profile/edit-profile/edit-profile.module#EditProfilePageModule', canActivate: [AuthGuard] },
  { path: 'projects', loadChildren: './projects/projects.module#ProjectsPageModule', canActivate: [AuthGuard] },
  { path: 'project-info', loadChildren: './projects/project-info/project-info.module#ProjectInfoPageModule', canActivate: [AuthGuard] },
  { path: 'skills', loadChildren: './skills/skills.module#SkillsPageModule', canActivate: [AuthGuard] },
  { path: 'update-skills', loadChildren: './skills/update-skills/update-skills.module#UpdateSkillsPageModule', canActivate: [AuthGuard] },
  { path: 'add-skills', loadChildren: './skills/add-skills/add-skills.module#AddSkillsPageModule', canActivate: [AuthGuard] },
  { path: 'search-members', loadChildren: './search-members/search-members.module#SearchMembersPageModule', canActivate: [AuthGuard] },
  { path: 'members-info', loadChildren: './search-members/members-info/members-info.module#MembersInfoPageModule',
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
