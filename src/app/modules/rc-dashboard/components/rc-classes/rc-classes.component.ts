import {Component, OnInit} from '@angular/core';
import {ClassLevel} from "../../../../models/dto/classlevel.model";
import {ClassLevelService} from "../../../../services/class-level.service";
import {MessageService} from "primeng/api";
import {addToMessageService} from "../../../../utils/message-service.util";

@Component({
  selector: 'app-rc-classes',
  templateUrl: './rc-classes.component.html',
  styleUrls: ['./rc-classes.component.scss']
})
export class RcClassesComponent implements OnInit {

  classLevels: ClassLevel[] = [];

  constructor(private classLevelService: ClassLevelService, private messageService: MessageService) {
  }

  ngOnInit(): void {
    this.loadClasses();
  }

  saveClassAction() {

  }

  loadClasses() {
    this.classLevelService.getClassLevels().subscribe({
      next: (classLevels: ClassLevel[]) => {
        this.classLevels = classLevels;
      },
      error: (error) => {
        addToMessageService('error', 'Error loading classes', `Server not responding.\n${error.message}`, this.messageService);
      }
    });
  }
}
