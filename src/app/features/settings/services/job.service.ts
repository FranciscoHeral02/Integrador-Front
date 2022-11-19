import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Job } from './../interfaces/job';

@Injectable()
export class JobService {

  public urlBase: string = 'http://localhost:8090/people-ws/job';

  constructor(private http: HttpClient) { }

  public saveJob(data:any){
    return this.http.post(this.urlBase,data);
  }

  public updateJob(data:any){
    return this.http.post(this.urlBase,data);
  }

  public getAllJobs(){
      return this.http.get(this.urlBase+'/getAll');
  }

  public getJob(idJob:String){
     return this.http.get<Job>(this.urlBase+"/"+idJob);
  }

  public deleteJob(idJob:String){
    return this.http.delete(this.urlBase+"/"+idJob);
 }
}
