import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';
import { ComponentsComponent } from '../profile/components/components.component';
<<<<<<< HEAD
import { AuthGuard } from '../guard/auth.guard';
=======
>>>>>>> 5aa587f100cacf2b8ceaee1313c4788c669993a7

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
<<<<<<< HEAD
          { path: 'upload-picture', loadChildren: '../profile/components/components.module#ComponentsModule' },
=======
          { path: 'upload-picture', component: ComponentsComponent },
>>>>>>> 5aa587f100cacf2b8ceaee1313c4788c669993a7

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
<<<<<<< HEAD
    ], canActivate: [AuthGuard]
  },
  {
    path: '',
    redirectTo: '/tabs/profile',
    pathMatch: 'full'
=======
    ]
>>>>>>> 5aa587f100cacf2b8ceaee1313c4788c669993a7
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule { }
