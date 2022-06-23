import {Subject} from "./subject.model";
import {ClassLevelSub} from "./class-level-sub.model";
import {Grade} from "./grade.model";
import {Student} from "./student.model";

export interface ClassListRequest {
  year_id: number;
  class_id: number;
  subject_id: number;
  sequence_id: number;
}

export interface ClassListResponse {
  class_name: string;
  sequence_name: string;
  subject: Subject;
  class_level: ClassLevelSub;
  student_grades: { student: Student, grade: Grade }[];
}
