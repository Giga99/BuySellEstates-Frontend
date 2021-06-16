import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgentAllEstatesComponent } from './agent-all-estates.component';

describe('AgentAllEstatesComponent', () => {
  let component: AgentAllEstatesComponent;
  let fixture: ComponentFixture<AgentAllEstatesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgentAllEstatesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AgentAllEstatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
