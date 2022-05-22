import {Component, OnInit, ViewChild} from '@angular/core';
import {Student} from "../../../../models/dto/student.model";
import {StudentService} from "../../../../services/student.service";
import {SaveStudentComponent} from "../../../reusable/student/save-student/save-student.component";
import {StringUtil} from "../../../../utils/string.util";
import {MessageService} from "primeng/api";
import {addToMessageService} from "../../../../utils/message-service.util";

@Component({
  selector: 'app-rc-students',
  templateUrl: './rc-students.component.html',
  styleUrls: ['./rc-students.component.scss']
})
export class RcStudentsComponent implements OnInit {
  @ViewChild(SaveStudentComponent) saveStudentComponent?: SaveStudentComponent;

  currentStudent: Student = {
    id: -1, name: '', gender: 'M', date_of_birth: new Date(),
    place_of_birth: '', registration_number: 'string', number_of_applications: 0,
  };
  students: Student[] = [];
  constructor(private studentService: StudentService, private messageService: MessageService) {
  }

  ngOnInit(): void {
    this.loadStudents();
  }

  changeCurrentStudent(student: Student) {
    if(this.saveStudentComponent?.student) {
      this.saveStudentComponent.student = student;
      this.saveStudentComponent.setUpStudentForm();
      this.saveStudentComponent.studentForm.patchValue({
        gender: student.gender
      })
      console.log(student)
    }
  }

  loadStudents() {
    this.studentService.getStudents().subscribe({
      next: (students) => {
        this.students = students;
      },
    });
  }

  addStudentAction() {
    this.saveStudentComponent?.studentForm.reset();
  }

  deleteStudentAction(student: Student) {
    const confirmDelete = confirm(`Are you sure you want to delete account of: ${student.name}`);
    if(confirmDelete) {
      this.studentService.deleteStudent(student.id).subscribe({
        next: (res) => {
          addToMessageService('success',  `Student ${student.name} deleted successfully`, `${res.message}`, this.messageService);
        },
        error: (err) => {
          addToMessageService('error',  `Student ${student.name} not deleted`, `${err.message}`, this.messageService);
        }
      });
    }
  }

  closeSaveStudentDialogAction(saveSubjectModal: HTMLDivElement) {
    saveSubjectModal.click();
  }

}
