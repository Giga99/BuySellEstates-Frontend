import { TestBed } from '@angular/core/testing';

import { AdminAgentGuard } from './admin-agent.guard';

describe('AdminAgentGuard', () => {
  let guard: AdminAgentGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AdminAgentGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
