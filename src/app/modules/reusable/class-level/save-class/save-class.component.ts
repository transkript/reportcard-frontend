import {Component, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ClassLevel} from "../../../../models/dto/class-level.model";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {ClassLevelSubService} from "../../../../services/class-level-sub.service";
import {ClassLevelSub} from "../../../../models/dto/class-level-sub.model";
import {addToMessageService} from "../../../../utils/message-service.util";
import {MessageService} from "primeng/api";
import {ClassLevelService} from "../../../../services/class-level.service";
import {SectionService} from "../../../../services/section.service";
import {Section} from "../../../../models/dto/section.model";

@Component({
  selector: 'app-save-class',
  templateUrl: './save-class.component.html',
  styleUrls: ['./save-class.component.scss']
})
export class SaveClassComponent implements OnInit {
  classForm: FormGroup;
  classLevel!: ClassLevel;
  section: Section;
  classLevelSubs: ClassLevelSub[] = [];

  constructor(private fb: FormBuilder, private activeModal: NgbActiveModal,
              private classLevelService: ClassLevelService, private sectionService: SectionService,
              private classLevelSubService: ClassLevelSubService, private msg: MessageService) {
    this.classForm = this.fb.group({});
    this.section = {id: -1, name: '', category: '', school_id: -1, number_of_class_levels: 0, number_of_subjects: 0}
  }

  get classLevelSubForms() {
    return this.classForm.get('classLevels') as FormArray;
  }

  ngOnInit(): void {
    this.setupClassForm(this.classLevel);
    this.setClassLevelSection(this.classLevel.section_id);
  }

  setClassLevelSection(sectionId: number) {
    this.sectionService.getById(sectionId).subscribe({
      next: (section: Section) => {
        this.section = section;
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  resetClassLevel(sectionId: number) {
    console.log(sectionId)
    this.classLevel = {id: -1, section_id: sectionId, name: '', classLevelSubs: []}
    this.setClassLevelSection(sectionId);
  }

  setupClassForm(classLevel: ClassLevel): void {
    this.classForm = this.fb.group({
      name: [classLevel.name, Validators.required],
      classLevels: this.fb.array([])
    });

    this.loadClassLevelSubs(classLevel);
  }

  loadClassLevelSubs(classLevel: ClassLevel): void {
    if (classLevel.id > 0) {
      this.classLevelSubService.getAllByClassLevelId(classLevel.id).subscribe({
        next: (classLevelSubs) => {
          this.classLevelSubs = classLevelSubs;
          classLevelSubs.forEach(classLevelSub => {
            this.classLevelSubForms.push(this.fb.group({
              subName: [classLevelSub.name, Validators.required]
            }))
          });
        },
        error: () => addToMessageService(this.msg, 'warn', 'Warning!', 'Unable to retrieve class level subs')
      });
    }
  }

  saveClassLevel() {
    this.classLevel.name = this.classForm.get('name')?.value;
    if (this.classLevel.id < 0) {
      console.log(this.classLevel.section_id)
      this.classLevelService.save(this.classLevel).subscribe({
        next: (res) => addToMessageService(this.msg, 'success', 'Save successful', res.message),
        error: (err) => addToMessageService(this.msg, 'error', 'Save failed', err.message)
      });
    } else {
      this.classLevelService.update(this.classLevel).subscribe({
        next: (res) => addToMessageService(this.msg, 'success', 'Update successful', res.message),
        error: (err) => addToMessageService(this.msg, 'error', 'Update failed', err.error.message)
      });
    }
  }

  closeModal() {
    this.activeModal.close();
  }

  saveClassLevelSub(classLevelSubInput: HTMLInputElement, classLevelSub: ClassLevelSub) {
    console.log(classLevelSubInput.value);
    classLevelSub.name = classLevelSubInput.value;
    if (classLevelSub.id < 0) {
      this.classLevelSubService.save(classLevelSub).subscribe({
        next: (res) => addToMessageService(this.msg, 'success', 'Save successful', res.message),
        error: (err) => addToMessageService(this.msg, 'error', 'Save failed', err.message)
      });
    } else {
      this.classLevelSubService.update(classLevelSub).subscribe({
        next: (res) => addToMessageService(this.msg, 'success', 'Update successful', res.message),
        error: (err) => addToMessageService(this.msg, 'error', 'Update failed', err.message)
      });
    }
  }

  deleteClassLevelSub(classLevelSub: ClassLevelSub) {
    const confirmDelete = confirm(`Are you sure you want to delete this class level sub: ${classLevelSub.name}`)
    if (confirmDelete) {
      this.classLevelSubService.delete(classLevelSub.id).subscribe({
        next: () => {
          addToMessageService(this.msg, 'warn', 'Delete successful', `Class level sub ${classLevelSub.name} has been deleted`)
          this.loadClassLevelSubs(this.classLevel);
        },
        error: (err) => addToMessageService(this.msg, 'error', 'Delete failed', err.message)
      });
    }
  }

  addClassLevelSubAction() {
    this.classLevelSubs.push({id: -1, name: '', class_level_id: this.classLevel.id})
  }
}
