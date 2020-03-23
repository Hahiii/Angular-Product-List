import { Component, OnChanges, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-star',
  templateUrl: './star.component.html',
  styleUrls: ['./star.component.scss']
})
export class StarComponent implements OnChanges {
  @Input() rating: number;
  startWidth: number
  @Output() ratingClick: EventEmitter<number> = new EventEmitter<number>();
  constructor() { }

  ngOnChanges(): void {
    this.startWidth = this.rating * 75 / 5;
  }

  onClick() {
    this.ratingClick.emit(this.rating)
  }
}
