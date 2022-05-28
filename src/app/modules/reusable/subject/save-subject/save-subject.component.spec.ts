import {ComponentFixture, TestBed} from '@angular/core/testing';

import {SaveSubjectComponent} from './save-subject.component';

describe('SaveSubjectComponent', () => {
  let component: SaveSubjectComponent;
  let fixture: ComponentFixture<SaveSubjectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SaveSubjectComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SaveSubjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
