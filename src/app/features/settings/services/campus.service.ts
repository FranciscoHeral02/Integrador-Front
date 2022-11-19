import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Campus } from './../interfaces/campus';

@Injectable()
export class CampusService {

  public urlBase: string = 'http://localhost:8090/people-ws/campus';

  constructor(private http: HttpClient) { }

  public saveCampus(data:any){
    return this.http.post(this.urlBase,data);
  }

  public updateCampus(data:any){
    return this.http.post(this.urlBase,data);
  }

  public getAllCampus(){
      return this.http.get(this.urlBase+'/getAll');
  }

  public getCampus(idCampus:String){
     return this.http.get<Campus>(this.urlBase+"/"+idCampus);
  }

  public deleteCampus(idCampus:String){
    return this.http.delete(this.urlBase+"/"+idCampus);
 }
}
