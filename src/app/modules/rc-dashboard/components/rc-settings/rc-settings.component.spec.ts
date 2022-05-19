import {ComponentFixture, TestBed} from '@angular/core/testing';

import {RcSettingsComponent} from './rc-settings.component';

describe('RcSettingsComponent', () => {
  let component: RcSettingsComponent;
  let fixture: ComponentFixture<RcSettingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RcSettingsComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RcSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
