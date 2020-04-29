import { Routes } from '@angular/router';

import { DashboardComponent } from '../../dashboard/dashboard.component';
import { UserProfileComponent } from '../../user-profile/user-profile.component';
import { LoginComponent } from 'app/login/login.component';
import { EquipmentsComponent } from 'app/equipments/equipments.component';
import { QuotesComponent } from 'app/quotes/quotes.component';
import { ExercisesComponent } from 'app/exercises/exercises.component';
import { PostsComponent } from 'app/posts/posts.component';
import { LevelsComponent } from 'app/levels/levels.component';
import { BodypartsComponent } from 'app/bodyparts/bodyparts.component';
import { GoalsComponent } from 'app/goals/goals.component';
import { WorkoutsComponent } from 'app/workouts/workouts.component';

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
  { path: 'user-profile', component: UserProfileComponent },
  { path: 'equipments', component: EquipmentsComponent },
  { path: 'quotes', component: QuotesComponent },
  { path: 'exercises', component: ExercisesComponent },
  { path: 'posts', component: PostsComponent },
  { path: 'levels', component: LevelsComponent },
  { path: 'bodyparts', component: BodypartsComponent },
  { path: 'workouts', component: WorkoutsComponent },
  { path: 'goals', component: GoalsComponent },
];
