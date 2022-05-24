import {Component, Input, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Student} from "../../../../models/dto/student.model";
import {StudentService} from "../../../../services/student.service";
import {MessageService} from "primeng/api";
import {addToMessageService} from "../../../../utils/message-service.util";
import {Gender} from "../../../../models/enum/gender.enum";
import {DateUtil} from "../../../../utils/date.util";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-save-student',
  templateUrl: './save-student.component.html',
  styleUrls: ['./save-student.component.scss']
})
export class SaveStudentComponent implements OnInit {
  @Input() student: Student;
  private readonly defaultStudent: Student;

  genders: string[] = Object.keys(Gender);

  studentForm: FormGroup = new FormGroup({});

  constructor(public activeModal: NgbActiveModal,
    private studentService: StudentService, private messageService: MessageService) {
    this.defaultStudent = {
      id: -1, name: "", gender: "M", date_of_birth: '',
      place_of_birth: "", registration_number: "", number_of_applications: 0
    };
    this.student = this.defaultStudent;
  }

  ngOnInit(): void {
    console.log(this.student)
    this.setUpStudentForm();
  }

  resetStudent() {
    this.student = this.defaultStudent;
  }

  setUpStudentForm(): void {
    this.studentForm = new FormGroup({
      name: new FormControl(this.student.name, Validators.required),
      regNum: new FormControl(this.student.registration_number, Validators.required),
      gender: new FormControl(this.student.gender, Validators.required),
      dob: new FormControl(DateUtil.fromRcDate(this.student.date_of_birth), Validators.required),
      pob: new FormControl(this.student.place_of_birth, Validators.required),
    });
  }

  saveStudent() {
    const studentToSave: Student = {
      id: -1,
      name: this.studentForm.get('name')?.value,
      registration_number: this.studentForm.get('regNum')?.value,
      gender: this.studentForm.get('gender')?.value,
      date_of_birth: DateUtil.setToRcDateString(this.studentForm.get('dob')?.value),
      place_of_birth: this.studentForm.get('pob')?.value,
      number_of_applications: 0,
    };

    console.log(studentToSave.date_of_birth)
    console.log(this.student.id)

    if(this.student.id < 0) {
      this.studentService.addStudent(studentToSave).subscribe({
        next: (response) => {
          addToMessageService('success', 'Success', response.message, this.messageService);
        },
        error: (err) => {
          console.log(err)
          addToMessageService('error', 'Error', err.message, this.messageService);
        }
      });
    } else {
      studentToSave.id = this.student.id;
      this.studentService.updateStudent(studentToSave).subscribe({
        next: (response) => {
          addToMessageService('info', 'Updated', response.message, this.messageService);
        },
        error: (err) => {
          addToMessageService('error', 'Error', err.message, this.messageService);
        }
      })
    }
  }

  closeModal() {
    this.activeModal.close();
  }
}
