import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-rc-home',
  templateUrl: './rc-home.component.html',
  styleUrls: ['./rc-home.component.scss']
})
export class RcHomeComponent implements OnInit {
  title: string = 'Home';
  homeStats: {title: string; icon: string; value: number; link: string}[] = [];

  constructor() { }

  ngOnInit(): void {
    this.homeStats = [
      {title: 'Students', icon: 'pi pi-user', value: 24, link: '#'},
      {title: 'Subjects', icon: 'pi pi-user', value: 32, link: '#'},
      {title: 'Classes', icon: 'pi pi-user', value: 14, link: '#'},
      {title: 'Sections', icon: 'pi pi-user', value: 4, link: '#'},
    ]
  }

  homeStatsValueDisplay(value: number): string {
    let valueDisplay: string = value.toString();
    if(valueDisplay.length > 3) {
      valueDisplay = '999+'
    } else {
      const zeros = 3 - valueDisplay.length;
      for(let i = 0; i < zeros; i++) {
        valueDisplay = '0' + valueDisplay;
      }
    }
    return valueDisplay;
  }

}
