import { HttpParams } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

export interface Library {
  name: string;
  description: string;
  version: string;
}

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  searchValue: string;
  readonly CDN_API_URL = 'https://api.cdnjs.com/libraries';
  libraries: Library[] = [];
  dataSource = [];
  loading = false;
  columns = ['name', 'description', 'version'];

  constructor(private http: HttpClient) {}

  ngOnInit() {}

  onSearch($event: string) {
    this.loading = true;
    console.log($event);
    const fields = 'name,description,version';
    let params = new HttpParams();
    params = params.set('search', $event);
    params = params.set('fields', fields);
    this.http
      .get(this.CDN_API_URL, { params })
      .pipe(
        tap((res: any) => console.log(res.results)),
        map((res: any) => res.results)
      )
      .subscribe((res) => {
        this.libraries = res;
        this.loading = false;
      });
  }
}
