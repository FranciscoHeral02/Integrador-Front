import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, switchMap, take } from 'rxjs';

import { NGXLogger } from 'ngx-logger';
import { AuthService } from '../services/auth.service';

/**
 * This class is an interceptor that check if an user is 
 * loged in application.
 * 
 * How it works?:
 * 
 * Stage 1: Auth Inteceptor will check if request is for refresh 
 * token which means this HTTP request for new tokens, It’s will 
 * pass next to request. Or request is not for refresh_token, it 
 * will go stage 2
 * 
 * Stage 2: If request is not for refresh token, then it will check 
 * acess_token existence. If access_token exists it’s mean user was
 * logged in. So it will go next stage 3.
 * 
 * If access_token not exists, it will send next interceptor chain.
 * 
 * Stage 3: In this stage, It’s going to checking access_token
 * validity. If access_token valid, It will clone exists request
 * and attach access_token in request headers, Then send to next
 * Interceptor chain. If access_token not valid, it will pass stage 4
 * 
 * Stage 4: Since access_token is not valid, so In this stage, 
 * It will going to another refresh_token HTTP request.
 * 
 * @implements HttpInterceptor
 */
@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private authService:AuthService, private logger: NGXLogger) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    if (request.url.indexOf('/auth/refresh') !== -1) {
      this.logger.info("is not for refresh token");
      return next.handle(request);
    }
    const data = this.authService.userData;
    const accessToken = data?.access_token;
    
    if (accessToken) {
      
      if (this.authService.isAuthTokenValid(accessToken)) {
        let modifiedReq = request.clone({
          headers: request.headers.append('Authorization', `Bearer ${accessToken}`)
        });
        this.logger.info("access token is still valid");

        return next.handle(modifiedReq)
      }

      return this.authService.generateNewTokens()
        .pipe(
          take(1),
          switchMap((res: any) => {
            let modifiedReq = request.clone({
              headers: request.headers.append('Authorization', `Bearer ${res?.data?.access_token}`)
            });
            this.logger.info("generate new tokens");
            return next.handle(modifiedReq)
          })
        )
      
    }
    return next.handle(request);
  }
}

