import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ApplicantRoutingModule } from './applicant-routing.module';
import { ApplicantComponent } from './applicant.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    ApplicantComponent
  ],
  imports: [
    CommonModule,
    ApplicantRoutingModule,
    SharedModule
  ]
})
export class ApplicantModule { }
