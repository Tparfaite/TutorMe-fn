import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { NgxSpinnerModule } from 'ngx-spinner';



@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent
  ],
  imports: [
    CommonModule,
    MatIconModule,
    MatDividerModule,
    AppRoutingModule,
    NgxSpinnerModule
    
  ],
  exports: [
    FooterComponent,
    HeaderComponent
  ]
})
export class IncludesModule { }
