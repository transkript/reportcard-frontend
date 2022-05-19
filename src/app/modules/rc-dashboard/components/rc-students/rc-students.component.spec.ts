import {ComponentFixture, TestBed} from '@angular/core/testing';

import {RcStudentsComponent} from './rc-students.component';

describe('RcStudentsComponent', () => {
  let component: RcStudentsComponent;
  let fixture: ComponentFixture<RcStudentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RcStudentsComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RcStudentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
