import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategoryCompetenceService } from './../../services/category-competence.service';
import { CategoryService } from '../../services/category.service';
import { CompetenceService } from './../../services/competence.service';
import { CategoryCompetence } from './../../interfaces/category-competence';

@Component({
  selector: 'app-category-competence-dialog',
  templateUrl: './category-competence-dialog.component.html',
  styleUrls: ['./category-competence-dialog.component.scss']
})
export class CategoryCompetenceDialogComponent implements OnInit {

  public categoryCompetenceForm:FormGroup;
  public categoryList:any;
  public competenceList:any;

  public max=100;
  public min = 0;
  public tickInterval = 'auto';
  public step = 1;
  public thumbLabel = true;

  constructor(
    public dialogRef: MatDialogRef<CategoryCompetenceDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb:FormBuilder,
    private categoryCompetenceService:CategoryCompetenceService,
    private categoryService:CategoryService,
    private competenceService:CompetenceService,
  ) {
    this.categoryCompetenceForm= this.fb.group({
      categoryId:[''],
      competenceId:[''],
      minimaNota:['',Validators.required],
      escalaMax:['',Validators.required],
      saltoEscala:['',Validators.required]
    });

    dialogRef.disableClose = true;
  }


  ngOnInit(): void {
    this.getAllCategory();
    this.getAllComptences();
  }

  public getAllCategory(){
    this.categoryService.getAllCategorys().subscribe({
      next: (res) => {
        this.categoryList= res;
      }, 
      error: (err) => {
        
      // handle invalid user message
      }
    })
  }

  public getAllComptences(){
    this.competenceService.getAllCompetences()
    .subscribe({
      next: (res) => {
        this.competenceList= res;
      }, 
      error: (err) => {
        
      // handle invalid user message
      }
    })
  }

  public getCategory(categoryId:string,competenceId:string){
    this.categoryCompetenceService.getCategoryCompetence(categoryId,competenceId).subscribe({
      next: (res) => {
        this.fillForm(res);
      }, 
      error: (err) => {
        
      // handle invalid user message
      }
    })
  }

  public async fillForm(res:CategoryCompetence){
 
    this.categoryCompetenceForm.patchValue({
      categoryId: res.categoryId,
      competenceId: res.competenceId,
      minimaNota: res.minimaNota,
      escalaMax: res.escalaMax,
      saltoEscala:res.saltoEscala
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSubmit(){
    this.dialogRef.close(this.categoryCompetenceForm.value);
  }


}
