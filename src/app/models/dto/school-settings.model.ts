export interface SchoolSettings {
  id: number,
  school_name: string,
  curr_year_id: number,
  curr_term?: string,
  curr_seq_id: number,
  min_grade: number,
  max_grade: number,
  application_is_open: boolean
}
