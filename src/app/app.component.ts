import { HttpClient } from '@angular/common/http';
import { Component, OnInit, VERSION } from '@angular/core';
import { Observable } from 'rxjs';

export interface Library {
  name: string;
  latest: string;
}

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  searchValue: string;
  readonly CDN_API_URL = 'https://api.cdnj.com/libraries';
  results$: Observable<any>;

  constructor(private http: HttpClient) {}

  ngOnInit() {}

  onSearch() {
    console.log();

    this.results$ = this.http.get(this.CDN_API_URL);
  }
}
