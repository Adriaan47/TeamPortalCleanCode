import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'Profile',
        children: [
          {
            path: '',
            loadChildren: '../Pages/Profile/profile.module#ProfileModule'
          }
        ]
      },
      {
        path: 'Projects',
        children: [
          {
            path: '',
            loadChildren: '../Pages/Projects/projects.module#ProjectsModule'
          }
        ]
      },
      {
        path: 'Skills',
        children: [
          {
            path: '',
            loadChildren: '../Pages/Skills/skills.module#SkillsPageModule'
          }
        ]
      },
      {
        path: 'SearchMembers',
        children: [
          {
            path: '',
            loadChildren: '../Pages/SearchMembers/searchMembers.module#SearchMembersModule'
          }
        ]
      },
      {
        path: '',
        redirectTo: '/tabs/Profile',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/Profile',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class TabsPageRoutingModule {}
