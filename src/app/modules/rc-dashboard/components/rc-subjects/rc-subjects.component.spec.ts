import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RcSubjectsComponent } from './rc-subjects.component';

describe('RcSubjectsComponent', () => {
  let component: RcSubjectsComponent;
  let fixture: ComponentFixture<RcSubjectsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RcSubjectsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RcSubjectsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
