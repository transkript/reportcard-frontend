import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashbodyComponent } from './dashbody.component';

describe('DashbodyComponent', () => {
  let component: DashbodyComponent;
  let fixture: ComponentFixture<DashbodyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashbodyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashbodyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
