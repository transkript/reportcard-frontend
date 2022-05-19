import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-rc-subjects',
  templateUrl: './rc-subjects.component.html',
  styleUrls: ['./rc-subjects.component.scss']
})
export class RcSubjectsComponent implements OnInit {

  constructor() {
  }

  ngOnInit(): void {
  }

  addSubject() {
    alert("Subjects");
    return undefined;
  }
}
