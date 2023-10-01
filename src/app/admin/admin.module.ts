import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProjectsService } from '../projects.service';
import { AboutComponent } from './about/about.component';
import { ProjectComponent } from './project/project.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './login/login.component';

@NgModule({
  declarations: [DashboardComponent, AboutComponent, ProjectComponent, LoginComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule
  ],
  exports: [DashboardComponent, AboutComponent, ProjectComponent, LoginComponent],
  providers: [ProjectsService, DatePipe]
})
export class AdminModule { }
