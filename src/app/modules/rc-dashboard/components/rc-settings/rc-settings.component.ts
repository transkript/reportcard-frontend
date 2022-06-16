import {Component, OnInit} from '@angular/core';
import {SchoolSettings} from "../../../../models/dto/schoolsettings.model";
import {SchoolSettingsService} from "../../../../services/school-settings.service";
import {addToMessageService} from "../../../../utils/message-service.util";
import {MessageService} from "primeng/api";
import {Sequence} from "../../../../models/dto/sequence.model";
import {SequenceService} from "../../../../services/sequence.service";
import {TermService} from "../../../../services/term.service";
import {AcademicYearService} from "../../../../services/academic-year.service";
import {Term} from "../../../../models/dto/term.model";
import {AcademicYear} from "../../../../models/dto/academicyear.model";
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

  private readonly defaultSettings: SchoolSettings;
  schoolSettingsValid: boolean =  false;

  settingsForm: FormGroup = this.fb.group({});
  schoolSettings: SchoolSettings;
  terms: Term[] = [];
  sequences: Sequence[] = [];
  academicYears: AcademicYear[] = [];

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
      id: -1, curr_seq_id: -1, curr_year_id: -1, curr_term_id: -1,
      application_is_open: false, min_grade: 0, max_grade: 0,
    };
    this.schoolSettings = this.defaultSettings;
    this.settingsForm = this.fb.group({
      applicationsOpen: [this.schoolSettings.application_is_open, Validators.required],
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

  private updateSchoolSettingsValid = (): void => {
    if(this.schoolSettings == null) {
      this.schoolSettingsValid = false;
      return
    }
    this.schoolSettingsValid = this.schoolSettings != this.defaultSettings && (
      this.schoolSettings.max_grade !== null && this.schoolSettings.min_grade !== null
    );
  }

  loadSettings(): void {
    this.schoolSettingsService.getSettings().subscribe({
      next: (schoolSettings) => {
        this.schoolSettings = schoolSettings;
        this.updateSchoolSettingsValid();
        this.loadSettingsInfo();
      }, error: (err) => {
        addToMessageService(this.msgService, 'error', 'Error', `${err.message}`)
      }
    });
  }

  loadSettingsInfo(): void {
    this.sequenceService.getAllSequences().subscribe({
      next: (sequences) => this.sequences = sequences,
    });
    this.termService.getAllTerms().subscribe({
      next: (terms) => this.terms = terms,
    });
    this.academicYearService.getAllAcademicYears().subscribe({
      next: (years) => this.academicYears = years,
    });
  }

  saveSettingsAction() {
    console.log(this.settingsForm.value);
  }

  loadDefaultDataAction() {
    this.defaultService.create().subscribe({
      next: (res) => addToMessageService(this.msgService, 'success', 'Success', 'Successfully loaded default data!\n'+res),
      error: (err) => {
        addToMessageService(this.msgService, 'error', 'Error', err.message);
      }
    })
  }

  deleteATSAction(entityName: ATSName, entity: ATS) {

  }

  editATSAction($event: MouseEvent, atsName: ATSName, entity: ATS, inputElement: HTMLInputElement) {
    const editButton = $event.target as HTMLButtonElement;

    if(inputElement.disabled) {
      editButton.textContent = "Save";
      inputElement.disabled = false;
    } else {
      editButton.textContent = "Edit";
      inputElement.disabled = true;
      if(entity.name !== inputElement.value) {
        entity.name = inputElement.value;
        switch (atsName) {
          case ATSName.YEAR: {
            console.log(entity)
            if(AcademicYearUtil.isValid(entity.name)) {
              this.academicYearService.updateAcademicYear(entity as AcademicYear).subscribe({
                next: (res) => {
                  addToMessageService(this.msgService, 'success', 'Update successful', res.message);
                  this.loadSettingsInfo();
                },
                error: (err) => addToMessageService(this.msgService, 'error', 'Update failed', err.message),
              });
            } else {
              addToMessageService(this.msgService, 'warn', 'Invalid Year', `The value '${entity.name}' is not valid!`);
            }

            break;
          }
          case ATSName.TERM: {
            this.termService.updateTerm(entity as Term).subscribe({
              next: (res) => {
                addToMessageService(this.msgService, 'success', 'Update successful', res.message);
                this.loadSettingsInfo();
              },
              error: (err) => addToMessageService(this.msgService, 'error', 'Update failed', err.message),
            });
            break;
          }
          case ATSName.SEQUENCE: {
            this.sequenceService.updateSequence(entity as Sequence).subscribe({
              next: (res) => {
                addToMessageService(this.msgService, 'success', 'Update successful', res.message);
                this.loadSettingsInfo();
              },
              error: (err) => addToMessageService(this.msgService, 'error', 'Update failed', err.message),
            });
            break;
          }
          default: addToMessageService(this.msgService, 'error', 'Error', 'Something has happened'); break;
        }
      }
    }
  }

  addATSAction($event: MouseEvent, atsName: ATSName, inputElement: HTMLInputElement) {
    const addButton = $event.target as HTMLButtonElement;
    if(inputElement.hidden) {
      inputElement.hidden = false;
      addButton.textContent = "Save";
    } else {
      let saved = false;

      const entityValue = inputElement.value;
      switch (atsName) {
        case ATSName.SEQUENCE: {
          const seq: Sequence = {id: -1, name: entityValue, term_id: -1}; // TODO fix this hell
          this.sequenceService.addSequence(seq).subscribe( {
            next: (res) => {
              addToMessageService(this.msgService, 'success', 'Success', res.message);
              this.loadSettingsInfo();
            },
            error: (err) => addToMessageService(this.msgService, 'error', 'Error', err.error.message)
          })
          break;
        }
        case ATSName.TERM: {
          const term: Term = {id: -1, name: entityValue};
          this.termService.addTerm(term).subscribe({
            next: (res) => {
              addToMessageService(this.msgService, 'success', 'Success', res.message);
              this.loadSettingsInfo();
            },
            error: (err) => addToMessageService(this.msgService, 'error', 'Error', err.error.message)
          });
          break;
        }
        case ATSName.YEAR: {
          if(AcademicYearUtil.isValid(entityValue)) {
            const year: AcademicYear = {id: -1, name: entityValue};
            this.academicYearService.addAcademicYear(year).subscribe({
              next: (res) => {
                addToMessageService(this.msgService, 'success', 'Success', res.message);
                this.loadSettingsInfo();
              },
              error: (err) => addToMessageService(this.msgService, 'error', 'Error', err.error.message)
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
}


