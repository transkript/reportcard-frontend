import {ComponentFixture, TestBed} from '@angular/core/testing';

import {SaveApplicationComponent} from './save-application.component';

describe('SaveApplicationComponent', () => {
  let component: SaveApplicationComponent;
  let fixture: ComponentFixture<SaveApplicationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SaveApplicationComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SaveApplicationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
