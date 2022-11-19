import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Competence } from './../interfaces/competence';

@Injectable()
export class CompetenceService {

  public urlBase: string = 'http://localhost:8090/people-ws/competence';

  constructor(private http: HttpClient) { }

  public saveCompetence(data:any){
    return this.http.post(this.urlBase,data);
  }

  public updateCompetence(data:any){
    return this.http.post(this.urlBase,data);
  }

  public getAllCompetences(){
      return this.http.get(this.urlBase+'/getAll');
  }

  public getCompetence(idCompetence:String){
     return this.http.get<Competence>(this.urlBase+"/"+idCompetence);
  }

  public deleteCompetence(idCompetence:String){
    return this.http.delete(this.urlBase+"/"+idCompetence);
 }
}
