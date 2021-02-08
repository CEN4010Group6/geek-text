// Core Angular Imports
import { ErrorHandler, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

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

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    NotFoundComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    NgbModule,
    NgbCollapseModule,
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
