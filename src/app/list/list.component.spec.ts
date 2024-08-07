import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListComponent } from './list.component';
import { PointsService } from '../points.service';
import { Point } from '../point.interface';
import { of } from 'rxjs';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

describe('ListComponent', () => {
  let component: ListComponent;
  let fixture: ComponentFixture<ListComponent>;
  let mockPointsService: jasmine.SpyObj<PointsService>;
  let points: Point[];

  beforeEach(async () => {
    points = [
      { id: 1, latitude: 40.73061, longitude: -73.935242, name: 'Point 1' },
      { id: 2, latitude: 34.052235, longitude: -118.243683, name: 'Point 2' },
    ];

    mockPointsService = jasmine.createSpyObj('PointsService', ['getPoints']);
    mockPointsService.getPoints.and.returnValue(of(points));

    await TestBed.configureTestingModule({
      imports: [CommonModule, FormsModule],
      declarations: [ListComponent],
      providers: [{ provide: PointsService, useValue: mockPointsService }],
    }).compileComponents();

    fixture = TestBed.createComponent(ListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize points correctly', () => {
    expect(component.filteredPoints.length).toBe(2);
    expect(component.filteredPoints.length).toBe(2);
  });

  it('should filter points based on search term', () => {
    component.searchTerm = 'Point 1';
    component.onSearchChange();
    fixture.detectChanges();

    expect(component.filteredPoints.length).toBe(1);
    expect(component.filteredPoints[0].name).toBe('Point 1');
  });

  it('should emit the filtered points', () => {
    spyOn(component.pointsFiltered, 'emit');
    component.searchTerm = 'Point 1';
    component.onSearchChange();

    expect(component.pointsFiltered.emit).toHaveBeenCalledWith([points[0]]);
  });

  it('should emit the selected point when clicked', () => {
    spyOn(component.pointSelected, 'emit');
    component.onSelectPoint(points[0]);

    expect(component.pointSelected.emit).toHaveBeenCalledWith(points[0]);
  });
});
