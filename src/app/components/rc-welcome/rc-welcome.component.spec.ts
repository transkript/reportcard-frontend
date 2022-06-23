import {ComponentFixture, TestBed} from '@angular/core/testing';

import {RcWelcomeComponent} from './rc-welcome.component';

describe('RcWelcomeComponent', () => {
  let component: RcWelcomeComponent;
  let fixture: ComponentFixture<RcWelcomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RcWelcomeComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RcWelcomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
