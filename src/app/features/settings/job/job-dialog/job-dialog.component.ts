import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Job } from '../../interfaces/job';
import { JobService } from './../../services/job.service';

@Component({
  selector: 'app-job-dialog',
  templateUrl: './job-dialog.component.html',
  styleUrls: ['./job-dialog.component.scss']
})
export class JobDialogComponent implements OnInit {

  public jobForm:FormGroup;

  constructor(
    public dialogRef: MatDialogRef<JobDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb:FormBuilder,
    private jobService:JobService
  ) {

    this.jobForm= this.fb.group({
      jobId:[''],
      nombrePuesto:['',Validators.required],
      descripcionPuesto:['',Validators.required],
    });

    dialogRef.disableClose = true;
  }


  ngOnInit(): void {
    if(this.data.edit){
      this.getJob(this.data.jobId);
    }
  }

  public getJob(jobId:string){
    this.jobService.getJob(jobId).subscribe({
      next: (res) => {
        this.fillForm(res);
      }, 
      error: (err) => {
        
      // handle invalid user message
      }
    })
  }

  public async fillForm(res:Job){
 
    this.jobForm.patchValue({
      jobId: res.jobId,
      nombrePuesto: res.nombrePuesto,
      descripcionPuesto: res.descripcionPuesto,
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSubmit(){
    this.dialogRef.close(this.jobForm.value);
  }
}
