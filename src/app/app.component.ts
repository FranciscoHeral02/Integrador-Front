import { Component, OnInit } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';
import { oauth2OidcConfig } from 'src/config/oauth2oidc.config';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  
  title = 'sgth-frontend';

  constructor(private authService:OAuthService){}

  ngOnInit(): void {
    this.authService.configure(oauth2OidcConfig);
    this.authService.setupAutomaticSilentRefresh();
    this.authService.loadDiscoveryDocumentAndLogin();
  }
}

