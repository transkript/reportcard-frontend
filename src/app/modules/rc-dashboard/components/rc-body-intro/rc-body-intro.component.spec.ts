import {ComponentFixture, TestBed} from '@angular/core/testing';

import {RcBodyIntroComponent} from './rc-body-intro.component';

describe('RcBodyIntroComponent', () => {
  let component: RcBodyIntroComponent;
  let fixture: ComponentFixture<RcBodyIntroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RcBodyIntroComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RcBodyIntroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
