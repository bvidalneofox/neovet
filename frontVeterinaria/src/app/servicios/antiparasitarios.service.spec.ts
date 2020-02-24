import { TestBed } from '@angular/core/testing';

import { AntiparasitariosService } from './antiparasitarios.service';

describe('AntiparasitariosService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AntiparasitariosService = TestBed.get(AntiparasitariosService);
    expect(service).toBeTruthy();
  });
});
