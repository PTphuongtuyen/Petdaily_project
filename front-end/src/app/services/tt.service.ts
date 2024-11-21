import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface TinTuc {
  maTinTuc: string;
  chuDe: string;
  tieuDeChinh: string;
  tomTat: string;
  ngay: string;
  hinh: string;
  noiDung: {
    tieuDePhu: string;
    noiDungPhu: string;
  }[]; 
}


@Injectable({
  providedIn: 'root'
})
export class TtService {

  dvUrl: string = "assets/data/ds_tt.json"

  constructor(private http: HttpClient) { }

  getTinTuc(): Observable<TinTuc[]> {
    return this.http.get<TinTuc[]>(this.dvUrl)
  }
}
