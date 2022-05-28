import {Component, OnInit} from '@angular/core';
import {Subject} from "../../../../models/dto/subject.model";
import {SubjectService} from "../../../../services/subject.service";
import {MessageService} from "primeng/api";

@Component({
  selector: 'app-rc-subjects',
  templateUrl: './rc-subjects.component.html',
  styleUrls: ['./rc-subjects.component.scss']
})
export class RcSubjectsComponent implements OnInit {
  subjects: Subject[] = [];
  currentSubject: Subject = {id: -1, name: '', coefficient: 1, code: '', section_id: -1};

  constructor(private subjectService: SubjectService, private messageService: MessageService) {
  }

  ngOnInit(): void {
    this.subjects = []

    this.loadSubjects();
  }


  loadSubjects(): void {
    this.subjectService.getSubjects().subscribe({
      next: (subjects) => {
        this.subjects = subjects;
      },
      error: (error) => {
        console.log()
        this.messageService.add({
          severity: 'error', summary: 'Error connecting to server', detail: `${error.message}`
        })
      },
    })
  }

  deleteSubject(subject: Subject) {
    const confirmDelete: boolean = confirm("Are you sure want to delete " + subject.name);
    if (confirmDelete) {
      this.subjectService.deleteSubject(subject.id).subscribe({
        next: (res) => {
          console.log(res);
        },
        error: (err) => {
          console.log(err);
          this.messageService.add({
            severity: 'error', summary: 'Error', detail: err.message
          })
        },
      });
    }

  }

  closeSaveSubjectDialog($event: boolean, saveSubjectModal: HTMLDivElement) {
    if ($event) {
      saveSubjectModal.click()
    }
  }

  changeCurrentSubject(subject: Subject) {
    this.currentSubject = subject
  }

}
