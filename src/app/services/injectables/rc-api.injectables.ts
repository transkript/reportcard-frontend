import {SchoolService} from "../school.service";
import {
  RC_CLASS_LEVEL_API_URL,
  RC_SCHOOL_API_URL,
  RC_SECTION_API_URL,
  RC_STUDENT_API_URL,
  RC_SUBJECT_API_URL
} from "../../app.constants";
import {StudentService} from "../student.service";
import {ClassLevelService} from "../class-level.service";
import {SectionService} from "../section.service";
import {SubjectService} from "../subject.service";

const classLevelInjectables: Array<any> = [
  {provide: ClassLevelService, useClass: ClassLevelService},
  {provide: RC_CLASS_LEVEL_API_URL, useValue: RC_CLASS_LEVEL_API_URL}
];
const schoolInjectables: Array<any> = [
  {provide: SchoolService, useClass: SchoolService},
  {provide: RC_SCHOOL_API_URL, useValue: RC_SCHOOL_API_URL}
];
const sectionInjectables: Array<any> = [
  {provide: SectionService, useClass: SectionService},
  {provide: RC_SECTION_API_URL, useValue: RC_SECTION_API_URL}
]
const studentInjectables: Array<any> = [
  {provide: StudentService, useClass: StudentService},
  {provide: RC_STUDENT_API_URL, useValue: RC_STUDENT_API_URL}
];
const subjectInjectables: Array<any> = [
  {provide: SubjectService, useClass: SubjectService},
  {provide: RC_SUBJECT_API_URL, useValue: RC_SUBJECT_API_URL}
];

export const injectables = [
  classLevelInjectables, schoolInjectables, sectionInjectables, studentInjectables, subjectInjectables
]
