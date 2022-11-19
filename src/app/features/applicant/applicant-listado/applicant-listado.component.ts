import { Component, OnInit,AfterViewInit, ViewChild } from '@angular/core';
import { ApplicantService } from './../services/applicant.service';
import { ToastrService } from 'ngx-toastr';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-applicant-listado',
  templateUrl: './applicant-listado.component.html',
  styleUrls: ['./applicant-listado.component.scss']
})
export class ApplicantListadoComponent implements OnInit,AfterViewInit {

  public applicantList:any;
  public displayedColumns: string[] = ['dni','nombre', 'apellido', 'celular', 'puestoPostulacion','interview','edit','delete'];

  public dataSource:any = new MatTableDataSource() ;

  //@ViewChild(MatPaginator,{ static: false }) paginator!: MatPaginator;
  

  
  constructor(private applicantService:ApplicantService,private toastr:ToastrService,
    private router: Router) {
    
  }

  ngOnInit(): void {
    this.getAllApplicants();
   // this.dataSource.paginator = this.paginator;
  }

  ngAfterViewInit() {

    
  }


  public getAllApplicants(){
    this.applicantService.getAllApplicants().subscribe({
      next: (res) => {
        this.dataSource.data= res;
      }, 
      error: (err) => {
        
      // handle invalid user message
      }
    })
  }

  public delete(idEmployee:String){
    this.applicantService.deleteApplicant(idEmployee).subscribe({

      next: (res) => {
        console.log(res);
        this.toastr.success("Registro Eliminado");
        this.getAllApplicants();
      }, 
      error: (err) => {
        
      // handle invalid user message
      }
    })
  }

  public edit(idEmployee:String){
    this.router.navigate(['applicant','nuevo'],{queryParams:{'idEmployee':idEmployee}})
  }

  public interview(idEmployee:String){
    this.router.navigate(['applicant','interview'],{queryParams:{'idEmployee':idEmployee}})
  }
}
