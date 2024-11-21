import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loggedIn: boolean = false; //trạng thái mặc định
  constructor() { }
  //hàm để kiểm tra người dùng đã đăng nhập
  isLoggedIn(): boolean {
    return this.loggedIn
  }
}
