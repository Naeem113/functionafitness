import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app.routing';
import { ComponentsModule } from './components/components.module';
import { AppComponent } from './app.component';
import firebase from "firebase";
firebase.initializeApp(environment.firebase);
import { DashboardComponent } from './dashboard/dashboard.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { LoginComponent } from './login/login.component';
import 'rxjs/add/operator/map';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { MatInputModule } from '@angular/material/input';
import { MatRippleModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSelectModule } from '@angular/material/select';
import { environment } from '../environments/environment';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import { SkillCategoryComponent } from './skill-category/skill-category.component';
import { SkillsComponent } from './skills/skills.component';
import { UpdateSkillComponent } from './skills/update-skill/update-skill.component';
import { AddSkillComponent } from './skills/add-skill/add-skill.component';
import { AddJournalComponent } from './journal/add-journal/add-journal.component';
import { UpdateJournalComponent } from './journal/update-journal/update-journal.component';
import { AddSkillCategoryComponent } from './skill-category/add-skill-category/add-skill-category.component';
import { UpdateSkillCategoryComponent } from './skill-category/update-skill-category/update-skill-category.component';
import { WhatAmIFeelingComponent } from './what-am-i-feeling/what-am-i-feeling.component';
import { AddWhatAmIFeelingComponent } from './what-am-i-feeling/add-what-am-i-feeling/add-what-am-i-feeling.component';
import { DetailWhatAmIFeelingComponent } from './what-am-i-feeling/detail-what-am-i-feeling/detail-what-am-i-feeling.component';
import { UpdateWhatAmIFeelingComponent } from './what-am-i-feeling/update-what-am-i-feeling/update-what-am-i-feeling.component';

@NgModule({
  imports: [
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatTooltipModule,
    MatSelectModule,
    MatRippleModule,
    MatSnackBarModule,
    MatProgressBarModule,
    FormsModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatIconModule,
    MatInputModule,
    ComponentsModule,
    RouterModule,
    AppRoutingModule,

  ],
  declarations: [AppComponent, AdminLayoutComponent, LoginComponent, SkillCategoryComponent, SkillsComponent, UpdateSkillComponent, AddSkillComponent, AddJournalComponent, UpdateJournalComponent, AddSkillCategoryComponent, UpdateSkillCategoryComponent, WhatAmIFeelingComponent, AddWhatAmIFeelingComponent, DetailWhatAmIFeelingComponent, UpdateWhatAmIFeelingComponent],

  bootstrap: [AppComponent],
  providers: [
    
  ],
})
export class AppModule {}
