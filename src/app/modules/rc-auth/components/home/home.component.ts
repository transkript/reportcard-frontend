import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  imageSrc = 'assets/images/school log.png';
  imageAlt = 'School';
  avatarSrc = 'assets/images/Avata.png';

  loginForm!: FormGroup;


  constructor(private fb: FormBuilder) {

  }

  ngOnInit() {
    this.initLogForm();
  }

  initLogForm() {
    this.loginForm = this.fb.group({
      phone: ["", Validators.required],
      password: ["", Validators.required]
    })
  }

}
