export interface ClassLevel {
  id: number;
  name: string;
  section_id: number;
  classLevelSubs: ClassLevel[]
}
