import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import { OSM } from 'ol/source';
import { Feature } from 'ol';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import { Point as PointGeometry } from 'ol/geom';
import Style from 'ol/style/Style';
import Icon from 'ol/style/Icon';
import { fromLonLat } from 'ol/proj';
import { Point } from '../point.interface';
import { PointsService } from '../points.service';

@Component({
  selector: 'app-map',
  standalone: true,
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements OnInit {
  public map?: Map;
  private vectorSource = new VectorSource();

  @Output() mapViewChanged = new EventEmitter<void>();

  @Input() set filteredPoints(points: Point[]) {
    this.updateMap(points);
  }

  @Input() set selectedPoint(point: Point | null) {
    if (point) {
      this.zoomToPoint(point);
    }
  }

  constructor(private pointsService: PointsService) {}

  ngOnInit() {
    this.initializeMap();
    this.setupMapViewListeners();
    this.pointsService
      .getPoints()
      .subscribe((points) => this.updateMap(points));
  }

  private initializeMap() {
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
  }

  private setupMapViewListeners() {
    const view = this.map?.getView();
    if (view) {
      view.on('change:center', () => this.mapViewChanged.emit());
      view.on('change:resolution', () => this.mapViewChanged.emit());
    }
  }

  private updateMap(points: Point[]) {
    this.vectorSource.clear();

    points.forEach((point) => {
      const feature = new Feature({
        geometry: new PointGeometry(
          fromLonLat([point.longitude, point.latitude])
        ),
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
      duration: 2000,
    });
  }
}
