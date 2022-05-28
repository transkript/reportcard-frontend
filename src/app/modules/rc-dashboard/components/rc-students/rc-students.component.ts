import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {Student} from "../../../../models/dto/student.model";
import {StudentService} from "../../../../services/student.service";
import {SaveStudentComponent} from "../../../reusable/student/save-student/save-student.component";
import {StringUtil} from "../../../../utils/string.util";
import {MessageService} from "primeng/api";
import {addToMessageService} from "../../../../utils/message-service.util";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-rc-students',
  templateUrl: './rc-students.component.html',
  styleUrls: ['./rc-students.component.scss']
})
export class RcStudentsComponent implements OnInit {
  students: Student[] = [];

  constructor(
    private modalService: NgbModal,
    private studentService: StudentService, private messageService: MessageService) {
  }

  ngOnInit(): void {
    this.loadStudents();
  }

  loadStudents() {
    this.studentService.getStudents().subscribe({
      next: (students) => {
        this.students = students;
      },
    });
  }

  saveStudentAction(student?: Student) {
    const modalRef = this.modalService.open(SaveStudentComponent, {
      size: 'lg',
      centered: true,
      backdrop: 'static',
      keyboard: true
    });
    const saveStudentComponent: SaveStudentComponent = modalRef.componentInstance;
    if(!student) {
      saveStudentComponent.resetStudent();
      saveStudentComponent.studentForm.reset();
    } else {
      saveStudentComponent.student = student;
      saveStudentComponent.setUpStudentForm();
    }
    modalRef.result.then((result) => {
      if (result) {
        this.loadStudents();
      }
    });
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
}
