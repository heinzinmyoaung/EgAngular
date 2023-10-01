import { TestBed } from '@angular/core/testing';

import { JwtInterceptorTsService } from './jwt-interceptor.ts.service';

describe('JwtInterceptorTsService', () => {
  let service: JwtInterceptorTsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(JwtInterceptorTsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
