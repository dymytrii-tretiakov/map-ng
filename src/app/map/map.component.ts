import { Component, Input, OnInit } from '@angular/core';
import 'ol/ol.css';
import Map from 'ol/Map';
import View from 'ol/View';
import { OSM } from 'ol/source';
import TileLayer from 'ol/layer/Tile';
import { Point } from '../point.interface';
import { PointsService } from '../points.service';
import { Feature } from 'ol';
import { Point as PointGeometry } from 'ol/geom';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import Style from 'ol/style/Style';
import { fromLonLat } from 'ol/proj';
import Icon from 'ol/style/Icon';

@Component({
  selector: 'app-map',
  standalone: true,
  imports: [],
  templateUrl: './map.component.html',
  styleUrl: './map.component.scss',
})
export class MapComponent implements OnInit {
  public map?: Map;
  private vectorSource: VectorSource = new VectorSource();

  constructor(private pointsService: PointsService) {}

  @Input() set filteredPoints(points: Point[]) {
    this.updateMap(points); // Update map whenever filtered points are set
  }
  @Input() set selectedPoint(point: Point | null) {
    if (point) {
      this.zoomToPoint(point);
    }
  }

  ngOnInit() {
    this.map = new Map({
      target: 'map',
      layers: [
        new TileLayer({
          source: new OSM(),
        }),
        new VectorLayer({
          source: this.vectorSource,
        }),
      ],
      view: new View({
        center: [0, 0],
        zoom: 2,
      }),
    });

    this.pointsService.getPoints().subscribe((points) => {
      this.updateMap(points);
    });
  }

  private updateMap(points: Point[]) {
    this.vectorSource.clear();

    points.forEach(point => {
      const feature = new Feature({
        geometry: new PointGeometry(fromLonLat([point.longitude, point.latitude])),
        name: point.name,
      });

      feature.setStyle(
        new Style({
          image: new Icon({
            anchor: [0.5, 1],
            src: 'assets/marker.png',
          }),
        })
      );

      this.vectorSource.addFeature(feature);
    });
  }

  private zoomToPoint(point: Point) {
    this.map?.getView().animate({
      center: fromLonLat([point.longitude, point.latitude]),
      zoom: 10,
      duration: 1000,
    });
  }
}
