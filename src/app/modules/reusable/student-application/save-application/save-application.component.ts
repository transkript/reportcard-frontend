import { Component, OnInit } from '@angular/core';
import {ApplicationResponse} from "../../../../models/dto/studentapplication.model";
import {FormBuilder, FormGroup} from "@angular/forms";
import {Subject} from "../../../../models/dto/subject.model";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {SubjectService} from "../../../../services/subject.service";
import {SubjectRegistration} from "../../../../models/dto/subjectregistration.model";
import {SubjectRegistrationService} from "../../../../services/subject-registration.service";

@Component({
  selector: 'app-save-application',
  templateUrl: './save-application.component.html',
  styleUrls: ['./save-application.component.scss']
})
export class SaveApplicationComponent implements OnInit {
  readonly modal: NgbActiveModal;
  private readonly defaultSubject: Subject = {id: -1, name: '', section_id: -1, code: '', coefficient: -1};

  studentApplicationRes!: ApplicationResponse;
  applicationForm: FormGroup = this.fb.group({});
  applicationSubjects: {pending: boolean, subject: Subject}[] = [];
  subjects: Subject[] = [];

  constructor(
    private fb: FormBuilder,
    private activeModal: NgbActiveModal,
    private subjectService: SubjectService,
    private subjectRegistrationService: SubjectRegistrationService

  ) {
    this.modal = activeModal
  }

  ngOnInit(): void {
    this.loadSubjects();
  }

  loadSubjects() {
    this.subjectService.getSubjects().subscribe({
      next: (subjects) => this.subjects = subjects
    })
  }

  loadApplicationSubjects() {
    if (this.studentApplicationRes) {
      this.studentApplicationRes.subject_regs.forEach((sr) => {
        this.subjectService.getSubjectById(sr.subject_id).subscribe({
          next: (subject) => {
            this.addToApplicationSubjects({pending: false, subject: subject});
          }
        });
      });
    }
  }

  setupApplicationForm() {
    this.applicationForm = this.fb.group({

    });
    console.log(this.studentApplicationRes)
  }

  resetApplication() {

  }

  saveApplication() {
    const newSubjectRegs: SubjectRegistration[] = [];
    this.applicationSubjects.forEach((aps) => {
      if(aps.pending) {
        newSubjectRegs.push({
          id: -1,
          year_id: this.studentApplicationRes.application.year_id,
          student_id: this.studentApplicationRes.student.id,
          subject_id: aps.subject.id,
        });
      }
    });

    this.subjectRegistrationService.addMultiple(newSubjectRegs).subscribe({
      next: (res) => console.log(res)
    });
  }

  addSubject($event: MouseEvent, subjectSelect: HTMLSelectElement) {
    const addSubjectButton: HTMLButtonElement = $event.target as HTMLButtonElement;
    if(subjectSelect.hidden) {
      subjectSelect.hidden = false;
      addSubjectButton.textContent = "Register";
    } else {
      const s: Subject = this.findSubjectById(parseInt(subjectSelect.value), this.subjects);

      if(s.id > 0) {
        this.addToApplicationSubjects({pending: true, subject: s})
      }

      subjectSelect.hidden = true;
      addSubjectButton.textContent = "Add";
    }
  }

  findSubjectById = (id: number, subjects: Subject[]): Subject => {
    const s: Subject | undefined = subjects.find(s => s.id == id);
    return s ? s :  this.defaultSubject;
  }

  addToApplicationSubjects = (asp: {pending: boolean, subject: Subject}) => {
    if (!(this.applicationSubjects.find(asb => asb.subject.id == asp.subject.id))) {
      this.applicationSubjects.push(asp);
    } else {

    }
  }
}
