import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CampusComponent } from './campus/campus.component';
import { CategoryCompetenceComponent } from './category-competence/category-competence.component';
import { CategoryComponent } from './category/category.component';
import { CompetenceComponent } from './competence/competence.component';
import { JobComponent } from './job/job.component';
import { SettingsComponent } from './settings.component';

const routes: Routes = [
  { path: '', 
    component: SettingsComponent,
    
    children: [
      { path:"", redirectTo: 'campus',  pathMatch:'full' },
      {path:'campus',component:CampusComponent},
      {path:'category',component:CategoryComponent},
      {path:'category-competence',component:CategoryCompetenceComponent},
      {path:'competence',component:CompetenceComponent},
      {path:'job',component:JobComponent}
    ]

  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SettingsRoutingModule { }
