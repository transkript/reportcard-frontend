import {Student} from "./student.model";
import {SubjectRegistration} from "./subject-registration.model";

export interface StudentApplication {
  id: number;
  created_at: string;
  updated_at?: string;
  repeating?: boolean;
  student_id: number;
  cls_id: number;
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
  subjects_regs: SubjectRegistration[]
}
