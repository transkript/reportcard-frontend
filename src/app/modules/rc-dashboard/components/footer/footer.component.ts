import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  styleUrls: ['./footer.component.scss'],
  template: `
    <div class="d-flex">
      <div class="">
        Copyright &copy; {{ currentYear }}
      </div>
      <span class="spacer"></span>
      <div class="">
        <button pButton pRipple type="button" icon="pi pi-facebook" class="p-button-rounded"></button>&nbsp;
        <button pButton pRipple type="button" icon="pi pi-twitter" class="p-button-rounded"></button>&nbsp;
        <button pButton pRipple type="button" icon="pi pi-instagram" class="p-button-rounded"></button>&nbsp;
        <button pButton pRipple type="button" icon="pi pi-github" class="p-button-rounded"></button>&nbsp;
      </div>
    </div>
  `
})
export class FooterComponent implements OnInit {
  currentYear: number = new Date().getFullYear();

  constructor() { }

  ngOnInit(): void {
  }

}
