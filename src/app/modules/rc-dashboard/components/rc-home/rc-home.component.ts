import {Component, OnInit} from '@angular/core';
import {ClassLevelService} from "../../../../services/class-level.service";
import {SubjectService} from "../../../../services/subject.service";
import {SectionService} from "../../../../services/section.service";
import {StudentService} from "../../../../services/student.service";

@Component({
  selector: 'app-rc-home',
  templateUrl: './rc-home.component.html',
  styleUrls: ['./rc-home.component.scss'],
})
export class RcHomeComponent implements OnInit {
  title: string = 'Home';
  homeStats: { title: string; icon: string; value: number; link: string }[] = [];
  user: { name: string; email: string; role: string; } = {
    name: 'John Doe',
    email: 'johndoe@gmail.com',
    role: 'Admin',
  };

  constructor(
    private classLevelService: ClassLevelService,
    private sectionService: SectionService,
    private studentService: StudentService,
    private subjectService: SubjectService,
  ) {
    this.homeStats = [
      {title: 'Classes', icon: 'pi pi-user', value: 0, link: '/dashboard/classes'},
      {title: 'Sections', icon: 'pi pi-user', value: 0, link: '#'},
      {title: 'Students', icon: 'pi pi-user', value: 0, link: '/dashboard/students'},
      {title: 'Subjects', icon: 'pi pi-user', value: 0, link: '/dashboard/subjects'},
    ]

  }

  ngOnInit(): void {
    this.classLevelService.getAll().subscribe((classLevels) => {
      this.homeStats[0].value = classLevels.length;
    });
    this.sectionService.getAll().subscribe((sections) => {
      this.homeStats[1].value = sections.length;
    });
    this.studentService.getAll().subscribe((students) => {
      this.homeStats[2].value = students.length;
    });
    this.subjectService.getAll().subscribe((subjects) => {
      this.homeStats[3].value = subjects.length;
    })
  }

  homeStatsValueDisplay(value: number): string {
    let valueDisplay: string = value.toString();
    if (valueDisplay.length > 3) {
      valueDisplay = '999+'
    } else {
      const zeros = 3 - valueDisplay.length;
      for (let i = 0; i < zeros; i++) {
        valueDisplay = '0' + valueDisplay;
      }
    }
    return valueDisplay;
  }

  updateUser() {

  }

  openSettings() {
    alert("Settings has been clicked");
    return undefined;
  }
}
