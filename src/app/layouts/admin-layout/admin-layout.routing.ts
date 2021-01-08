import { Routes } from '@angular/router';
import { AddJournalComponent } from 'app/journal/add-journal/add-journal.component';
import { UpdateJournalComponent } from 'app/journal/update-journal/update-journal.component';
import { AddSkillCategoryComponent } from 'app/skill-category/add-skill-category/add-skill-category.component';
import { SkillCategoryComponent } from 'app/skill-category/skill-category.component';
import { UpdateSkillCategoryComponent } from 'app/skill-category/update-skill-category/update-skill-category.component';
import { AddSkillComponent } from 'app/skills/add-skill/add-skill.component';
import { SkillsComponent } from 'app/skills/skills.component';
import { UpdateSkillComponent } from 'app/skills/update-skill/update-skill.component';
import { AddWhatAmIFeelingComponent } from 'app/what-am-i-feeling/add-what-am-i-feeling/add-what-am-i-feeling.component';
import { DetailWhatAmIFeelingComponent } from 'app/what-am-i-feeling/detail-what-am-i-feeling/detail-what-am-i-feeling.component';
import { UpdateWhatAmIFeelingComponent } from 'app/what-am-i-feeling/update-what-am-i-feeling/update-what-am-i-feeling.component';
import { WhatAmIFeelingComponent } from 'app/what-am-i-feeling/what-am-i-feeling.component';

import { DashboardComponent } from '../../dashboard/dashboard.component';
import { JournalComponent } from '../../journal/journal.component';
import {LoginComponent} from '../../login/login.component'
export const AdminLayoutRoutes: Routes = [
  // {
  //   path: '',
  //   children: [ {
  //     path: 'dashboard',
  //     component: DashboardComponent
  // }]}, {
  // path: '',
  // children: [ {
  //   path: 'userprofile',
  //   component: UserProfileComponent
  // }]
  // }, {
  //   path: '',
  //   children: [ {
  //     path: 'icons',
  //     component: IconsComponent
  //     }]
  // }, {
  //     path: '',
  //     children: [ {
  //         path: 'notifications',
  //         component: NotificationsComponent
  //     }]
  // }, {
  //     path: '',
  //     children: [ {
  //         path: 'maps',
  //         component: MapsComponent
  //     }]
  // }, {
  //     path: '',
  //     children: [ {
  //         path: 'typography',
  //         component: TypographyComponent
  //     }]
  // }, {
  //     path: '',
  //     children: [ {
  //         path: 'upgrade',
  //         component: UpgradeComponent
  //     }]
  // }
  { path: '', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'what-am-i-feeling', children: [ {
            path: '',
            component: WhatAmIFeelingComponent
        },{
          path: 'update/:key',
          component: UpdateWhatAmIFeelingComponent
      },{
        path: 'add',
        component: AddWhatAmIFeelingComponent
    },
    {
      path: 'detail/:key',
      component: DetailWhatAmIFeelingComponent
  },
    
    ] },
  { path: 'skill-categories', children: [ {
            path: '',
            component: SkillCategoryComponent
        },{
          path: 'update/:key',
          component: UpdateSkillCategoryComponent
      },{
        path: 'add',
        component: AddSkillCategoryComponent
    },
    
    ] },
  { path: 'skills', children: [ {
            path: '',
            component: SkillsComponent
        },{
          path: 'update/:key',
          component: UpdateSkillComponent
      },{
        path: 'add',
        component: AddSkillComponent
    },
    
    ] },

    { path: 'journals', children: [ {
            path: '',
            component: JournalComponent
        },{
          path: 'update/:key',
          component: UpdateJournalComponent
      },{
        path: 'add',
        component: AddJournalComponent
    },
    
    ] },




];
