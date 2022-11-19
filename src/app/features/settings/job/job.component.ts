import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { JobDialogComponent } from './job-dialog/job-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { JobService } from './../services/job.service';

@Component({
  selector: 'app-job',
  templateUrl: './job.component.html',
  styleUrls: ['./job.component.scss']
})
export class JobComponent implements OnInit {

  public displayedColumns: string[] = ['nombrePuesto','descripcionPuesto','edit', 'delete'];

  public dataSource:any = new MatTableDataSource() ;

  constructor(public dialog: MatDialog,private jobService:JobService) { }

  ngOnInit(): void {
    this.getAllJobs();
  }

  public getAllJobs(){
    this.jobService.getAllJobs().subscribe({
      next: (res) => {
        this.dataSource.data= res;
      }, 
      error: (err) => {
        
      // handle invalid user message
      }
    })
  }

  openDialog(edit:boolean,jobId?:string) {
    const dialogRef = this.dialog.open(JobDialogComponent,{
      data:{
        edit:edit,
        jobId:jobId
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.jobService.saveJob(result).subscribe({
        next: (res) => {
          this.getAllJobs();
        }, 
        error: (err) => {
          
        // handle invalid user message
        }
      })
    });
  }

  public edit(jobId:string){
   
    this.openDialog(true,jobId)
  };

  public delete(jobId:string){

    this.jobService.deleteJob(jobId).subscribe({
      next: (res) => {
        this.getAllJobs();
      }, 
      error: (err) => {
        
      // handle invalid user message
      }
    });
  };
}
