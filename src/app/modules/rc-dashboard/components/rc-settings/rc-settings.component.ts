import {Component, OnInit} from '@angular/core';
import {SchoolSettings} from "../../../../models/dto/school-settings.model";
import {SchoolSettingsService} from "../../../../services/school-settings.service";
import {addToMessageService} from "../../../../utils/message-service.util";
import {MessageService} from "primeng/api";
import {Sequence} from "../../../../models/dto/sequence.model";
import {SequenceService} from "../../../../services/sequence.service";
import {TermService} from "../../../../services/term.service";
import {AcademicYearService} from "../../../../services/academic-year.service";
import {Term} from "../../../../models/dto/term.model";
import {AcademicYear} from "../../../../models/dto/academic-year.model";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {DefaultService} from "../../../../services/default.service";
import {AcademicYearUtil} from "../../../../utils/academic-year.util";

type ATS = AcademicYear | Term | Sequence;

enum ATSName {
  YEAR, TERM, SEQUENCE,
}

@Component({
  selector: 'app-rc-settings',
  templateUrl: './rc-settings.component.html',
  styleUrls: ['./rc-settings.component.scss']
})
export class RcSettingsComponent implements OnInit {

  schoolSettingsValid: boolean = false;
  settingsForm: FormGroup = this.fb.group({});
  schoolSettings: SchoolSettings;
  terms: Term[] = [];
  sequences: Sequence[] = [];
  academicYears: AcademicYear[] = [];
  private readonly defaultSettings: SchoolSettings;

  constructor(
    private fb: FormBuilder,
    private msgService: MessageService,
    private defaultService: DefaultService,
    private schoolSettingsService: SchoolSettingsService,
    private sequenceService: SequenceService,
    private termService: TermService,
    private academicYearService: AcademicYearService
  ) {
    this.defaultSettings = {
      id: -1, school_name: '',
      curr_seq_id: -1, curr_year_id: -1, curr_term: '',
      application_is_open: false, min_grade: 0, max_grade: 0,
    };
    this.schoolSettings = this.defaultSettings;
    this.settingsForm = this.fb.group({
      applicationsOpen: [this.schoolSettings.application_is_open, Validators.required],
      schoolName: ['', Validators.required],
      year: [0, Validators.required],
      term: [0, Validators.required],
      sequence: [0, Validators.required],
      minGrade: [0, Validators.min(0)],
      maxGrade: [0, Validators.compose([Validators.min(0), Validators.max(100)])]
    });

  }

  ngOnInit(): void {
    this.loadSettings();
  }

  patchSettingsForm(schoolSettings: SchoolSettings): void {
    if (schoolSettings == null) {
      schoolSettings = this.defaultSettings;
      if (this.sequences.length > 0) schoolSettings.curr_seq_id = this.sequences[0].id
      if (this.academicYears.length > 0) schoolSettings.curr_year_id = this.academicYears[0].id
    }
    this.settingsForm.patchValue({
      "applicationsOpen": schoolSettings.application_is_open,
      "schoolName": schoolSettings.school_name,
      "year": schoolSettings.curr_year_id,
      "sequence": schoolSettings.curr_seq_id,
      "minGrade": schoolSettings.min_grade,
      "maxGrade": schoolSettings.max_grade,
    });
  }

  loadSettings(): void {
    this.schoolSettingsService.get().subscribe({
      next: (schoolSettings) => {
        this.schoolSettings = schoolSettings;
        this.updateSchoolSettingsValid();
        this.patchSettingsForm(this.schoolSettings);
        this.loadSettingsInfo();
      }, error: (err) => {
        addToMessageService(this.msgService, 'error', 'Error', `${err.error.message}`)
      }
    });
  }

  loadSettingsInfo(): void {
    this.sequenceService.getAll().subscribe({
      next: (sequences) => this.sequences = sequences,
    });
    this.termService.getAll().subscribe({
      next: (terms) => this.terms = terms,
    });
    this.academicYearService.getAll().subscribe({
      next: (years) => this.academicYears = years,
    });
  }

