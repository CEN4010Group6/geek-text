declare var process: any;

// Core Angular Imports
import { ErrorHandler, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { ServiceWorkerModule } from '@angular/service-worker';

// 3rd party Angular components
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LoadingBarHttpClientModule } from '@ngx-loading-bar/http-client';
import { LoadingBarRouterModule } from '@ngx-loading-bar/router';
import { LoadingBarModule } from '@ngx-loading-bar/core';

// Site imports
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ApiService } from './api.service';
import { BookModule } from './book/books.module';
import { NavigationComponent } from './navigation/navigation.component';
import { CustomErrorHandlerService } from './custom-error-handler.service';
import { LoggerService } from './logger.service';
import { NotFoundComponent } from './not-found/not-found.component';
import { StorefrontModule } from './storefront/storefront.module';
import { AuthorsModule } from './authors/authors.module';
import { JoinPipe } from './join.pipe';

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    NotFoundComponent,
    JoinPipe,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    NgbModule,
    LoadingBarHttpClientModule,
    LoadingBarRouterModule,
    LoadingBarModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: (process.env.NODE_ENV === 'production')
    }),
    AppRoutingModule,
    StorefrontModule,
    BookModule,
    AuthorsModule
  ],
  providers: [
    ApiService,
    LoggerService,
    {
      provide: ErrorHandler,
      useClass: CustomErrorHandlerService
    }
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
