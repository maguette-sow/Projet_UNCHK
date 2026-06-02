import { TestBed } from '@angular/core/testing';

import { Insertion } from './insertion';

describe('Insertion', () => {
  let service: Insertion;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Insertion);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
