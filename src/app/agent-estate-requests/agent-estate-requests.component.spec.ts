import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgentEstateRequestsComponent } from './agent-estate-requests.component';

describe('AgentEstateRequestsComponent', () => {
  let component: AgentEstateRequestsComponent;
  let fixture: ComponentFixture<AgentEstateRequestsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgentEstateRequestsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AgentEstateRequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
