import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Project } from './project';

@Injectable({
  providedIn: 'root',
})
export class ProjectsService {
  constructor(private httpClient: HttpClient) {}

  // setHeaderwithToken(): HttpHeaders {
  //   var token = localStorage.getItem("token");
  //   var headers = new HttpHeaders();
  //   headers = headers.set("Authorization", "Bearer ");
  //   if (token !== null) {
  //     // const currentUserObj = JSON.parse(currentUser) as { token: string };
  //     headers = headers.set("Authorization", "Bearer " + JSON.parse(token));
  //   }
  //   return headers;
  // }
  getAllProject(): Observable<Project[]> {
    // var headers = this.setHeaderwithToken();

    return this.httpClient.get<Project[]>('http://localhost:5140/api/projects', 
                                          {responseType: 'json'})
    .pipe(map((data: Project[])=> {
      data.forEach(da=> da.teamMember *= 10)
      return data;
    }));
  }

  insertProject(newProject: Project): Observable<Project> {
    return this.httpClient.post<Project>('http://localhost:5140/api/projects',
                                           newProject,  {responseType: 'json'});
  }

  updateProject(editProject: Project):Observable<Project>{
    // var headers = this.setHeaderwithToken();
    return this.httpClient.put<Project>('http://localhost:5140/api/projects', 
                                        editProject,  { responseType: 'json'})
  }

  deleteProject(ProjectId: number): Observable<string>{
    return this.httpClient.delete<string>('http://localhost:5140/api/projects?ProjectId='+ 
                                            ProjectId)
  }

  searchProject(searchBy: string, searchText: string): Observable<Project[]>{
    // var headers = this.setHeaderwithToken();
    return this.httpClient.get<Project[]>('http://localhost:5140/api/projects/search/' + 
                          searchBy + '/' + searchText, { responseType: 'json'})
  }

  regenerateToken(): Observable<any>{
    var token = localStorage.getItem("token")
    var refreshToken = localStorage.getItem("refreshToken")?.toString();

    if(token != null && refreshToken != null){
      token = JSON.parse(token);
      refreshToken = JSON.parse(refreshToken);
    }
    console.log(token)
    console.log(refreshToken)

    return this.httpClient.post<any>('http://localhost:5140/generate-new-jwt-token', {token: token, refreshToken: refreshToken},{responseType: 'json'} )
  }
}
