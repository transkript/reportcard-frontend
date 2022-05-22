import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Subject} from "../../../../models/dto/subject.model";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {SubjectService} from "../../../../services/subject.service";
import {Section} from "../../../../models/dto/section.model";
import {SectionService} from "../../../../services/section.service";
import {MessageService} from "primeng/api";

@Component({
  selector: 'app-save-subject',
  templateUrl: './save-subject.component.html',
  styleUrls: ['./save-subject.component.scss']
})
export class SaveSubjectComponent implements OnInit {

  @Input() subject: Subject;
  @Output() cancelSaveSubjectEvent = new EventEmitter<boolean>();

  subjectForm: FormGroup;
  sections: Section[] = [];

  constructor(private subjectService: SubjectService, private sectionService: SectionService, private messageService: MessageService) {
    this.subject = {id: -1, name: '', coefficient: 0, code: '', section_id: -1}

    this.subjectForm = new FormGroup({
      name: new FormControl(this.subject.name, Validators.required),
      code: new FormControl(this.subject.code, Validators.required),
      coeff: new FormControl(this.subject.coefficient, [Validators.required, Validators.min(0)]),
      sectionId: new FormControl(this.subject.section_id, Validators.required)
    });
  }

  ngOnInit(): void {

    // load the sections from the backend
    this.sectionService.getSections().subscribe({
      next: (sections) => {
        this.sections = sections;
      },
      error: (error) => {
        this.messageService.add({
          severity: 'warn', summary: 'Error connecting to server', detail: error.message
        })
      }
    });
  }

  saveSubject(): void {
    console.log(this.subjectForm.value)

    const subjectToSave: Subject = {
      id: -1,
      name: this.subjectForm.get('name')?.value,
      code: this.subjectForm.get('code')?.value,
      coefficient: this.subjectForm.get('coeff')?.value,
      section_id: this.subjectForm.get('sectionId')?.value.id
    }

    if(this.subject.id < 0) {
      this.subjectService.addSubject(subjectToSave).subscribe((response) => {
        console.log(response)
      });
    } else {
      subjectToSave.id = this.subject.id;
      this.subjectService.updateSubject(subjectToSave).subscribe({
        next: (response) => {
          console.log(response);
          this.messageService.add({
            severity: 'success', summary: 'Success', detail: response.message
          });
        },
        error: (err) => {
          this.messageService.add({
            severity: 'error', summary: 'Error', detail: err.message
          });
        }
      });
    }
  }

  cancelSaveSubject() {
    this.cancelSaveSubjectEvent.emit(true);
  }
}
