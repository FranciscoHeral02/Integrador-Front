import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EnsureImportedOnceModule } from './ensure-imported-once.module';
import { NavigationComponent } from './navigation/navigation.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { SharedModule } from '../shared/shared.module';
import { LoggerModule, NgxLoggerLevel } from 'ngx-logger';
import { OAuthModule } from 'angular-oauth2-oidc';
import { ToastrModule } from 'ngx-toastr';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [NavigationComponent],
  imports: [
  
    CommonModule,
    SharedModule,
    HttpClientModule,
    LoggerModule.forRoot({
      level: NgxLoggerLevel.TRACE,
      disableConsoleLogging: false
    }),
    OAuthModule.forRoot({
      resourceServer: {
        allowedUrls: ['http://localhost:8090/people-ws/'],
        sendAccessToken: true
    },
    }),
    ToastrModule.forRoot(),
    RouterModule
  ],
  exports: [
    NavigationComponent
  ],
  providers: [
   /* {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptor,
      multi: true
    }*/
  ]
})
export class CoreModule extends EnsureImportedOnceModule{
  public constructor(@SkipSelf() @Optional() parent: CoreModule) {
    super(parent);
  }
 }
