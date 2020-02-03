import { TestBed } from '@angular/core/testing';

import { ConsultasServiceService } from './consultas-service.service';

describe('ConsultasServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ConsultasServiceService = TestBed.get(ConsultasServiceService);
    expect(service).toBeTruthy();
  });
});
