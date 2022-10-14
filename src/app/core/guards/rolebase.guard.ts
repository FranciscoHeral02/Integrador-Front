import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { NGXLogger } from 'ngx-logger';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

/**
 * This class is a guard that check if an user is authenticated
 * and avoids an unauthorized user to access in a forbbiden page.
 * 
 * How it works?:
 * Stage 1: Role base guard check authentication first, 
 * If user is not authenticated, guard send current 
 * user to login page and log him out.
 * 
 * Stage 2: In stage two, check role, If role not valid 
 * for this route it will send home page for this 
 * example. For real case send user to 403 page.
 * 
 * @implements CanActivate
 */
@Injectable({
  providedIn: 'root'
})
export class RolebaseGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router, private logger: NGXLogger) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    
    if (!this.authService.isAuthenticated) {
      this.router.navigate(['/auth/login']);
      this.authService.logout();
      this.logger.info("is not logged in");
      return false;
    }
    const validRoles = route.data['authorities'] || [];
    const userData = this.authService.userData;
    
    // Condition for multiple role
    // (!validRoles.some((r: string) => userData?.userInfo?.role.include(r)))
    if (!validRoles.some((r: string) => r === userData?.userInfo?.role)) {
      // this.router.navigate(['/error/403']); // Best place to send user
      this.router.navigate(['/']); // For this example case
      return false;
    }

    return true;
  }
  
}
