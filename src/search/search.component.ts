import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import {
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
        map((value: string) => value.trim()), //remove espaços
        filter((value) => value.length > 2), //aplica filtro para permitir a busca apenas com pelo menos 3 caracteres
        debounceTime(300), //aplica um delay em ms
        distinctUntilChanged() //só permite valor diferente do anterior buscado
      )
      .subscribe((value) => {
        this.searchEvent.emit(value);
      });
  }
}
