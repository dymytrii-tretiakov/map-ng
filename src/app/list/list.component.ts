import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { PointsService } from '../points.service';
import { Point } from '../point.interface';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss'
})
export class ListComponent implements OnInit {
  private points: Point[] = [];
  public filteredPoints: Point[] = [];
  public searchTerm = '';

  @Output() pointsFiltered: EventEmitter<Point[]> = new EventEmitter<Point[]>();
  @Output() pointSelected: EventEmitter<Point> = new EventEmitter<Point>();

  constructor(private pointsService: PointsService) {}

  ngOnInit() {
    this.pointsService.getPoints().subscribe((points) => {
      this.points = points;
      this.filteredPoints = points;
    });
  }

  onSearchChange() {
    if (!this.searchTerm) {
      this.filteredPoints = this.points;
      this.pointsFiltered.emit(this.filteredPoints);
      return;
    }

    this.filteredPoints = this.points.filter((point) => {
      return point.name.toLowerCase().includes(this.searchTerm.toLowerCase());
    });

    this.pointsFiltered.emit(this.filteredPoints);
  }

  onSelectPoint(point: Point) {
    this.pointSelected.emit(point);
  }
}
