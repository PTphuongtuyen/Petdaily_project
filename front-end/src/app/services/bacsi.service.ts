import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable({
providedIn: 'root'
})
export class BacsiService {
private jsonUrl = 'assets/data/ds_bs.json';
constructor(private http: HttpClient) { }

// Lấy dữ liệu bác sĩ từ file JSON
getDanhsachbacsi(): Observable<any[]> {
  return this.http.get<any[]>(this.jsonUrl);
}
}
