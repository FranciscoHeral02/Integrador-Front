import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs' ;
import { ApplicantService } from '../services/applicant.service';
@Component({
  selector: 'app-applicant-interview',
  templateUrl: './applicant-interview.component.html',
  styleUrls: ['./applicant-interview.component.scss']
})
export class ApplicantInterviewComponent implements OnInit {

  public base64:string = '';

  constructor(private applicantService: ApplicantService,
    private toastr:ToastrService, private route:ActivatedRoute) { }

  ngOnInit(): void {

    this.getApplicantId();
  }

  public getApplicantId(){
    this.route.queryParamMap.subscribe(parameter => {
      if(parameter.get("idEmployee")){
        this.getApplicant(parameter.get("idEmployee"));
      }; 
    })
  }

  public getApplicant(idEmployee:any){
    
    this.applicantService.getApplicant(idEmployee).subscribe({
      next: (res) => {

       console.log(res.base64pdf);
        this.base64= res.base64pdf;
      }, 
      error: (err) => {
        
      // handle invalid user message
      }
    })
  }

}
