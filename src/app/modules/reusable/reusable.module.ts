import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import { SaveSubjectComponent } from './subject/save-subject/save-subject.component';
import {InputTextModule} from "primeng/inputtext";
import {ButtonModule} from "primeng/button";
import {ReactiveFormsModule} from "@angular/forms";
import {ToastModule} from "primeng/toast";
import { SaveStudentComponent } from './student/save-student/save-student.component';
import {RadioButtonModule} from "primeng/radiobutton";


@NgModule({
  declarations: [
    SaveSubjectComponent,
    SaveStudentComponent
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
