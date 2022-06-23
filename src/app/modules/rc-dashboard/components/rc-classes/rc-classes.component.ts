import {Component, OnInit} from '@angular/core';
import {ClassLevel} from "../../../../models/dto/class-level.model";
import {ClassLevelService} from "../../../../services/class-level.service";
import {MessageService} from "primeng/api";
import {addToMessageService} from "../../../../utils/message-service.util";
import {ClassLevelSubService} from "../../../../services/class-level-sub.service";
import {ClassLevelSub} from "../../../../models/dto/class-level-sub.model";
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
  }

  loadSections(): void {
    this.sectionService.getAll().subscribe({
      next: (sections) => {
        this.sections = sections;
        this.sectionModelId = this.sections[0].id;
        this.loadClasses();
      },
      error: (err) => addToMessageService(this.messageService, 'error', 'Error loading sections', `Connection refused. Check that the server is running!`)
    });
  }

  loadClasses(): void {
    const sectionId = this.sectionModelId;
    this.classes = [];
    this.classLevelService.getBySection(sectionId).subscribe({
      next: (classLevels: ClassLevel[]) => {
        classLevels.forEach((classLevel) => {
          this.loadClassSubs(classLevel);
        });
        this.sortClasses();
      },
      error: (error) => {
        addToMessageService(this.messageService, 'error', 'Error loading classes', `Server not responding.\n${error.message}`);
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
      this.classLevelService.delete(classLevel).subscribe({
        next: (res) => addToMessageService(this.messageService, 'warn', 'Delete successful', res),
        error: (err) => addToMessageService(this.messageService, 'error', 'Delete failed', 'There was a problem deleting this entity. Contact the admin.')
      })
    }
  }

  saveClassAction(classLevel?: ClassLevel) {
    const modalRef = this.modalService.open(SaveClassComponent, {
      size: 'lg',
      centered: true,
      backdrop: 'static',
      keyboard: true
    });
    const saveClassComponent: SaveClassComponent = modalRef.componentInstance;
    if (!classLevel) {
      saveClassComponent.resetClassLevel(this.sectionModelId);
      saveClassComponent.classForm.reset();
    } else {
      saveClassComponent.classLevel = classLevel;
      saveClassComponent.setupClassForm(classLevel);
    }
    modalRef.result.then(() => this.loadClasses());
  }

  private loadClassSubs(classLevel: ClassLevel): void {
    this.classLevelSubService.getAllByClassLevelId(classLevel.id).subscribe({
      next: (classLevelSubs) => {
        this.classes.push({classLevel: classLevel, classLevelSubs: classLevelSubs});
        this.sortClasses();
      },
      error: (error) => {
        addToMessageService(this.messageService, 'error', 'Error loading class subs', error.message);
      }
    });
  }
}

type RcClass = {
  classLevel: ClassLevel,
  classLevelSubs: ClassLevelSub[]
}
