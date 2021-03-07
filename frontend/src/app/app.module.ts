declare var process: any;

// Core Angular Imports
import { ErrorHandler, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ServiceWorkerModule } from '@angular/service-worker';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// 3rd party Angular components
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LoadingBarHttpClientModule } from '@ngx-loading-bar/http-client';
import { LoadingBarRouterModule } from '@ngx-loading-bar/router';
import { LoadingBarModule } from '@ngx-loading-bar/core';

// Site imports
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ApiService } from './api.service';
import { BooksModule } from './books/books.module';
import { NavigationComponent } from './navigation/navigation.component';
import { CustomErrorHandlerService } from './custom-error-handler.service';
import { LoggerService } from './logger.service';
import { NotFoundComponent } from './not-found/not-found.component';
import { StorefrontModule } from './storefront/storefront.module';
import { AuthorsModule } from './authors/authors.module';
import { JoinPipe } from './join.pipe';
import { LoginComponent } from './login/login.component';
import { AuthModule } from './auth/auth.module';
import { JwtInterceptor } from './jwt.interceptor';
import { ErrorInterceptor } from './error.interceptor';
import { LogoutComponent } from './logout/logout.component';
import { StorageModule } from '@ngx-pwa/local-storage';

@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    LoadingBarHttpClientModule,
    LoadingBarRouterModule,
    LoadingBarModule,
    StorageModule.forRoot({
      IDBDBName: 'geektext',
      LSPrefix: 'geektext_'
    }),
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: (process.env.NODE_ENV === 'production')
    }),
    AppRoutingModule,
    StorefrontModule,
    BooksModule,
    AuthorsModule,
    AuthModule
  ],
  declarations: [
    AppComponent,
    NavigationComponent,
    NotFoundComponent,
    JoinPipe,
    LoginComponent,
    LogoutComponent,
  ],
  providers: [
    ApiService,
    LoggerService,
    {
      provide: ErrorHandler,
      useClass: CustomErrorHandlerService
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptor,
      multi: true
    }
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
