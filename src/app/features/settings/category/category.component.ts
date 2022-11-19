import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { CategoryDialogComponent } from './category-dialog/category-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { CategoryService } from './../services/category.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {

  public displayedColumns: string[] = ['nombreCategoria','pagoHora', 'puesto', 'edit', 'delete'];

  public dataSource:any = new MatTableDataSource() ;

  constructor(public dialog: MatDialog, private categoryService:CategoryService) { }

  ngOnInit(): void {
    this.getAllCategory();
  }

  public getAllCategory(){
    this.categoryService.getAllCategorys().subscribe({
      next: (res) => {
        this.dataSource.data= res;
      }, 
      error: (err) => {
        
      // handle invalid user message
      }
    })
  }
  openDialog(edit:boolean,categoryId?:string) {
    const dialogRef = this.dialog.open(CategoryDialogComponent,{
      data:{
        edit:edit,
        jobId:categoryId
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.categoryService.saveCategory(result).subscribe({
        next: (res) => {
          this.getAllCategory();
        }, 
        error: (err) => {
          
        // handle invalid user message
        }
      })
    });
  }


  public edit(categoryId:string){
    this.openDialog(true,categoryId);
  };

  public delete(categoryId:string){
    this.categoryService.deleteCategory(categoryId).subscribe({
      next: (res) => {
        this.getAllCategory();
      }, 
      error: (err) => {
        
      // handle invalid user message
      }
    });
  };

}
