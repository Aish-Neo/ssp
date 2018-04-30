import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './components/home/home.component';

// Auth
import { LoginComponent } from './components/auth/login/login.component';
// Guards
import { ApiGuard } from './guards/api.guard';

// User
import { ProfileComponent } from './components/user/profile/profile.component';
import {ListOfJobsComponent} from "./components/jobs/list-of-jobs/list-of-jobs.component";

const APP_ROUTES: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'jobs', redirectTo: '/jobs/list', pathMatch: 'full' },
  { path: 'home', component: HomeComponent, pathMatch: 'full' },
  { path: 'login', component: LoginComponent, pathMatch: 'full' },
  { path: 'user/update', component: ProfileComponent, canActivate: [ApiGuard], pathMatch: 'full' },
  { path: 'jobs/list', component: ListOfJobsComponent, canActivate: [ApiGuard], pathMatch: 'full' }
];

export const routing = RouterModule.forRoot(APP_ROUTES);
