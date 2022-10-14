import { TestBed } from '@angular/core/testing';

import { NavitemsService } from './navitems.service';

describe('NavitemsService', () => {
  let service: NavitemsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NavitemsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
