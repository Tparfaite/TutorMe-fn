import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { IncludesModule } from './components/includes/includes.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PagesModule } from './components/pages/pages.module';
import { AuthService } from './services/auth.service';
import { HttpClientModule } from '@angular/common/http';



@NgModule({
  declarations: [
    AppComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    IncludesModule,
    BrowserAnimationsModule,
    PagesModule,
    HttpClientModule,
    
    
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
