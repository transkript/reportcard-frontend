import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SaveSubjectComponent} from './subject/save-subject/save-subject.component';
import {InputTextModule} from "primeng/inputtext";
import {ButtonModule} from "primeng/button";
import {ReactiveFormsModule} from "@angular/forms";
import {ToastModule} from "primeng/toast";
import {SaveStudentComponent} from './student/save-student/save-student.component';
import {RadioButtonModule} from "primeng/radiobutton";
import {SaveClassComponent} from './class-level/save-class/save-class.component';
import {SaveSectionComponent} from './section/save-section/save-section.component';
import {SaveApplicationComponent} from './student-application/save-application/save-application.component';


@NgModule({
  declarations: [
    SaveSubjectComponent,
    SaveStudentComponent,
    SaveClassComponent,
    SaveSectionComponent,
    SaveApplicationComponent,
  ],
  imports: [
    CommonModule,
    InputTextModule,
    ButtonModule,
    ReactiveFormsModule,
    ToastModule,
    RadioButtonModule
  ],
  exports: [
    SaveSubjectComponent,
    SaveStudentComponent
  ]
})
export class ReusableModule {
}
