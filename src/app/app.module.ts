import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app.routing';
import { ComponentsModule } from './components/components.module';
import { AppComponent } from './app.component';

import { DashboardComponent } from './dashboard/dashboard.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { LoginComponent } from './login/login.component';
import 'rxjs/add/operator/map';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { MatInputModule } from '@angular/material/input';
import { MatRippleModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSelectModule } from '@angular/material/select';
import { AngularFireModule, FirebaseOptionsToken } from 'angularfire2';
import { environment } from '../environments/environment';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { LayoutService } from './dataService.service';

@NgModule({
  imports: [
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatTooltipModule,
    MatSelectModule,
    MatRippleModule,
    FormsModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatIconModule,
    MatInputModule,
    HttpModule,
    ComponentsModule,
    RouterModule,
    AppRoutingModule,
    AngularFireAuthModule,
    AngularFirestoreModule,
    AngularFireModule.initializeApp(environment.firebase),
  ],
  declarations: [AppComponent, AdminLayoutComponent, LoginComponent],

  bootstrap: [AppComponent],
  providers: [
    LayoutService,
    { provide: FirebaseOptionsToken, useValue: environment.firebase },
  ],
})
export class AppModule {}
