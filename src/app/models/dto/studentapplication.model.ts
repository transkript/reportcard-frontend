import {Student} from "./student.model";
import {SubjectRegistration} from "./subjectregistration.model";

export interface StudentApplication {
  id: number;
  created_at: Date;
  student_id: number;
  class_sub_id: number;
  year_id: number;
  number_of_subjects?: number;
}

export interface ApplicationRequest {
  class_id: number;
  year_id: number,
}

export interface ApplicationResponse {
  class_name: string;
  student: Student;
  application: StudentApplication;
  subject_regs: SubjectRegistration[]
}
