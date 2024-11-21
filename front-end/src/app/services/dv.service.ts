import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class DvService {

  myUrl: string = "assets/data/ds_dv.json"

  constructor(private _http: HttpClient) {}

  getGoi(): Observable<any> {
    return this._http.get<any>(this.myUrl).pipe(
      tap(data => console.log('Dữ liệu đã tải:', data)), // Thêm log để kiểm tra dữ liệu
      catchError(error => {
        console.error('Lỗi khi tải dữ liệu:', error); // Log lỗi nếu có
        return throwError(error);
      })
    );
  }
}