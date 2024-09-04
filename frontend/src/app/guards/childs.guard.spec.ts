import { TestBed } from '@angular/core/testing';
import { CanActivateChildFn } from '@angular/router';

import { childsGuard } from './childs.guard';

describe('childsGuard', () => {
  const executeGuard: CanActivateChildFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => childsGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
