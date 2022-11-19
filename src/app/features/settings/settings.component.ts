import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';


interface SettingsNode {
  name: string;
  showName: string;
  route:string;
  icon?: string;
}

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  public activeLink:string;
  constructor(private router:Router) { 
    this.activeLink= this.router.url;
  }

  ngOnInit(): void {
    
  }

  public links: SettingsNode [] =[
    {name:'campus',showName:'Campus',route:'/settings/campus'},
    {name:'job',showName:'Puestos',route:'/settings/job'},
    {name:'category',showName:'Categorias',route:'/settings/category'},
    {name:'competence',showName:'Competencias',route:'/settings/competence'},
    {name:'category-competence',showName:'Categoria Competencia',route:'/settings/category-competence'},
  ]

 
}
