import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogPlaceDetailComponent } from './dialog-place-detail.component';

describe('DialogPlaceDetailComponent', () => {
  let component: DialogPlaceDetailComponent;
  let fixture: ComponentFixture<DialogPlaceDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogPlaceDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogPlaceDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
