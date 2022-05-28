import {Component, OnInit} from '@angular/core';
import {ClassLevel} from "../../../../models/dto/classlevel.model";
import {ClassLevelService} from "../../../../services/class-level.service";
import {MessageService} from "primeng/api";
import {addToMessageService} from "../../../../utils/message-service.util";
import {ClassLevelSubService} from "../../../../services/class-level-sub.service";
import {ClassLevelSub} from "../../../../models/dto/classlevelsub.model";
import {SectionService} from "../../../../services/section.service";
import {Section} from "../../../../models/dto/section.model";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {SaveClassComponent} from "../../../reusable/class-level/save-class/save-class.component";

@Component({
  selector: 'app-rc-classes',
  templateUrl: './rc-classes.component.html',
  styleUrls: ['./rc-classes.component.scss']
})
export class RcClassesComponent implements OnInit {

  classes: RcClass[] = [];
  sections: Section[] = [];
  sectionModelId: number = -1;

  constructor(private classLevelService: ClassLevelService, private classLevelSubService: ClassLevelSubService,
              private sectionService: SectionService, private messageService: MessageService,
              private modalService: NgbModal
  ) {
  }

  ngOnInit(): void {
    this.loadSections();
    // this.loadClasses();
  }

  saveClassAction() {

  }

  loadSections(): void {
    this.sectionService.getSections().subscribe({
      next: (sections) => {
        this.sections = sections;
        this.sectionModelId = this.sections[0].id;
      }
    });
  }

  loadClasses(): void {
    const sectionId = this.sectionModelId;
    this.classes = [];
    this.classLevelService.getClassLevelsBySectionId(sectionId).subscribe({
      next: (classLevels: ClassLevel[]) => {
        console.log(classLevels)
        classLevels.forEach((classLevel) => {
          this.loadClassSubs(classLevel);
        });
        this.sortClasses();
      },
      error: (error) => {
        addToMessageService('error', 'Error loading classes', `Server not responding.\n${error.message}`, this.messageService);
      }
    });
  }

  sortClasses(): void {
    this.classes.sort((a, b) => {
      return a.classLevel.name.localeCompare(b.classLevel.name);
    })
  }

  deleteClassAction(classLevel: ClassLevel) {
    const confirmDelete = confirm(`Are you sure you want to delete this class: ${classLevel.name}?`)
    if (confirmDelete) {
      this.classLevelService.deleteClassLevelById(classLevel).subscribe({
        next: (res) => addToMessageService('warn', 'Delete successful', res, this.messageService),
        error: (err) => addToMessageService('error', 'Delete failed', 'There was a problem deleting this entity. Contact the admin.', this.messageService)
      })
    }
  }

  editClassAction(classLevel?: ClassLevel) {
    const modalRef = this.modalService.open(SaveClassComponent, {
      size: 'lg',
      centered: true,
      backdrop: 'static',
      keyboard: true
    });
    const saveClassComponent: SaveClassComponent = modalRef.componentInstance;
    if (!classLevel) {

    } else {
      saveClassComponent.classLevel = classLevel;
      saveClassComponent.setupClassForm(classLevel);
    }
  }

  private loadClassSubs(classLevel: ClassLevel): void {
    this.classLevelSubService.getAllClassLevelSubsByClassLevelId(classLevel.id).subscribe({
      next: (classLevelSubs) => {
        this.classes.push({classLevel: classLevel, classLevelSubs: classLevelSubs});
        this.sortClasses();
      },
      error: (error) => {
        addToMessageService('error', 'Error loading class subs', error.error.message, this.messageService);
      }
    });
  }
}

type RcClass = {
  classLevel: ClassLevel,
  classLevelSubs: ClassLevelSub[]
}
