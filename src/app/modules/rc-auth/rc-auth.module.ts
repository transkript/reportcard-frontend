import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SplitterModule} from 'primeng/splitter';
import {ButtonModule} from 'primeng/button';
import {DividerModule} from 'primeng/divider';
import {InputTextModule} from 'primeng/inputtext';
import {StyleClassModule} from 'primeng/styleclass';
import {CardModule} from 'primeng/card';
import {PasswordModule} from 'primeng/password';
import {AvatarModule} from 'primeng/avatar';
import { HomeComponent } from './components/home/home.component';
import { FormsModule } from '@angular/forms'; 
import { ReactiveFormsModule } from '@angular/forms';
import {ImageModule} from 'primeng/image'



@NgModule({
  declarations: [
    HomeComponent,
  ],
  imports: [
    CommonModule,
    SplitterModule,
    DividerModule,
    ButtonModule,
    InputTextModule,
    StyleClassModule,
    CardModule,
    PasswordModule,
    AvatarModule,
    ReactiveFormsModule,
    FormsModule,
    ImageModule
  ],
  exports : [
    HomeComponent
  ]
})
export class RcAuthModule { }
