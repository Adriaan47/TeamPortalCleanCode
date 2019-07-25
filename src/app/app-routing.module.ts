import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: '', loadChildren: './tabs/tabs.module#TabsPageModule' },
  { path: 'login', loadChildren: './login/login.module#LoginPageModule' },
  { path: 'edit-profile', loadChildren: './profile/edit-profile/edit-profile.module#EditProfilePageModule' },
  { path: 'skills', loadChildren: './skills/skills.module#SkillsPageModule' },
  { path: 'search-members', loadChildren: './search-members/search-members.module#SearchMembersPageModule' },
  { path: 'projects', loadChildren: './projects/projects.module#ProjectsPageModule' },
  { path: 'profile', loadChildren: './profile/profile.module#ProfilePageModule' },  { path: 'project-info', loadChildren: './projects/project-info/project-info.module#ProjectInfoPageModule' }



];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
