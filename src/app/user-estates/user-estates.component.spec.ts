import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserEstatesComponent } from './user-estates.component';

describe('UserEstatesComponent', () => {
  let component: UserEstatesComponent;
  let fixture: ComponentFixture<UserEstatesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserEstatesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserEstatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
