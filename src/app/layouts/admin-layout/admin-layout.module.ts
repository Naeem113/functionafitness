import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminLayoutRoutes } from '../admin-layout/admin-layout.routing';
import { DashboardComponent } from '../../dashboard/dashboard.component';
import { UserProfileComponent } from '../../user-profile/user-profile.component';
import { EquipmentsComponent } from '../../equipments/equipments.component';
import { QuotesComponent } from '../../quotes/quotes.component';
import { ExercisesComponent } from '../../exercises/exercises.component';
import { PostsComponent } from '../../posts/posts.component';
import { LevelsComponent } from '../../levels/levels.component';
import { BodypartsComponent } from '../../bodyparts/bodyparts.component';
import { GoalsComponent } from '../../goals/goals.component';
import { WorkoutsComponent } from '../../workouts/workouts.component';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { MatInputModule } from '@angular/material/input';
import { MatRippleModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSelectModule } from '@angular/material/select';

import { from } from 'rxjs';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatRippleModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatTooltipModule,
    MatIconModule,
  ],
  declarations: [
    DashboardComponent,
    UserProfileComponent,
    QuotesComponent,
    WorkoutsComponent,
    EquipmentsComponent,
    GoalsComponent,
    LevelsComponent,
    BodypartsComponent,
    PostsComponent,
    ExercisesComponent,
  ],
  providers: [],
})
export class AdminLayoutModule {}
