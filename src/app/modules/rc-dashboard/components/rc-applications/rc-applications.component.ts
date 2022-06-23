import {Component, OnInit} from '@angular/core';
import {ApplicationRequest, ApplicationResponse} from "../../../../models/dto/student-application.model";
import {AcademicYear} from "../../../../models/dto/academic-year.model";
import {AcademicYearService} from "../../../../services/academic-year.service";
import {MessageService} from "primeng/api";
import {ClassLevelService} from "../../../../services/class-level.service";
import {ClassLevelSubService} from "../../../../services/class-level-sub.service";
import {StudentApplicationService} from "../../../../services/student-application.service";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {
  SaveApplicationComponent
} from "../../../reusable/student-application/save-application/save-application.component";

@Component({
  selector: 'app-rc-applications',
  templateUrl: './rc-applications.component.html',
  styleUrls: ['./rc-applications.component.scss']
})
export class RcApplicationsComponent implements OnInit {

  applicationRequest: ApplicationRequest;
  applications: ApplicationResponse[] = [];

  academicYears: AcademicYear[] = [];

  classes: { sub_id: number, name: string }[] = []

  constructor(
    private modalService: NgbModal,
    private msgService: MessageService,
    private classService: ClassLevelService,
    private classSubService: ClassLevelSubService,
    private academicYearService: AcademicYearService,
    private studentApplicationService: StudentApplicationService) {
    this.applicationRequest = {year_id: -1, class_id: -1}
  }

  ngOnInit(): void {
    this.loadAcademicYears();
    this.loadClasses();
    const loadApplicationsTimeout = setTimeout(() => {
      if (this.applications.length > 0) {
        clearTimeout(loadApplicationsTimeout);
      } else {
        this.loadApplications();
      }
    });
  }

  loadAcademicYears() {
    this.academicYearService.getAll().subscribe({
      next: (years) => {
        this.academicYears = years;
        this.applicationRequest.year_id = this.academicYears[0].id;
      }
    });
  }

  loadClasses() {
    this.classService.getAll().subscribe({
      next: (classes) => classes.forEach((c) => this.classSubService.getAll().subscribe({
        next: (classSubs) => {
          classSubs.forEach((cs) => {
            this.classes.push({
              sub_id: cs.id,
              name: `${c.name} ${cs.name}`
            });
          });
          if (this.classes.length > 0) {
            this.applicationRequest.class_id = this.classes[0].sub_id;
          }
        }
      }))
    });
  }

  loadApplications() {
    if (this.applicationRequest.year_id > 0) {
      console.log(this.applicationRequest)
      this.studentApplicationService.getAllByRequest(this.applicationRequest).subscribe({
        next: (response) => this.applications = response
      })
    } else {
      this.applications = [];
    }
  }

  saveApplicationAction(application?: ApplicationResponse) {
    const modalRef = this.modalService.open(SaveApplicationComponent, {
      size: 'md', centered: true, backdrop: 'static', keyboard: true
    });
    const saveApplicationComponent: SaveApplicationComponent = modalRef.componentInstance;
    if (!application) {
      saveApplicationComponent.editing = false;
      saveApplicationComponent.resetApplication();
      saveApplicationComponent.applicationForm.reset();
    } else {
      saveApplicationComponent.editing = true;
      saveApplicationComponent.studentApplicationRes = application;
      saveApplicationComponent.setupApplicationForm();
    }
    modalRef.result.then(() => {
      this.loadApplications();
    })
  }
}