  saveSettingsAction() {
    const settings: SchoolSettings = {
      id: this.schoolSettings ? this.schoolSettings.id : -1,
      school_name: this.settingsForm.get('schoolName')?.value,
      application_is_open: this.settingsForm.get('applicationsOpen')?.value,
      min_grade: this.settingsForm.get('minGrade')?.value,
      max_grade: this.settingsForm.get('maxGrade')?.value,
      curr_year_id: parseInt(this.settingsForm.get("year")?.value),
      curr_seq_id: parseInt(this.settingsForm.get("sequence")?.value),
    }

    const settingsValidRes = this.isValidSettings(settings);
    if (settingsValidRes.valid) {
      if (settings.id <= 0) {
        this.schoolSettingsService.save(settings).subscribe({
          next: () => addToMessageService(this.msgService, 'success', 'Saved', 'Settings saved successfully'),
          error: err => addToMessageService(this.msgService, 'error', 'Error', err.error.message),
          complete: () => this.loadSettings()
        });
      } else {
        this.schoolSettingsService.update(settings).subscribe({
          next: () => addToMessageService(this.msgService, 'success', 'Saved', 'Settings saved successfully'),
          error: err => addToMessageService(this.msgService, 'error', 'Error', err.error.message),
          complete: () => this.loadSettings()
        });
      }
    } else {
      for (let i = 0; i < settingsValidRes.errors.length; i++) {
        addToMessageService(this.msgService, 'warn', 'Invalid Settings', `Warning ${i + 1}: ${settingsValidRes.errors[i]}`)
      }
    }
  }

  loadDefaultDataAction() {
    this.defaultService.create().subscribe({
      next: (res) => addToMessageService(this.msgService, 'success', 'Success', 'Successfully loaded default data!\n' + res),
      error: (err) => {
        addToMessageService(this.msgService, 'error', 'Error', err.message);
      }
    })
  }

  deleteATSAction(entityName: ATSName, entity: ATS) {

  }

  editATSAction($event: MouseEvent, atsName: ATSName, entity: ATS, inputElement: HTMLInputElement) {
    const editButton = $event.target as HTMLButtonElement;

    if (inputElement.disabled) {
      editButton.textContent = "Save";
      inputElement.disabled = false;
    } else {
      editButton.textContent = "Edit";
      inputElement.disabled = true;
      if (entity.name !== inputElement.value) {
        entity.name = inputElement.value;
        switch (atsName) {
          case ATSName.YEAR: {
            console.log(entity)
            if (AcademicYearUtil.isValid(entity.name)) {
              this.academicYearService.update(entity as AcademicYear).subscribe({
                next: (res) => addToMessageService(this.msgService, 'success', 'Update successful', res.message),
                error: (err) => addToMessageService(this.msgService, 'error', 'Update failed', err.message),
                complete: () => this.loadSettingsInfo()
              });
            } else {
              addToMessageService(this.msgService, 'warn', 'Invalid Year', `The value '${entity.name}' is not valid!`);
            }

            break;
          }
          case ATSName.TERM: {
            this.termService.update(entity as Term).subscribe({
              next: (res) => addToMessageService(this.msgService, 'success', 'Update successful', res.message),
              error: (err) => addToMessageService(this.msgService, 'error', 'Update failed', err.message),
              complete: () => this.loadSettingsInfo()
            });
            break;
          }
          case ATSName.SEQUENCE: {
            this.sequenceService.update(entity as Sequence).subscribe({
              next: (res) => addToMessageService(this.msgService, 'success', 'Update successful', res.message),
              error: (err) => addToMessageService(this.msgService, 'error', 'Update failed', err.message),
              complete: () => this.loadSettingsInfo()
            });
            break;
          }
          default:
            addToMessageService(this.msgService, 'error', 'Error', 'Something has happened');
            break;
        }
      }
    }
  }

