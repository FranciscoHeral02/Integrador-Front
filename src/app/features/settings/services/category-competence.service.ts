import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CategoryCompetence } from './../interfaces/category-competence';

@Injectable()
export class CategoryCompetenceService {

  public urlBase: string = 'http://localhost:8090/people-ws/category-competence';

  constructor(private http: HttpClient) { }

  public saveCategoryCompetence(data:any){
    return this.http.post(this.urlBase,data);
  }

  public updateCategoryCompetence(data:any){
    return this.http.post(this.urlBase,data);
  }

  public getAllCategoryCompetences(){
      return this.http.get(this.urlBase+'/getAll');
  }

  public getCategoryCompetence(idCategory:string,idCompetence:string){
     return this.http.get<CategoryCompetence>(this.urlBase+"/"+idCategory+"/"+idCompetence);
  }

  public deleteCategoryCompetence(idCategory:string,idCompetence:string){
    return this.http.delete(this.urlBase+"/"+idCategory+"/"+idCompetence);
 }
}
