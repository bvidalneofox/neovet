import { TestBed } from '@angular/core/testing';

import { HospitalizacionesService } from './hospitalizaciones.service';

describe('HospitalizacionesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: HospitalizacionesService = TestBed.get(HospitalizacionesService);
    expect(service).toBeTruthy();
  });
});
