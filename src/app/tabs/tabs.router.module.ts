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
            loadChildren: '../Profile/tab1.module#Tab1PageModule'
          }
        ]
      },
      {
        path: 'Projects',
        children: [
          {
            path: '',
            loadChildren: '../Projects/tab2.module#Tab2PageModule'
          }
        ]
      },
      {
        path: 'Skills',
        children: [
          {
            path: '',
            loadChildren: '../Skills/tab3.module#Tab3PageModule'
          }
        ]
      },
      {
        path: 'SearchMembers',
        children: [
          {
            path: '',
            loadChildren: '../SearchMembers/tab4.module#Tab4PageModule'
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
export class TabsPageRoutingModule { }
