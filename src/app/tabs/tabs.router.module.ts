import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';
import { ComponentsComponent } from '../profile/components/components.component';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'profile',
        children: [
          {
            path: '',
            loadChildren: '../profile/profile.module#ProfilePageModule'
          },
          {
            path: 'edit-profile',
            loadChildren:
              '../profile/edit-profile/edit-profile.module#EditProfilePageModule'
          },
          { path: 'upload-picture', component: ComponentsComponent },

        ]
      },
      {
        path: 'projects',
        children: [
          {
            path: '',
            loadChildren: '../projects/projects.module#ProjectsPageModule'
          },
        ]
      },
      {
        path: 'skills',
        children: [
          {
            path: '',
            loadChildren: '../skills/skills.module#SkillsPageModule'
          },
          {
            path: 'update-skills/:id',
            loadChildren:
              '../skills/update-skills/update-skills.module#UpdateSkillsPageModule'
          },
          {
            path: 'add-skills',
            loadChildren:
              '../skills/add-skills/add-skills.module#AddSkillsPageModule'
          }
        ]
      },
      {
        path: 'members',
        children: [
          {
            path: '',
            loadChildren:
              '../search-members/search-members.module#SearchMembersPageModule'
          },
          {
            path: 'user-details/:id',
            loadChildren:
              '../search-members/members-info/members-info.module#MembersInfoPageModule'
          }
        ]
      },
      {
        path: '',
        redirectTo: '/tabs/profile',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/profile',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule { }
