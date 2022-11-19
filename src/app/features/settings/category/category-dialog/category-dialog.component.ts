import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Category } from '../../interfaces/category';
import { CategoryService } from '../../services/category.service';
import { JobService } from '../../services/job.service';



@Component({
  selector: 'app-category-dialog',
  templateUrl: './category-dialog.component.html',
  styleUrls: ['./category-dialog.component.scss']
})
export class CategoryDialogComponent implements OnInit {

  public categoryForm:FormGroup;
  public jobList:any;

  public nivelList:string[]=[
    'N1',
    'N2',
    'N3'
  ]
  
  constructor(
    public dialogRef: MatDialogRef<CategoryDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb:FormBuilder,
    private categoryService:CategoryService,
    private jobService:JobService
  ) {

    this.categoryForm= this.fb.group({
      categoryId:[''],
      nombreCategoria:['',Validators.required,],
      job:['',Validators.required],
      pagoHora:['',Validators.required],
      nivel:[{value:'',disabled:true},Validators.required]
    });

    dialogRef.disableClose = true;
  }

  ngOnInit(): void {
    this.getAllJobs();
    if(this.data.edit){
      this.getCategory(this.data.jobId);
    }
  }

  public getCategory(jobId:string){
    this.categoryService.getCategory(jobId).subscribe({
      next: (res) => {
        this.fillForm(res);
      }, 
      error: (err) => {
        
      // handle invalid user message
      }
    })
  }

  public getAllJobs(){
    this.jobService.getAllJobs().subscribe({
      next: (res) => {
        this.jobList= res;
      }, 
      error: (err) => {
        
      // handle invalid user message
      }
    })
  }

  public async fillForm(res:Category){
 
    this.categoryForm.patchValue({
      categoryId: res.categoryId,
      nombreCategoria: res.nombreCategoria,
      job: res.job,
      pagoHora: res.pagoHora
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSubmit(){
    this.dialogRef.close(this.categoryForm.value);
  }

  setCategory(){

      this.categoryForm.controls['nombreCategoria'].patchValue(
      this.categoryForm.controls['job'].value.nombrePuesto+' - '+
      this.categoryForm.controls['nivel'].value
    );
  }

}
