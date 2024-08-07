import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MapComponent } from './map/map.component';
import { ListComponent } from "./list/list.component";
import { Point } from './point.interface';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MapComponent, ListComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  public filteredPoints: Point[] = [];
  public selectedPoint: Point | null = null;

  onPointsFiltered(points: Point[]) {
    this.filteredPoints = points;
  }

  onPointSelected(point: Point) {
    this.selectedPoint = point;
  }

  onMapViewChanged() {
    this.selectedPoint = null; 
  }

  title = 'Map';
}
