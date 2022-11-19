import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Competence } from '../../interfaces/competence';
import { CompetenceService } from '../../services/competence.service';

@Component({
  selector: 'app-competence-dialog',
  templateUrl: './competence-dialog.component.html',
  styleUrls: ['./competence-dialog.component.scss']
})
export class CompetenceDialogComponent implements OnInit {

  public competenceForm:FormGroup;

  constructor(
    public dialogRef: MatDialogRef<CompetenceDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb:FormBuilder,
    private competenceService:CompetenceService,
  ) {

    this.competenceForm= this.fb.group({
      idCompetencia:[''],
      nombreCompetencia:['',Validators.required,],
      descripcionCompetencia:['',Validators.required],
    });

    dialogRef.disableClose = true;
  }


  ngOnInit(): void {

    if(this.data.edit){
      this.getCompetence(this.data.jobId);
    }
  }

  public getCompetence(competenceId:string){
    this.competenceService.getCompetence(competenceId).subscribe({
      next: (res) => {
        this.fillForm(res);
      }, 
      error: (err) => {
        
      // handle invalid user message
      }
    })
  }

  public async fillForm(res:Competence){
 
    this.competenceForm.patchValue({
      competenceId: res.idCompetencia,
      nombreCompetencia: res.nombreCompetencia,
      descripcionCompetencia: res.descripcionCompetencia
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSubmit(){
    this.dialogRef.close(this.competenceForm.value);
  }


}
