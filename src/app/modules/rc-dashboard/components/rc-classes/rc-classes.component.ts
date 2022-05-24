import {Component, OnInit} from '@angular/core';
import {ClassLevel} from "../../../../models/dto/classlevel.model";
import {ClassLevelService} from "../../../../services/class-level.service";
import {MessageService} from "primeng/api";
import {addToMessageService} from "../../../../utils/message-service.util";
import {ClassLevelSubService} from "../../../../services/class-level-sub.service";
import {ClassLevelSub} from "../../../../models/dto/classlevelsub.model";

@Component({
  selector: 'app-rc-classes',
  templateUrl: './rc-classes.component.html',
  styleUrls: ['./rc-classes.component.scss']
})
export class RcClassesComponent implements OnInit {

  classes: {classLevel: ClassLevel, classLevelSubs: ClassLevelSub[]}[] = [];

  constructor(private classLevelService: ClassLevelService, private classLevelSubService: ClassLevelSubService,
              private messageService: MessageService) {
  }

  ngOnInit(): void {
    this.loadClasses();
  }

  saveClassAction() {

  }

  loadClasses() {
    this.classLevelService.getClassLevels().subscribe({
      next: (classLevels: ClassLevel[]) => {
        classLevels.forEach((classLevel) => {
          this.classLevelSubService.getAllClassLevelSubsByClassLevelId(classLevel.id).subscribe({
            next: (classLevelSubs) => {
              this.classes.push({classLevel: classLevel, classLevelSubs: classLevelSubs});
              console.log(this.classes);
            },
            error: (error) => {
              addToMessageService('error', 'Error loading class subs', error.error.message, this.messageService);
            }
          });
        });
        console.log(classLevels);
      },
      error: (error) => {
        addToMessageService('error', 'Error loading classes', `Server not responding.\n${error.message}`, this.messageService);
      }
    });
  }

  deleteClass(classLevel: ClassLevel) {

  }
}
