import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClientModule } from '@angular/common/http';
import { AdminService } from './admin.service';
import { RouterTestingModule } from '@angular/router/testing';

describe('AdminService', () => {
  let service: AdminService;

  beforeEach(() => {
    TestBed.configureTestingModule({ 
      imports: [
      HttpClientModule,
      HttpClientTestingModule,
      RouterTestingModule
    ],
  });
    service = TestBed.inject(AdminService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
