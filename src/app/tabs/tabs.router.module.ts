import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

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
          }
        ]
      },
      {
        path: 'projects',
        children: [
          {
            path: '',
            loadChildren: '../projects/projects.module#ProjectsPageModule'
          }
        ]
      },
      {
        path: 'skills',
        children: [
          {
            path: '',
            loadChildren: '../skills/skills.module#SkillsPageModule'
          }
        ]
      },
      {
        path: 'search-members',
        children: [
          {
            path: '',
            loadChildren: '../search-members/search-members.module#SearchMembersPageModule'
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
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class TabsPageRoutingModule { }
