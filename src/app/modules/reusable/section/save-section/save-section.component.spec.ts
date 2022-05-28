import {ComponentFixture, TestBed} from '@angular/core/testing';

import {SaveSectionComponent} from './save-section.component';

describe('SaveSectionComponent', () => {
  let component: SaveSectionComponent;
  let fixture: ComponentFixture<SaveSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SaveSectionComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SaveSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