  addATSAction($event: MouseEvent, atsName: ATSName, inputElement: HTMLInputElement, seqTermAddInput?: HTMLSelectElement) {
    const addButton = $event.target as HTMLButtonElement;
    if (inputElement.hidden) {
      inputElement.hidden = false;
      addButton.textContent = "Save";
    } else {
      const entityValue = inputElement.value;
      switch (atsName) {
        case ATSName.SEQUENCE: {
          const termId = seqTermAddInput ? parseInt(seqTermAddInput.value) : -1;
          const seq: Sequence = {id: -1, name: entityValue, term_id: termId};
          if (seq.term_id > 0) {
            this.sequenceService.save(seq).subscribe({
              next: (res) => addToMessageService(this.msgService, 'success', 'Success', res.message),
              error: (err) => addToMessageService(this.msgService, 'error', 'Error', err.error.message),
              complete: () => this.loadSettingsInfo()
            });
          } else addToMessageService(this.msgService, 'warn', 'No term selected', 'Select a term first to save the sequence')
          break;
        }
        case ATSName.TERM: {
          const term: Term = {id: -1, name: entityValue};
          this.termService.save(term).subscribe({
            next: (res) => addToMessageService(this.msgService, 'success', 'Success', res.message),
            error: (err) => addToMessageService(this.msgService, 'error', 'Error', err.error.message),
            complete: () => this.loadSettingsInfo()
          });
          break;
        }
        case ATSName.YEAR: {
          if (AcademicYearUtil.isValid(entityValue)) {
            const year: AcademicYear = {id: -1, name: entityValue};
            this.academicYearService.save(year).subscribe({
              next: (res) => addToMessageService(this.msgService, 'success', 'Success', res.message),
              error: (err) => addToMessageService(this.msgService, 'error', 'Error', err.error.message),
              complete: () => this.loadSettingsInfo()
            });
          } else {
            addToMessageService(this.msgService, 'warn', 'Invalid Year', `The value '${entityValue}' is not valid!`);
          }
          break;
        }
      }

      inputElement.hidden = true;
      addButton.textContent = "Add";
    }
  }

  // TODO move this to a util module
  getTermBySequenceId(sequenceId: number): Term {
    const sequence = this.sequences.find(seq => seq.id == sequenceId);

    let res: Term[] = [];
    if (sequence) {
      res = this.terms.filter((term) => {
        return sequence.term_id == term.id
      });
    }

    switch (res.length) {
      case 0:
        return {id: -1, name: 'None'};
      case 1:
        return res[0];
      default:
        return {id: -1, name: 'None'};
    }
  }

  private updateSchoolSettingsValid = (): void => {
    if (this.schoolSettings == null) {
      this.schoolSettingsValid = false;
      return
    }
    this.schoolSettingsValid = this.schoolSettings != this.defaultSettings && (
      this.schoolSettings.max_grade !== null && this.schoolSettings.min_grade !== null
    );
  }

  private isValidSettings = (settings: SchoolSettings): { valid: boolean, errors: string[] } => {
    console.log(settings)
    const errs: string[] = [];
    const term: Term = this.getTermBySequenceId(settings.curr_seq_id);
    const sequencesByTerm = this.sequences.filter(seq => seq.term_id == term.id);
    const sequenceValid: boolean = sequencesByTerm.find(seq => seq.id == settings.curr_seq_id) != undefined;

    {
      if (!sequenceValid) {
        errs.push("This sequence is not compatible with this term");
      }
    }

    const gradeValid = settings.min_grade < settings.max_grade;

    {
      if (!gradeValid) {
        errs.push("Maximum grade score must be higher than the minimum grade score");
      }
    }

    return {valid: sequenceValid && gradeValid, errors: errs};
  }
}


