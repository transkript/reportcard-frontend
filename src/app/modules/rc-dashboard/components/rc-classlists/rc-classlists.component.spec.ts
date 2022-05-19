import {ComponentFixture, TestBed} from '@angular/core/testing';

import {RcClasslistsComponent} from './rc-classlists.component';

describe('RcClasslistsComponent', () => {
  let component: RcClasslistsComponent;
  let fixture: ComponentFixture<RcClasslistsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RcClasslistsComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RcClasslistsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
