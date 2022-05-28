import {Component, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ClassLevel} from "../../../../models/dto/classlevel.model";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {ClassLevelSubService} from "../../../../services/class-level-sub.service";
import {ClassLevelSub} from "../../../../models/dto/classlevelsub.model";
import {addToMessageService} from "../../../../utils/message-service.util";
import {MessageService} from "primeng/api";
import {ClassLevelService} from "../../../../services/class-level.service";

@Component({
  selector: 'app-save-class',
  templateUrl: './save-class.component.html',
  styleUrls: ['./save-class.component.scss']
})
export class SaveClassComponent implements OnInit {
  classForm!: FormGroup;
  classLevel!: ClassLevel;
  classLevelSubs: ClassLevelSub[] = [];

  constructor(private fb: FormBuilder, private activeModal: NgbActiveModal,
              private classLevelService: ClassLevelService,
              private classLevelSubService: ClassLevelSubService, private msg: MessageService) {
  }

  get classLevelSubForms() {
    return this.classForm.get('classLevels') as FormArray;
  }

  ngOnInit(): void {
  }

  setupClassForm(classLevel: ClassLevel) {
    this.classLevel = classLevel;
    this.classForm = this.fb.group({
      name: [classLevel.name, Validators.required],
      classLevels: this.fb.array([])
    });

    this.classLevelSubService.getAllClassLevelSubsByClassLevelId(classLevel.id).subscribe({
      next: (classLevelSubs) => {
        this.classLevelSubs = classLevelSubs;

        classLevelSubs.forEach(classLevelSub => {
          this.classLevelSubForms.push(this.fb.group({
            subName: [classLevelSub.name, Validators.required]
          }))
        });
      }
    })
  }

  saveClassLevel() {
    this.classLevel.name = this.classForm.get('name')?.value;
    this.classLevelService.updateClassLevel(this.classLevel).subscribe({
      next: (res) => addToMessageService('success', 'Update successful', res.message, this.msg),
      error: (err) => addToMessageService('error', 'Update failed', err.message, this.msg)
    })
  }

  closeModal() {
    this.activeModal.close();
  }

  updateClassLevelSub(classLevelSubInput: HTMLInputElement, classLevelSub: ClassLevelSub) {
    console.log(classLevelSubInput.value);
    classLevelSub.name = classLevelSubInput.value;
    this.classLevelSubService.updateClassLevelSub(classLevelSub).subscribe({
      next: (res) => addToMessageService('success', 'Update successful', res.message, this.msg),
      error: (err) => addToMessageService('error', 'Update failed', err.message, this.msg)
    });
    this.setupClassForm(this.classLevel);
  }
}
