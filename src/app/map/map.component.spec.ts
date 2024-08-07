import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MapComponent } from './map.component';
import { Point } from '../point.interface';
import { By } from '@angular/platform-browser';

describe('MapComponent', () => {
  let component: MapComponent;
  let fixture: ComponentFixture<MapComponent>;
  let point1: Point;
  let point2: Point;

  beforeEach(async () => {
    point1 = { id: 1, latitude: 40.73061, longitude: -73.935242, name: 'Point 1' };
    point2 = { id: 2, latitude: 34.052235, longitude: -118.243683, name: 'Point 2' };

    await TestBed.configureTestingModule({
      declarations: [MapComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(MapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize map correctly', () => {
    expect(component.map).toBeDefined();
    const mapElement = fixture.debugElement.query(By.css('#map'));
    expect(mapElement).toBeTruthy();
  });

  it('should update map when filteredPoints is set', () => {
    spyOn(component as any, 'updateMap').and.callThrough(); // Spy on private method

    component.filteredPoints = [point1, point2];
    fixture.detectChanges();

    expect((component as any).updateMap).toHaveBeenCalled();
    expect((component as any).vectorSource.getFeatures().length).toBe(2);
  });

  it('should zoom to point when selectedPoint is set', () => {
    spyOn(component as any, 'zoomToPoint').and.callThrough(); // Spy on private method

    component.selectedPoint = point1;
    fixture.detectChanges();

    expect((component as any).zoomToPoint).toHaveBeenCalledWith(point1);
  });

  it('should emit mapViewChanged when map view changes', () => {
    spyOn(component.mapViewChanged, 'emit');

    component.ngOnInit();
    const view = component.map?.getView();
    view?.setCenter([0, 0]); // Trigger map view change

    expect(component.mapViewChanged.emit).toHaveBeenCalled();
  });
});
