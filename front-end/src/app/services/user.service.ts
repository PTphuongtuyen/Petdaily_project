import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})

export class UserService {
  private tokenkey = "authtokenkey"
  baseUrl = 'http://localhost:3000/api'
   private apiUrl = 'http://localhost:3000/api/dangnhap';
  private regisurl = 'http://localhost:3000/api/dangky'; // Backend URL
  constructor(private http: HttpClient, private router: Router) { }
  
    // API đăng ký người dùng
    registerUser(data: any): Observable<any> {
      return this.http.post(`${this.regisurl}/register`,data, 
        {headers: { 'Content-Type': 'application/json' }});
    }
   // Gọi API đăng nhập
   login(email: string, password: string): Observable<any> {
     return this.http.post<any>(`${this.apiUrl}/login`, { email, password },
      {headers: { 'Content-Type': 'application/json' ,// Chỉ định dữ liệu gửi đi là JSON
      'Accept': 'application/json'}}
     )  
    }
     // Lưu token vào localStorage
   setToken(token: string): void {
     localStorage.setItem(this.tokenkey, token);
   }

   // Lấy token từ localStorage
   getToken(): string | null {
     return localStorage.getItem(this.tokenkey);
   }

   //Kiểm tra trạng thái đăng nhập
      isLoggedIn(): boolean {
     return !!this.getToken();}

   // Xóa token khi đăng xuất
   logout() {
     localStorage.removeItem(this.tokenkey);
     this.router.navigate(['/trangChu'])
   }

 }
