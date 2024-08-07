import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { ListComponent } from './list/list.component';
import { MapComponent } from './map/map.component';
import { Point } from './point.interface';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let point1: Point;
  let point2: Point;

  beforeEach(async () => {
    point1 = {
      id: 1,
      latitude: 40.73061,
      longitude: -73.935242,
      name: 'Point 1',
    };
    point2 = {
      id: 2,
      latitude: 34.052235,
      longitude: -118.243683,
      name: 'Point 2',
    };

    await TestBed.configureTestingModule({
      declarations: [AppComponent, ListComponent, MapComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with an empty filteredPoints array', () => {
    expect(component.filteredPoints).toEqual([]);
  });

  it('should initialize with a null selectedPoint', () => {
    expect(component.selectedPoint).toBeNull();
  });

  it('should update filteredPoints when onPointsFiltered is called', () => {
    component.onPointsFiltered([point1, point2]);
    expect(component.filteredPoints.length).toBe(2);
    expect(component.filteredPoints).toEqual([point1, point2]);
  });

  it('should update selectedPoint when onPointSelected is called', () => {
    component.onPointSelected(point1);
    expect(component.selectedPoint).toEqual(point1);
  });

  it('should clear selectedPoint when onMapViewChanged is called', () => {
    component.onPointSelected(point1); // Set a selected point first
    component.onMapViewChanged();
    expect(component.selectedPoint).toBeNull();
  });

  it('should pass filteredPoints to MapComponent', () => {
    component.onPointsFiltered([point1]);
    fixture.detectChanges();

    const mapComponent = fixture.debugElement.query(
      By.directive(MapComponent)
    ).componentInstance;
    expect(mapComponent.filteredPoints).toEqual([point1]);
  });

  it('should pass selectedPoint to MapComponent', () => {
    component.onPointSelected(point1);
    fixture.detectChanges();

    const mapComponent = fixture.debugElement.query(
      By.directive(MapComponent)
    ).componentInstance;
    expect(mapComponent.selectedPoint).toEqual(point1);
  });

  it('should call onPointsFiltered when pointsFiltered event is emitted from ListComponent', () => {
    spyOn(component, 'onPointsFiltered');
    const listComponentDebug: DebugElement = fixture.debugElement.query(
      By.directive(ListComponent)
    );
    const listComponent = listComponentDebug.componentInstance as ListComponent;

    listComponent.pointsFiltered.emit([point1, point2]);
    expect(component.onPointsFiltered).toHaveBeenCalledWith([point1, point2]);
  });

  it('should call onPointSelected when pointSelected event is emitted from ListComponent', () => {
    spyOn(component, 'onPointSelected');
    const listComponentDebug: DebugElement = fixture.debugElement.query(
      By.directive(ListComponent)
    );
    const listComponent = listComponentDebug.componentInstance as ListComponent;

    listComponent.pointSelected.emit(point1);
    expect(component.onPointSelected).toHaveBeenCalledWith(point1);
  });

  it('should call onMapViewChanged when mapViewChanged event is emitted from MapComponent', () => {
    spyOn(component, 'onMapViewChanged');
    const mapComponentDebug: DebugElement = fixture.debugElement.query(
      By.directive(MapComponent)
    );
    const mapComponent = mapComponentDebug.componentInstance as MapComponent;

    mapComponent.mapViewChanged.emit();
    expect(component.onMapViewChanged).toHaveBeenCalled();
  });
});
