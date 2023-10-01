import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { AboutComponent } from './admin/about/about.component';
import { ProjectComponent } from './admin/project/project.component';
import { LoginComponent } from './admin/login/login.component';
import { CanActivateGuardService } from './can-activate-guard.service';

const routes: Routes = [
  {path: "", redirectTo: "login", pathMatch: "full"},
  {path: 'login', component: LoginComponent},
  {path: 'dashboard', component: DashboardComponent, canActivate: [CanActivateGuardService]},
  {path: 'about', component: AboutComponent},
  {path: 'project', component: ProjectComponent,  canActivate: [CanActivateGuardService]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
