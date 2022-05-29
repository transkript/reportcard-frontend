import {Component, OnInit} from '@angular/core';
import {ClassListRequest, ClassListResponse} from "../../../../models/dto/classlist.model";
import {AcademicYearService} from "../../../../services/academic-year.service";
import {ClassLevelService} from "../../../../services/class-level.service";
import {SubjectService} from "../../../../services/subject.service";
import {SequenceService} from "../../../../services/sequence.service";
import {AcademicYear} from "../../../../models/dto/academicyear.model";
import {Subject} from "../../../../models/dto/subject.model";
import {Sequence} from "../../../../models/dto/sequence.model";
import {ClassLevelSubService} from "../../../../services/class-level-sub.service";
import {ClassListService} from "../../../../services/class-list.service";
import {Grade} from "../../../../models/dto/grade.model";
import {GradeService} from "../../../../services/grade.service";
import {MessageService} from "primeng/api";
import {addToMessageService} from "../../../../utils/message-service.util";
import {Student} from "../../../../models/dto/student.model";
import {SubjectRegistrationService} from "../../../../services/subject-registration.service";
import {StudentService} from "../../../../services/student.service";
import {Observable} from "rxjs";

@Component({
  selector: 'app-rc-classlists',
  templateUrl: './rc-classlists.component.html',
  styleUrls: ['./rc-classlists.component.scss']
})
export class RcClasslistsComponent implements OnInit {

  classListRequest: ClassListRequest;
  classListResponse: ClassListResponse;

  classes: { id: number, name: string }[] = [];
  academicYears: AcademicYear[] = [];
  subjects: Subject[] = [];
  sequences: Sequence[] = [];
  classListColumns: {field: string; header: string;}[] = [];
  studentInfos: {student: Student; grade: Grade}[] = [];


  constructor(
    private yearService: AcademicYearService,
    private classLevelService: ClassLevelService,
    private classLevelSubService: ClassLevelSubService,
    private subjectService: SubjectService,
    private sequenceService: SequenceService,
    private classListService: ClassListService,
    private gradeService: GradeService,
    private subjectRegistrationService: SubjectRegistrationService,
    private studentService: StudentService,
    private msg: MessageService
  ) {
    this.classListRequest = {year_id: -1, class_id: -1, subject_id: -1, sequence_id: -1};
    this.classListResponse = {
      class_level: {id: -1, class_level_id: -1, name: ''},
      subject: {id: -1, name: '', code: '', coefficient: 0, section_id: -1},
      class_name: '',
      sequence_name: '',
      grades: []
    };
    this.classListColumns = [
      {field: 'student', header: 'Student'},
      {field: 'grade', header: 'Grade'},
      {field: 'remarks', header: 'Remarks'},
    ]
  }

  ngOnInit(): void {
    this.loadClasses();
    this.loadAcademicYears();
    this.loadSubjects();
    this.loadSequences();
  }

  loadClasses() {
    this.classLevelSubService.getAllClassLevelSubs().subscribe({
      next: (classLevelSubs) => {
        classLevelSubs.forEach(classSub => {
          this.classLevelService.getClassLevelById(classSub.class_level_id).subscribe({
            next: (classLevel) => {
              this.classes.push({id: classSub.id, name: `${classLevel.name} - ${classSub.name}`});
              this.classes.sort((a, b) => {
                if(a.name < b.name) return -1;
                if(a.name > b.name) return 1;
                return 0;
              });
              this.classListRequest.class_id = this.classes[0].id;
            }
          });
        });
      }
    });
  }
  loadAcademicYears() {
    this.yearService.getAllAcademicYears().subscribe({
      next: (years) => {
        this.academicYears = years;
        this.classListRequest.year_id = this.academicYears[0].id;
      }
    });
  }
  loadSubjects() {
    this.subjectService.getSubjects().subscribe({
      next: (subjects) => {
        this.subjects = subjects;
        this.classListRequest.subject_id = this.subjects[0].id;
      }
    });
  }
  loadSequences() {
    this.sequenceService.getAllSequences().subscribe({
      next: (sequences) => {
        this.sequences = sequences;
        this.classListRequest.sequence_id = this.sequences[0].id;
      }
    });
  }

  loadGrades() {
    const req = this.classListRequest;
    if(!(req.year_id < 0 || req.class_id < 0 || req.subject_id < 0 || req.sequence_id < 0)) {
      this.classListService.getClassList(req).subscribe({
        next: (classList) => {
          this.classListResponse = classList;
          this.studentInfos = [];
          classList.grades.forEach((grade) => {
            this.subjectRegistrationService.getSubjectRegistration(grade.registration_id).subscribe({
              next: (subReg) => {
                this.studentService.getStudentById(subReg.student_id).subscribe({
                  next: (student) => {
                    this.studentInfos.push({student: student, grade: grade})
                  },
                })
              }
            });
          });
        }
      });
    }
  }

  saveGrade(grade: Grade, gradeInput: HTMLInputElement) {
    const newScore = this.getGradeInputValue(gradeInput);
    console.log(newScore)
    if(newScore >= 0 && newScore <= 20) {
      if(grade.score) {
        grade.score = newScore;
        this.gradeService.updateGrade(grade).subscribe({
          next: (res) => {
            addToMessageService(this.msg, 'success', 'Update grade successfully', res.message)
            this.loadGrades();
          },
          error: (err) => addToMessageService(this.msg, 'error', 'Update grade failed', err.message)
        });
      } else {
        grade.score = newScore
        this.gradeService.addGrade(grade).subscribe({
          next: (res) => {
            addToMessageService(this.msg, 'success', 'Add grade successfully', res.message)
            this.loadGrades();
          },
          error: (err) => addToMessageService(this.msg, 'error', 'Add grade failed', err.message)
        });
      }
    } else {
      alert(`Cannot add this grade because it falls out of the range [0-20]: ${newScore}`);
    }
  }

  getGradeInputValue(gradeInput: HTMLInputElement): number {
    return parseFloat(gradeInput.value);
  }

  gradeInputValid(gradeInput: HTMLInputElement) {
    const gradeInputValue = this.getGradeInputValue(gradeInput);
    return gradeInputValue >= 0 || gradeInputValue <= 20;
  }

}


