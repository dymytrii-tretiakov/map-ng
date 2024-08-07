import { TestBed } from '@angular/core/testing';
import { PointsService } from './points.service';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { Point } from './point.interface';

describe('PointsService', () => {
  let service: PointsService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [PointsService, provideHttpClientTesting()],
    });

    service = TestBed.inject(PointsService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify(); // Ensure that no unmatched requests are outstanding
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should retrieve points from the API via GET', () => {
    const mockPoints: Point[] = [
      { id: 1, latitude: 40.73061, longitude: -73.935242, name: 'Point 1' },
      { id: 2, latitude: 34.052235, longitude: -118.243683, name: 'Point 2' },
    ];

    service.getPoints().subscribe((points) => {
      expect(points.length).toBe(2);
      expect(points).toEqual(mockPoints);
    });

    const req = httpMock.expectOne(service['baseUrl']); // Match the request to the base URL
    expect(req.request.method).toBe('GET');
    req.flush(mockPoints);
  });
});
