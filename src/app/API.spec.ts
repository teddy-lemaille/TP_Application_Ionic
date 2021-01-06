import { TestBed } from '@angular/core/testing';

import { Drops } from './Drops';

describe('API', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: Drops = TestBed.get(Drops);
    expect(service).toBeTruthy();
  });
});
