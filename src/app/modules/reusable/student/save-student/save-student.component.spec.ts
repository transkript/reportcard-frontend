import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SaveStudentComponent } from './save-student.component';

describe('SaveStudentComponent', () => {
  let component: SaveStudentComponent;
  let fixture: ComponentFixture<SaveStudentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SaveStudentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SaveStudentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
