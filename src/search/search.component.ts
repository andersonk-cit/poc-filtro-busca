import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import {
  tap,
  map,
  filter,
  distinctUntilChanged,
  debounceTime,
} from 'rxjs/operators';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent implements OnInit {
  search = new FormControl();

  @Output() searchEvent = new EventEmitter<string>();

  constructor() {}

  ngOnInit() {
    this.onValueChanges();
  }

  onValueChanges() {
    this.search.valueChanges
      .pipe(
        map((value: string) => value.trim()),
        filter((value) => value.length > 2),
        debounceTime(300),
        distinctUntilChanged()
      )
      .subscribe((value) => {
        this.searchEvent.emit(value);
      });
  }
}
