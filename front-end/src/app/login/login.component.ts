import { Component, NgModule } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule,FormsModule, HeaderComponent, FooterComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  email: string = '';
  password: string = '';

  constructor(private authService: UserService, private router: Router) { }

  onLogin() {
    this.authService.login(this.email, this.password).subscribe({
      next: (response) => {
        console.log('Response:', response); // Log phản hồi thành công
        this.authService.setToken(response.token);
        this.router.navigate(['/trangChu']);
      },
      error: (error) => {
        console.error('Lỗi đăng nhập:', error); // Log lỗi chi tiết
        alert('Đăng nhập thất bại. Vui lòng kiểm tra lại thông tin!');
      },
    });
  }
  

  //Điều hướng trang
  navigateToRegister() {
    this.router.navigate(['/register']); // Chuyển sang trang đăng ký
}
  navigatetoResetpass(){
    this.router.navigate(['/resetpass']); // chuyển sang trang quên mật khẩu
  }
}
