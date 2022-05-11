import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  styleUrls: ['./footer.component.scss'],
  template: `
    <p>footer works!</p>
  `
})
export class FooterComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
