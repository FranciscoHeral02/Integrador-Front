import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SettingsRoutingModule } from './settings-routing.module';
import { CampusComponent } from './campus/campus.component';
import { JobComponent } from './job/job.component';
import { CategoryCompetenceComponent } from './category-competence/category-competence.component';
import { CategoryComponent } from './category/category.component';
import { SettingsComponent } from './settings.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { CompetenceComponent } from './competence/competence.component';
import { CampusDialogComponent } from './campus/campus-dialog/campus-dialog.component';
import { CategoryDialogComponent } from './category/category-dialog/category-dialog.component';
import { CategoryCompetenceDialogComponent } from './category-competence/category-competence-dialog/category-competence-dialog.component';
import { CompetenceDialogComponent } from './competence/competence-dialog/competence-dialog.component';
import { JobDialogComponent } from './job/job-dialog/job-dialog.component';
import { CampusService } from './services/campus.service';
import { CategoryCompetenceService } from './services/category-competence.service';
import { CategoryService } from './services/category.service';
import { JobService } from './services/job.service';
import { CompetenceService } from './services/competence.service';


@NgModule({
  declarations: [
    CampusComponent,
    JobComponent,
    CategoryCompetenceComponent,
    CategoryComponent,
    SettingsComponent,
    CompetenceComponent,
    CampusDialogComponent,
    CategoryDialogComponent,
    CategoryCompetenceDialogComponent,
    CompetenceDialogComponent,
    JobDialogComponent
  ],
  imports: [
    CommonModule,
    SettingsRoutingModule,
    SharedModule
  ],
  providers: [
    CampusService,
    CategoryCompetenceService,
    CategoryService,
    JobService,
    CompetenceService
  ]
})
export class SettingsModule { }
