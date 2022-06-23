import {ComponentFixture, TestBed} from '@angular/core/testing';

import {RcApplicationsComponent} from './rc-applications.component';

describe('RcApplicationsComponent', () => {
  let component: RcApplicationsComponent;
  let fixture: ComponentFixture<RcApplicationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RcApplicationsComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RcApplicationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
