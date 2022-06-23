import {Component, OnInit} from '@angular/core';
import {Subject} from "../../../../models/dto/subject.model";
import {SubjectService} from "../../../../services/subject.service";
import {MessageService} from "primeng/api";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {SaveSubjectComponent} from "../../../reusable/subject/save-subject/save-subject.component";
import {addToMessageService} from "../../../../utils/message-service.util";

@Component({
  selector: 'app-rc-subjects',
  templateUrl: './rc-subjects.component.html',
  styleUrls: ['./rc-subjects.component.scss']
})
export class RcSubjectsComponent implements OnInit {
  subjects: Subject[] = [];
  currentSubject: Subject = {id: -1, name: '', coefficient: 1, code: '', section_id: -1};

  constructor(
    private modalService: NgbModal,
    private subjectService: SubjectService, private msgService: MessageService) {
  }

  ngOnInit(): void {
    this.subjects = []

    this.loadSubjects();
  }


  loadSubjects(): void {
    this.subjectService.getAll().subscribe({
      next: (subjects) => this.subjects = subjects,
      error: (err) => addToMessageService(this.msgService, 'error', 'Error', err.message),
    })
  }

  saveSubjectAction(subject?: Subject) {
    const modalRef = this.modalService.open(SaveSubjectComponent, {
      size: 'lg', centered: true, backdrop: 'static', keyboard: true
    });
    const saveSubjectComponent: SaveSubjectComponent = modalRef.componentInstance;
    if (!subject) {
      saveSubjectComponent.resetSubject();
      saveSubjectComponent.subjectForm.reset();
    } else {
      saveSubjectComponent.subject = subject;
      saveSubjectComponent.setupSubjectForm();
    }
    modalRef.result.then(() => {
      this.loadSubjects();
    });
  }

  deleteSubjectAction(subject: Subject) {
    const confirmDelete: boolean = confirm("Are you sure want to delete " + subject.name);
    if (confirmDelete) {
      this.subjectService.delete(subject.id).subscribe({
        // TODO remove this logs
        next: (res) => {
          addToMessageService(this.msgService, 'error', 'Error', res.message);
          this.loadSubjects();
        },
        error: (err) => addToMessageService(this.msgService, 'error', 'Error', err.message)
      });
    }
  }
}
