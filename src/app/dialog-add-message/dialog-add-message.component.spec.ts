import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogAddMessageComponent } from './dialog-add-message.component';

describe('DialogAddMessageComponent', () => {
  let component: DialogAddMessageComponent;
  let fixture: ComponentFixture<DialogAddMessageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogAddMessageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogAddMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
