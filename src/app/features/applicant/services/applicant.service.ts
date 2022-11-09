import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class ApplicantService {

  public urlBase: string = 'http://localhost:8090/people-ws/applicant';

  constructor(private http: HttpClient) { }

  public saveApplicant(data:any){
     return this.http.post(this.urlBase,data);
  }

  public updateApplicant(data:any){
    return this.http.put(this.urlBase,data);
  }

  public getAllApplicants(){
      return this.http.get(this.urlBase+'/getAll');
  }

  public getApplicant(idApplicant:String){
     return this.http.get(this.urlBase+"/"+idApplicant);
  }

  public deleteApplicant(idApplicant:String){
    return this.http.delete(this.urlBase+"/"+idApplicant);
 }
}
