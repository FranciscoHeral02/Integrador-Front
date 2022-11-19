import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { CampusService } from '../services/campus.service';
import { CampusDialogComponent } from './campus-dialog/campus-dialog.component';

@Component({
  selector: 'app-campus',
  templateUrl: './campus.component.html',
  styleUrls: ['./campus.component.scss']
})
export class CampusComponent implements OnInit {

  public displayedColumns: string[] = ['nombreCampus','ubicacion', 'direccion','razonSocial','telefono', 'edit', 'delete'];
  public dataSource:any = new MatTableDataSource() ;
  constructor(public dialog: MatDialog,private campusService:CampusService) { }

  ngOnInit(): void {
    
    this.getAllCampus();
  }

  public getAllCampus(){
    this.campusService.getAllCampus().subscribe({
      next: (res) => {
        this.dataSource.data= res;
      }, 
      error: (err) => {
        
      // handle invalid user message
      }
    })
  }

  openDialog(edit:boolean,campusId?:string) {
    const dialogRef = this.dialog.open(CampusDialogComponent,{
      data:{
        edit:edit,
        campusId:campusId
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.campusService.saveCampus(result).subscribe({
        next: (res) => {
          this.getAllCampus();
        }, 
        error: (err) => {
          
        // handle invalid user message
        }
      })
    });
  }

  public edit(idCampus:string){
    this.openDialog(true,idCampus)
  };

  public delete(campusId:string){
    this.campusService.deleteCampus(campusId).subscribe({
      next: (res) => {
        this.dataSource.data= res;
      }, 
      error: (err) => {
        
      // handle invalid user message
      }
    });
  };

}
