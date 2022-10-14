import { HttpClient, HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import jwtDecode from 'jwt-decode';
import { NGXLogger } from 'ngx-logger';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from './../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  ACCESS_TOKEN = 'access_token';
  REFRESH_TOKEN = 'refresh_token';

  private userDataSubject: BehaviorSubject<any> = new BehaviorSubject(null);
  public userData$: Observable<any> = this.userDataSubject.asObservable();

  constructor(private http: HttpClient,private logger:NGXLogger) {
    if(localStorage.getItem(this.ACCESS_TOKEN) && localStorage.getItem(this.REFRESH_TOKEN)){
      const access_token = (<string>localStorage.getItem(this.ACCESS_TOKEN));
      const refresh_token = (<string>localStorage.getItem(this.REFRESH_TOKEN));
      this.userDataSubject.next({access_token, refresh_token, userInfo: this.getUserDataFromToken(access_token)})

    }
  }

  /**
   * This method returns response of login from backend auth endpoint
   * @param email 
   * @param password 
   * @returns 
   */
  login(email: string, password: string): Observable<any> {
    return this.http.post(`${environment.oauthServer}/auth/login`, { email, password }).pipe(
      map((res: any) => {
        const access_token = res?.data?.access_token;
        const refresh_token = res?.data?.refresh_token;
        this.userDataSubject.next({access_token, refresh_token, userInfo: this.getUserDataFromToken(access_token)});
        localStorage.setItem(this.ACCESS_TOKEN, access_token)
        localStorage.setItem(this.REFRESH_TOKEN, refresh_token)
        return res
      })
    )
  }

  /**
   * Logout of application and remove refresh and access token
   * from local storage
   */
  logout(): void {
    localStorage.removeItem(this.ACCESS_TOKEN);
    localStorage.removeItem(this.REFRESH_TOKEN);
    this.userDataSubject.next(null);
  }

  /**
   * Generate new access token from resfresh token
   * @returns 
   */
  generateNewTokens(): Observable<HttpEvent<any>> {
    const refresh_token = this.userDataSubject.value?.refresh_token;
    return this.http.post(`${environment.oauthServer}/auth/refresh`, { refresh_token }).pipe(
      map((res: any) => {
        const access_token = res?.data?.access_token;
        const refresh_token = res?.data?.refresh_token;
        this.userDataSubject.next({access_token, refresh_token, userData: this.getUserDataFromToken(access_token)});
        localStorage.setItem(this.ACCESS_TOKEN, access_token);
        localStorage.setItem(this.REFRESH_TOKEN, refresh_token);
        return res
      })
    )
  }

  /**
   * To get if user is authenticated. This getter evaluates
   * if exists a refresh token
   */
  get isAuthenticated(): boolean {
    const refresh_token = this.userDataSubject.value?.refresh_token;
    if (!refresh_token) {
      this.logger.info("not authenticated")
      return false
    }
      this.logger.info("authenticated")
    return this.isAuthTokenValid(refresh_token)
  }
  
  /**
   * Evaluate if access token is still valid. Exp date is
   * compared with current date
   * @param token 
   * @returns boolean 
   */
  isAuthTokenValid(token: string): boolean {
    const decoded: any = jwtDecode(token);
    // default decoded exp format is second
    const expMilSecond: number = decoded?.exp * 1000; // milliseconds
    const currentTime = Date.now(); // milliseconds
    if (expMilSecond < currentTime) {
      return false;
    }
    return true;
  }

  /**
   * This method obtains user data from authorized user
   */
  get userData(): any {
    return this.userDataSubject.value
  }

  /**
   * This method decode JWT to data 
   * @param token 
   * @returns 
   */
  getUserDataFromToken(token: string): any {
    const decoded: any = jwtDecode(token);
    return decoded.data
  }
}
