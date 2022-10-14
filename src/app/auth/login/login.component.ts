import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NGXLogger } from 'ngx-logger';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public loginValid = true;
  public username: string = '';
  public password: string = '';

  private requestData$!: Observable<any>;

  constructor(private authService: AuthService,private router: Router,private logger:NGXLogger) { }

  ngOnInit(): void {

    this.requestData$ = this.authService.userData$;
  
  }

  onSubmit(){
    this.loginValid = true;
  
    this.authService.login(this.username, this.password).subscribe({
      next: (res) => {
        this.logger.info(res)
        this.router.navigate(["/dashboard"]);
      }, 
      error: (err) => {
        this.logger.error(err)
        this.loginValid = false;
      // handle invalid user message
      }
    });
  }
}
