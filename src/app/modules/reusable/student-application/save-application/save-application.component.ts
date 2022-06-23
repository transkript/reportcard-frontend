import {Component, OnInit} from '@angular/core';
import {ApplicationResponse, StudentApplication} from "../../../../models/dto/student-application.model";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Subject} from "../../../../models/dto/subject.model";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {SubjectService} from "../../../../services/subject.service";
import {SubjectRegistration} from "../../../../models/dto/subject-registration.model";
import {SubjectRegistrationService} from "../../../../services/subject-registration.service";
import {StudentService} from "../../../../services/student.service";
import {Student} from "../../../../models/dto/student.model";
import {AcademicYear} from "../../../../models/dto/academic-year.model";
import {AcademicYearService} from "../../../../services/academic-year.service";
import {ClassLevel} from "../../../../models/dto/class-level.model";
import {ClassLevelService} from "../../../../services/class-level.service";
import {ClassLevelSubService} from "../../../../services/class-level-sub.service";
import {ClassLevelSub} from "../../../../models/dto/class-level-sub.model";
import {StudentApplicationService} from "../../../../services/student-application.service";
import {DateUtil} from "../../../../utils/date.util";

@Component({
  selector: 'app-save-application',
  templateUrl: './save-application.component.html',
  styleUrls: ['./save-application.component.scss']
})
export class SaveApplicationComponent implements OnInit {
  readonly modal: NgbActiveModal;
  editing: boolean = false;
  studentApplicationRes?: ApplicationResponse;
  applicationForm: FormGroup = this.fb.group({});
  applicationSubjects: { pending: boolean, subject: Subject }[] = [];
  subjects: Subject[] = [];
  students: Student[] = [];
  classLevels: { id: number, name: string, cl: ClassLevel, cls: ClassLevelSub }[] = [];
  academicYears: AcademicYear[] = [];
  private readonly defaultSubject: Subject = {id: -1, name: '', section_id: -1, code: '', coefficient: -1};

  constructor(
    private fb: FormBuilder,
    private activeModal: NgbActiveModal,
    private subjectService: SubjectService,
    private studentService: StudentService,
    private classLevelService: ClassLevelService,
    private classLevelSubService: ClassLevelSubService,
    private academicYearService: AcademicYearService,
    private studentApplicationService: StudentApplicationService,
    private subjectRegistrationService: SubjectRegistrationService,
  ) {
    this.modal = activeModal
  }

  ngOnInit(): void {
    this.loadSubjects();
    this.loadStudents();
    this.loadAcademicYears();
    this.loadClassLevels();
    this.loadApplicationSubjects();
    this.setupApplicationForm();
  }

  loadStudentApplicationForm = () => {
    this.applicationForm = new FormGroup({
      // disabled
      studentId: new FormControl({
        value: this.studentApplicationRes?.student.id,
        disabled: this.editing
      }, Validators.required),
      classId: new FormControl({
        value: this.studentApplicationRes?.application.cls_id,
        disabled: this.editing
      }, Validators.required),
      yearId: new FormControl({
        value: this.studentApplicationRes?.application.year_id,
        disabled: this.editing
      }, Validators.required),
    });
  }


  loadStudents = () => {
    this.studentService.getAll().subscribe({
      next: (students) => this.students = students
    });
  }

  loadSubjects = () => {
    this.subjectService.getAll().subscribe({
      next: (subjects) => this.subjects = subjects
    });
  }

  loadClassLevels = () => {
    this.classLevelService.getAll().subscribe({
      next: (classLevels) => classLevels.forEach((cl) => {
        this.classLevelSubService.getAllByClassLevelId(cl.id).subscribe({
          next: (classLevelSubs) => classLevelSubs.forEach((cls) => {
            this.classLevels.push({id: cl.id, name: `${cl.name} ${cls.name}`, cl: cl, cls: cls});
          })
        });
      })
    });
  }

  loadAcademicYears = () => {
    this.academicYearService.getAll().subscribe({
      next: (years) => this.academicYears = years
    })
  }

  loadApplicationSubjects() {
    if (this.studentApplicationRes) {
      this.studentApplicationRes.subjects_regs.forEach((sr) => {
        this.subjectService.getById(sr.subject_id).subscribe({
          next: (subject) => this.addToApplicationSubjects({pending: false, subject: subject})
        });
      });
    }
  }

  setupApplicationForm() {
    this.loadStudentApplicationForm();
  }

  resetApplication() {

  }

  saveApplication() {
    const newSubjectRegs: SubjectRegistration[] = [];
    this.applicationSubjects.forEach((aps) => {
      if (aps.pending) {
        if (this.studentApplicationRes) {
          newSubjectRegs.push({
            id: -1,
            year_id: this.studentApplicationRes.application.year_id,
            student_id: this.studentApplicationRes.student.id,
            subject_id: aps.subject.id,
          });
        }
      }
    });

    const studentApplication: StudentApplication = {
      id: -1, created_at: DateUtil.toRcDate(new Date()),
      student_id: this.applicationForm.get('studentId')?.value,
      cls_id: this.applicationForm.get('classId')?.value,
      year_id: this.applicationForm.get('yearId')?.value,
    }

    console.log(studentApplication);
    if (this.editing) {

    } else {
      this.studentApplicationService.save(studentApplication).subscribe({
        next: (res) => console.log(res),
      });

      this.subjectRegistrationService.saveMultiple(newSubjectRegs).subscribe({
        next: (res) => {
          console.log(res)
          this.loadApplicationSubjects();
        }
      });
    }
  }

  addSubject($event: MouseEvent, subjectSelect: HTMLSelectElement) {
    const addSubjectButton: HTMLButtonElement = $event.target as HTMLButtonElement;
    if (subjectSelect.hidden) {
      subjectSelect.hidden = false;
      addSubjectButton.textContent = "Register";
    } else {
      const s: Subject = this.findSubjectById(parseInt(subjectSelect.value), this.subjects);

      if (s.id > 0) {
        this.addToApplicationSubjects({pending: true, subject: s})
      }

      subjectSelect.hidden = true;
      addSubjectButton.textContent = "Add";
    }
  }

  findSubjectById = (id: number, subjects: Subject[]): Subject => {
    const s: Subject | undefined = subjects.find(s => s.id == id);
    return s ? s : this.defaultSubject;
  }

  addToApplicationSubjects = (asp: { pending: boolean, subject: Subject }) => {
    if (!(this.applicationSubjects.find(asb => asb.subject.id == asp.subject.id))) {
      this.applicationSubjects.push(asp);
    } else {

    }
  }
}
