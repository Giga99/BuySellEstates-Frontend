import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllAgreedOffersComponent } from './all-agreed-offers.component';

describe('AllAgreedOffersComponent', () => {
  let component: AllAgreedOffersComponent;
  let fixture: ComponentFixture<AllAgreedOffersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllAgreedOffersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AllAgreedOffersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
