// TODO fix endpoints
import {environment} from "../environments/environment";

const RC_SERVER_URL = environment.serverUrl;

export const RC_ACADEMIC_YEAR_API_URL = `${RC_SERVER_URL}/api/academic_year`;

export const RC_CLASS_LEVEL_API_URL = `${RC_SERVER_URL}/api/class_level`;

export const RC_CLASS_LEVEL_SUB_API_URL = `${RC_SERVER_URL}/api/class_level_sub`;

export const RC_CLASS_LIST_API_URL = `${RC_SERVER_URL}/api/class_list`;

export const RC_DEFAULT_API_URL = `${RC_SERVER_URL}/api/default`;

export const RC_GRADE_API_URL = `${RC_SERVER_URL}/api/grade`;

export const RC_SCHOOL_API_URL = `${RC_SERVER_URL}/api/school`;

export const RC_SECTION_API_URL = `${RC_SERVER_URL}/api/section`;

export const RC_SEQUENCE_API_URL = `${RC_SERVER_URL}/api/sequence`;

export const RC_SETTINGS_API_URL = `${RC_SERVER_URL}/api/settings`;

export const RC_STUDENT_API_URL = `${RC_SERVER_URL}/api/student`;

export const RC_STUDENT_APPLICATION_API_URL = `${RC_SERVER_URL}/api/student-application`;

export const RC_SUBJECT_API_URL = `${RC_SERVER_URL}/api/subject`;

export const RC_SUBJECT_REGISTRATION_API_URL = `${RC_SERVER_URL}/api/subject_registration`;

export const RC_TERM_API_URL = `${RC_SERVER_URL}/api/term`;
