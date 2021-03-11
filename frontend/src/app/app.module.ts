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
import { StorageModule } from '@ngx-pwa/local-storage';

// Site imports
import { ApiService } from './api.service';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AuthModule } from './auth/auth.module';
import { AuthorsModule } from './authors/authors.module';
import { BooksModule } from './books/books.module';
import { CustomErrorHandlerService } from './custom-error-handler.service';
import { ErrorInterceptor } from './error.interceptor';
import { JoinPipe } from './join.pipe';
import { JwtInterceptor } from './jwt.interceptor';
import { LoggerService } from './logger.service';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { NavigationComponent } from './navigation/navigation.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { StorefrontModule } from './storefront/storefront.module';
import { FlashMessageModule } from './flash-message/flash-message.module';

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
    AuthModule,
    AuthorsModule,
    BooksModule,
    FlashMessageModule,
    StorefrontModule
  ],
  declarations: [
    AppComponent,
    JoinPipe,
    LoginComponent,
    LogoutComponent,
    NavigationComponent,
    NotFoundComponent
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
