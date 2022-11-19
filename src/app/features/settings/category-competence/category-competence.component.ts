import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { CategoryCompetenceService } from './../services/category-competence.service';
import { CategoryCompetenceDialogComponent } from './category-competence-dialog/category-competence-dialog.component';


@Component({
  selector: 'app-category-competence',
  templateUrl: './category-competence.component.html',
  styleUrls: ['./category-competence.component.scss']
})
export class CategoryCompetenceComponent implements OnInit {

  public displayedColumns: string[] = ['categoria','competencia', 'notaMinima', 'escalaMax', 'saltoEscala','edit','delete'];

  public dataSource:any = new MatTableDataSource() ;

  constructor(public dialog: MatDialog, private categoryCompetenceService:CategoryCompetenceService) { }

  ngOnInit(): void {

    this.getAllCategoryCompetence();
  }

  public getAllCategoryCompetence(){
    this.categoryCompetenceService.getAllCategoryCompetences().subscribe({
      next: (res) => {
        this.dataSource.data= res;
      }, 
      error: (err) => {
        
      // handle invalid user message
      }
    })
  }

  openDialog() {
    const dialogRef = this.dialog.open(CategoryCompetenceDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }


  public edit(idCampus:number){

  };

  public delete(idCampus:number){

  };
}
