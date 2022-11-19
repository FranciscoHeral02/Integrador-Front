import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ApplicantInterviewComponent } from './applicant-interview/applicant-interview.component';
import { ApplicantListadoComponent } from './applicant-listado/applicant-listado.component';
import { ApplicantNuevoComponent } from './applicant-nuevo/applicant-nuevo.component';
import { ApplicantComponent } from './applicant.component';

const routes: Routes = [{ path: '', 
  component: ApplicantComponent, 
  children:[{
    path:'listado',
    component: ApplicantListadoComponent
    },{
    path:'nuevo',
    component: ApplicantNuevoComponent
    },
    {
      path:'interview',
      component: ApplicantInterviewComponent
    }]
  }
  ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ApplicantRoutingModule { }
