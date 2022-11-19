import { TestBed } from '@angular/core/testing';

import { CategoryCompetenceService } from './category-competence.service';

describe('CategoryCompetenceService', () => {
  let service: CategoryCompetenceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CategoryCompetenceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
