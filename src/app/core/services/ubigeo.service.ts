import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UbigeoService {

  public urlBase: string = 'http://localhost:8090/people-ws/ubigeo';

  constructor(private http: HttpClient) { }

  public getDepartamentos(){
     return this.http.get(this.urlBase+'/getDepartamentos');
  }

  public getProvincias(codDep:string){
      return this.http.get(this.urlBase+'/getProvincias/'+codDep);
  }

  public getDistritos(codDep:string,codProv:string){
     return this.http.get(this.urlBase+'/getDistritos/'+codDep+'/'+codProv);
  }
}
