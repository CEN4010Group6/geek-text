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


@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    NgbModule,
<<<<<<< HEAD
    NgbCollapseModule,
    AppRoutingModule
=======
    AppRoutingModule,
    BookModule
>>>>>>> b59d80d (Initial setup of Book module.)
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
