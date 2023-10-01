import { DatePipe } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Project } from 'src/app/project';
import { ProjectsService } from 'src/app/projects.service';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css'],
})

export class ProjectComponent implements OnInit {
  public projects: Project[] = [];
  public searchBy: string = '';
  public searchText: string = '';

  @ViewChild("newForm") newForm!:NgForm;

  constructor(private productsService: ProjectsService, private datePipe: DatePipe) {}

  ngOnInit() {
    this.productsService.getAllProject().subscribe({

      next: (response: Project[]) => {
        this.projects = response;
        this.projects.forEach(project => {
          project.dateOfStart = this.datePipe.transform(project.dateOfStart, 'yyyy-MM-dd');
        })
      },
      error: () => {}
   
  });
  }
  
  onNewClick(event: any){
    this.newForm.resetForm();
  }

  public newProject: Project = new Project();

  addProject(event: any) {

    if(this.newForm.valid){

      event.preventDefault();
      this.productsService.insertProject(this.newProject).subscribe({
        next: (response: Project) => {
          this.newProject = response;
          this.newProject.dateOfStart = this.datePipe.transform(this.newProject.dateOfStart, 'yyyy-MM-dd');

          this.projects.push(this.newProject);

          this.formClear();
        },

        error: (error) => console.log(error),
        complete: () => console.info('complete'),
      });
      
    }
  }

  formClear(){
    this.newProject = {
      id: null,
      name: null,
      dateOfStart: null,
      teamMember: null,
    };
  }
  
  public editProject: Project = new Project();
  public editIndex: any;

  editHandler(index: number){
    this.editIndex = index

    this.editProject.id = this.projects[index].id
    this.editProject.name = this.projects[index].name
    this.editProject.dateOfStart = this.projects[index].dateOfStart
    this.editProject.teamMember = this.projects[index].teamMember
    this.newProject = this.editProject;
  }

  updateProject(){
    this.productsService.updateProject(this.editProject).subscribe({
      next: (response) => {
        var p:Project = new Project();
        p.id = response.id
        p.name = response.name
        p.dateOfStart = this.datePipe.transform(response.dateOfStart, 'yyyy-MM-dd');
        p.teamMember = response.teamMember

        this.projects[this.editIndex] = p;

        this.formClear();
      },
      error: ()=>{}
    })
  }

  deleteProject(index: number){
    var productId = this.projects[index].id;
    this.productsService.deleteProject(productId).subscribe({
      next: (response: string) => {
        this.projects = this.projects.filter(project => project.id !== parseInt(response))        
      },
      error: () => {}
    })
  }

  onSearchClick(){
    console.log(this.searchBy, this.searchText)
    this.productsService.searchProject(this.searchBy, this.searchText).subscribe({
      next: (response: Project[]) => {
        this.projects = response
      },
      error: (error) => {console.log(error)}
    })
  }

  regenrateToken(){
    this.productsService.regenerateToken().subscribe({
      next:(response)=>{
        localStorage.setItem("token", JSON.stringify(response.token));
        localStorage.setItem("refreshToken", JSON.stringify(response.refreshToken));
        console.log(response)
      }
    })
  }
}
