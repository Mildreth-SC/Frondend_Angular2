import { TestBed } from '@angular/core/testing';

import { EmpleadoServicios } from './empleado.servicios';

describe('EmpleadoServicios', () => {
  let service: EmpleadoServicios;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EmpleadoServicios);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
