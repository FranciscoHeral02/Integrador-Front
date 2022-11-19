import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { CompetenceDialogComponent } from './competence-dialog/competence-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { CompetenceService } from '../services/competence.service';

@Component({
  selector: 'app-competence',
  templateUrl: './competence.component.html',
  styleUrls: ['./competence.component.scss']
})
export class CompetenceComponent implements OnInit {

  public displayedColumns: string[] = ['nombreCompetencia','descripcionCompetencia', 'edit', 'delete'];

  public dataSource:any = new MatTableDataSource() ;

  constructor(public dialog: MatDialog,private competenceService:CompetenceService) { }

  ngOnInit(): void {
    this.getAllCompetences();
  }

  public getAllCompetences(){
    this.competenceService.getAllCompetences().subscribe({
      next: (res) => {
        this.dataSource.data= res;
      }, 
      error: (err) => {
        
      // handle invalid user message
      }
    })
  }

  openDialog(edit:boolean,competenceId?:string) {
    const dialogRef = this.dialog.open(CompetenceDialogComponent,{
      data:{
        edit:edit,
        competenceId:competenceId
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.competenceService.saveCompetence(result).subscribe({
        next: (res) => {
          this.getAllCompetences();
        }, 
        error: (err) => {
          
        // handle invalid user message
        }
      })
    });
  }


  public edit(competenceId:string){
   
    this.openDialog(true,competenceId)
  };

  public delete(competenceId:string){

    this.competenceService.deleteCompetence(competenceId).subscribe({
      next: (res) => {
        this.getAllCompetences();
      }, 
      error: (err) => {
        
      // handle invalid user message
      }
    });
  };
}
