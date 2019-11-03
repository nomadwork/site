import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogEstablishmentsComponent } from './dialog-establishments.component';

describe('DialogEstablishmentsComponent', () => {
  let component: DialogEstablishmentsComponent;
  let fixture: ComponentFixture<DialogEstablishmentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogEstablishmentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogEstablishmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
