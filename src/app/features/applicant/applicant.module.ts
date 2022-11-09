import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ApplicantRoutingModule } from './applicant-routing.module';
import { ApplicantComponent } from './applicant.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ApplicantListadoComponent } from './applicant-listado/applicant-listado.component';
import { ApplicantNuevoComponent } from './applicant-nuevo/applicant-nuevo.component';
import { ApplicantService } from './services/applicant.service';


@NgModule({
  declarations: [
    ApplicantComponent,
    ApplicantListadoComponent,
    ApplicantNuevoComponent
  ],
  imports: [
    CommonModule,
    ApplicantRoutingModule,
    SharedModule
  ],
  providers: [
    ApplicantService
  ]
})
export class ApplicantModule { }
