import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-rc-body-intro',
  styleUrls: ['./rc-body-intro.component.scss'],
  template: `
    <div class="row py-4 p-2 mx-1 intro">
      <div class="col-md-9 d-flex">
        <span class="h4 align-self-center">{{title}}</span>
      </div>
      <div class="col-md-3">
        <button pButton type="button" label="{{buttonLabel}}" icon="{{buttonIcon}}" class="mr-0"></button>
      </div>
    </div>
  `,
})
export class RcBodyIntroComponent implements OnInit {

  @Input() title = "";
  @Input() buttonLabel = "";
  @Input() buttonIcon = "";
  @Input() buttonLink = "";

  constructor() { }

  ngOnInit(): void {
  }

}
