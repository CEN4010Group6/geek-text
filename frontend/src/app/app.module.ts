declare var process: any;

// Core Angular Imports
import { ErrorHandler, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { ServiceWorkerModule } from '@angular/service-worker';

// 3rd party Angular components
import { NgbModule, NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';

// Site imports
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ApiService } from './api.service';
import { BookModule } from './book/books.module';
import { NavigationComponent } from './navigation/navigation.component';
import { CustomErrorHandlerService } from './custom-error-handler.service';
import { LoggerService } from './logger.service';
import { NotFoundComponent } from './not-found/not-found.component';
import { StorefrontComponent } from './storefront/storefront.component';

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    NotFoundComponent,
    StorefrontComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    NgbModule,
    NgbCollapseModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: (process.env.NODE_ENV === 'production')
    }),
    AppRoutingModule,
    BookModule
  ],
  providers: [
    ApiService,
    // LoggerService,
    // {
    //   provide: ErrorHandler,
    //   useClass: CustomErrorHandlerService
    // }
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
