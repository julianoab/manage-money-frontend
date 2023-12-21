import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { SegurancaRoutingModule } from './seguranca-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    CommonModule,
    SegurancaRoutingModule,
    HttpClientModule,
    FormsModule  
]
})
export class SegurancaModule { }
