import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RcHomeComponent } from './rc-home.component';

describe('RcHomeComponent', () => {
  let component: RcHomeComponent;
  let fixture: ComponentFixture<RcHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RcHomeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RcHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
