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
  genders: string[] = Object.keys(Gender);
  studentForm: FormGroup = new FormGroup({});
  private readonly defaultStudent: Student = {id: -1, name: "", gender: "M", dob: '', pob: "", regno: "",};

  constructor(
    private activeModal: NgbActiveModal,
    private studentService: StudentService,
    private messageService: MessageService
  ) {
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
      gender: new FormControl(this.student.gender, Validators.required),
      dob: new FormControl(DateUtil.fromRcDate(this.student.dob), Validators.required),
      pob: new FormControl(this.student.pob, Validators.required),
    });
  }

  saveStudent() {
    const studentToSave: Student = {
      id: -1,
      name: this.studentForm.get('name')?.value,
      regno: this.studentForm.get('regNum')?.value,
      gender: this.studentForm.get('gender')?.value,
      dob: DateUtil.setToRcDateString(this.studentForm.get('dob')?.value),
      pob: this.studentForm.get('pob')?.value,
    };

    if (this.student.id < 0) {
      this.studentService.save(studentToSave).subscribe({
        next: (res) => addToMessageService(this.messageService, 'success', 'Success', `${res.message}`),
        error: (err) => addToMessageService(this.messageService, 'error', 'Error', `${err.message}`)
      });
    } else {
      studentToSave.id = this.student.id;
      this.studentService.update(studentToSave).subscribe({
        next: (res) => addToMessageService(this.messageService, 'info', 'Updated', res.message,),
        error: (err) => addToMessageService(this.messageService, 'error', 'Error', `${err.message}`)
      })
    }
  }

  closeModal() {
    this.activeModal.close();
  }
}
