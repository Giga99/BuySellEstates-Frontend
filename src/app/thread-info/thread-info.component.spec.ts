import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThreadInfoComponent } from './thread-info.component';

describe('ThreadInfoComponent', () => {
  let component: ThreadInfoComponent;
  let fixture: ComponentFixture<ThreadInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ThreadInfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ThreadInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
