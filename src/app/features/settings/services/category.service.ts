import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Category } from './../interfaces/category';

@Injectable()
export class CategoryService {

  public urlBase: string = 'http://localhost:8090/people-ws/category';

  constructor(private http: HttpClient) { }

  public saveCategory(data:any){
    return this.http.post(this.urlBase,data);
  }

  public updateCategory(data:any){
    return this.http.post(this.urlBase,data);
  }

  public getAllCategorys(){
      return this.http.get(this.urlBase+'/getAll');
  }

  public getCategory(idCategory:String){
     return this.http.get<Category>(this.urlBase+"/"+idCategory);
  }

  public deleteCategory(idCategory:String){
    return this.http.delete(this.urlBase+"/"+idCategory);
 }
}
