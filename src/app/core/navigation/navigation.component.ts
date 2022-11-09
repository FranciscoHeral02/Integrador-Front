import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { Router } from '@angular/router';
import { OAuthService } from 'angular-oauth2-oidc';

interface TreeNode {
  name: string;
  route?:string;
  icon?: string;
  children?: TreeNode[];
}



@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {


  treeData: TreeNode[] = [
   
    {
      name: 'Postulantes',
      icon:'person_add',
      route:'/applicant',
      children: [{name: 'Listado',icon:'list',route:'/listado'}, 
                 {name: 'Nuevo',icon:'add_box',route:'/nuevo'}],
    },
    {
      name: 'Empleados',
      icon:'group',
      children: [{name: 'Listado',icon:'list'}, {name: 'Nuevo',icon:'add_box'}],
    },
    {
      name: 'Capacitaciones',
      icon:'book',
      children: [{name: 'Listado',icon:'list'}, {name: 'Nuevo',icon:'add_box'}],
    },
    {
      name: 'Control',
      icon:'work_history',
      children: [{name: 'Listado',icon:'list'}, {name: 'Nuevo',icon:'add_box'}],
    },
    {
      name: 'Reportes',
      icon:'receipt_long',
      children: [{name: 'Listado',icon:'list'}, {name: 'Nuevo',icon:'add_box'}],
    },
  ];

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(private breakpointObserver: BreakpointObserver,
    private router: Router, private oauthService: OAuthService) {}

  ngOnInit(){
  }

  public logout(){
    this.oauthService.revokeTokenAndLogout();
  }

}
