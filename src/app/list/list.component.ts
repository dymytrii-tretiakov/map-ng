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
  styleUrls: ['./list.component.scss'], // corrected to 'styleUrls'
})
export class ListComponent implements OnInit {
  public filteredPoints: Point[] = [];
  public searchTerm = '';

  @Output() pointsFiltered = new EventEmitter<Point[]>();
  @Output() pointSelected = new EventEmitter<Point>();

  private points: Point[] = [];

  constructor(private pointsService: PointsService) {}

  ngOnInit() {
    this.pointsService.getPoints().subscribe((points) => {
      this.points = points;
      this.filteredPoints = points;
    });
  }

  onSearchChange() {
    this.filteredPoints = this.searchTerm
      ? this.points.filter((point) =>
          point.name.toLowerCase().includes(this.searchTerm.toLowerCase())
        )
      : this.points;

    this.pointsFiltered.emit(this.filteredPoints);
  }

  onSelectPoint(point: Point) {
    this.pointSelected.emit(point);
  }
}
