import {ComponentFixture, TestBed} from '@angular/core/testing';

import {SaveClassComponent} from './save-class.component';

describe('SaveClassComponent', () => {
  let component: SaveClassComponent;
  let fixture: ComponentFixture<SaveClassComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SaveClassComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SaveClassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
