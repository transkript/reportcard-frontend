import {SchoolService} from "./services/school.service";
import {
  RC_ACADEMIC_YEAR_API_URL,
  RC_CLASS_LEVEL_API_URL,
  RC_CLASS_LEVEL_SUB_API_URL, RC_CLASS_LIST_API_URL, RC_GRADE_API_URL,
  RC_SCHOOL_API_URL,
  RC_SECTION_API_URL, RC_SEQUENCE_API_URL,
  RC_STUDENT_API_URL,
  RC_SUBJECT_API_URL, RC_SUBJECT_REGISTRATION_API_URL
} from "./app.constants";
import {StudentService} from "./services/student.service";
import {ClassLevelService} from "./services/class-level.service";
import {SectionService} from "./services/section.service";
import {SubjectService} from "./services/subject.service";
import {ClassLevelSubService} from "./services/class-level-sub.service";
import {AcademicYearService} from "./services/academic-year.service";
import {SequenceService} from "./services/sequence.service";
import {ClassListService} from "./services/class-list.service";
import {GradeService} from "./services/grade.service";
import {SubjectRegistrationService} from "./services/subject-registration.service";

const academicYearInjectables: Array<any> = [
  {provide: AcademicYearService, useClass: AcademicYearService},
  {provide: RC_ACADEMIC_YEAR_API_URL, useValue: RC_ACADEMIC_YEAR_API_URL},
];
const classLevelInjectables: Array<any> = [
  {provide: ClassLevelService, useClass: ClassLevelService},
  {provide: RC_CLASS_LEVEL_API_URL, useValue: RC_CLASS_LEVEL_API_URL}
];
const classLevelSubInjectables: Array<any> = [
  {provide: ClassLevelSubService, useClass: ClassLevelSubService},
  {provide: RC_CLASS_LEVEL_SUB_API_URL, useValue: RC_CLASS_LEVEL_SUB_API_URL}
];
const classListInjectables: Array<any> = [
  {provide: ClassListService, useClass: ClassListService},
  {provide: RC_CLASS_LIST_API_URL, useValue: RC_CLASS_LIST_API_URL}
];
const gradeInjectables: Array<any> = [
  {provide: GradeService, useClass: GradeService},
  {provide: RC_GRADE_API_URL, useValue: RC_GRADE_API_URL}
]
const schoolInjectables: Array<any> = [
  {provide: SchoolService, useClass: SchoolService},
  {provide: RC_SCHOOL_API_URL, useValue: RC_SCHOOL_API_URL}
];
const sectionInjectables: Array<any> = [
  {provide: SectionService, useClass: SectionService},
  {provide: RC_SECTION_API_URL, useValue: RC_SECTION_API_URL}
]
const sequenceInjectables: Array<any> = [
  {provide: SequenceService, useClass: SequenceService},
  {provide: RC_SEQUENCE_API_URL, useValue: RC_SEQUENCE_API_URL}
]
const studentInjectables: Array<any> = [
  {provide: StudentService, useClass: StudentService},
  {provide: RC_STUDENT_API_URL, useValue: RC_STUDENT_API_URL}
];
const subjectInjectables: Array<any> = [
  {provide: SubjectService, useClass: SubjectService},
  {provide: RC_SUBJECT_API_URL, useValue: RC_SUBJECT_API_URL}
];
const subjectRegistrationInjectables: Array<any> = [
  {provide: SubjectRegistrationService, useClass: SubjectRegistrationService},
  {provide: RC_SUBJECT_REGISTRATION_API_URL, useValue: RC_SUBJECT_REGISTRATION_API_URL}
];

export const injectables = [
  academicYearInjectables,
  classLevelInjectables,
  classLevelSubInjectables,
  classListInjectables,
  gradeInjectables,
  schoolInjectables,
  sectionInjectables,
  sequenceInjectables,
  studentInjectables,
  subjectInjectables,
  subjectRegistrationInjectables,
];
