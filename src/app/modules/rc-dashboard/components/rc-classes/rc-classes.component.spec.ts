import {ComponentFixture, TestBed} from '@angular/core/testing';

import {RcClassesComponent} from './rc-classes.component';

describe('RcClassesComponent', () => {
  let component: RcClassesComponent;
  let fixture: ComponentFixture<RcClassesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RcClassesComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RcClassesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
