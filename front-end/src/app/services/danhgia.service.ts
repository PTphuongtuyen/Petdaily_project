import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DanhgiaService {
  private baseUrl = 'http://localhost:3000/reviews';
  constructor(private http: HttpClient) { }
   /**
   * Lấy danh sách đánh giá từ backend
   * @param filters (tùy chọn) chứa các bộ lọc như `danhGia`, `linhVuc`, `tenGoi`
   * @returns Observable danh sách đánh giá
   */
   getReviews(filters?: { danhGia?: string; linhVuc?: string; tenGoi?: string }): Observable<any> {
    let params = new HttpParams();
    if (filters) {
      if (filters.danhGia) params = params.set('danhGia', filters.danhGia);
      if (filters.linhVuc) params = params.set('linhVuc', filters.linhVuc);
      if (filters.tenGoi) params = params.set('tenGoi', filters.tenGoi);
    }
    return this.http.get(`${this.baseUrl}`, { params });
  }

  /**
   * Lấy thống kê đánh giá
   * @returns Observable thống kê đánh giá
   */
  getStats(): Observable<any> {
    return this.http.get(`${this.baseUrl}/stats`);
  }

  /**
   * Thêm một đánh giá mới
   * @param review Đối tượng đánh giá cần thêm
   * @returns Observable kết quả thêm đánh giá
   */
  addReview(review: {
    maDanhGia: string;
    danhGia: number;
    binhLuan?: string;
    hinhAnh?: string[];
    ID_KH: string;
    hoTen: string;
    linhVuc: string;
    maGoi: string;
    tenGoi: string;
    ngay: string;
  }): Observable<any> {
    return this.http.post(`${this.baseUrl}`, review);
  }
}
