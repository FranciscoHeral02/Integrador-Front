import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Applicant } from '../interfaces/applicant';

@Injectable()
export class ApplicantService {

  public urlBase: string = 'http://localhost:8090/people-ws/applicant';

  constructor(private http: HttpClient) { }

  public saveApplicant(data:any,file:any){

    const formData = new FormData;
    formData.append('data',new Blob([JSON.stringify(data)],{
      type: "application/json"
    }));
    formData.append('file',file)

    return this.http.post(this.urlBase,formData);

  }

  public updateApplicant(data:any,file:any){
    const formData = new FormData;
    formData.append('data',new Blob([JSON.stringify(data)],{
      type: "application/json"
    }));
    formData.append('file',file)

    return this.http.put(this.urlBase,formData);
  }

  public getAllApplicants(){
      return this.http.get(this.urlBase+'/getAll');
  }

  public getApplicant(idApplicant:String){
     return this.http.get<Applicant>(this.urlBase+"/"+idApplicant);
  }

  public deleteApplicant(idApplicant:String){
    return this.http.delete(this.urlBase+"/"+idApplicant);
 }
}
