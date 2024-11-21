import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../services/user.service';
import { CommonModule, NgIf } from '@angular/common';
import { FooterComponent } from '../footer/footer.component';
import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'app-register',
  standalone:true,
  imports:[FormsModule, ReactiveFormsModule,CommonModule,HeaderComponent,FooterComponent],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  formdata ={
    hoTen: '',
    email: '',
    sdt: '',
    password: '',

  }
  constructor(private userService: UserService) {}

  ngOnInit(): void {
    // this.loadCaptcha();
  }
  //Hàm xử lý trường hợp khợp mật khẩu và mật khẩu nhập lại
  matchPasswords(password: string, confirmPassword: string) {
    return (formGroup: FormGroup) => {
      const pass = formGroup.controls[password];
      const confirmPass = formGroup.controls[confirmPassword];
      if (pass.value !== confirmPass.value) {
        confirmPass.setErrors({ notMatch: true });
      } else {
        confirmPass.setErrors(null);
      }
    };
  }
  // Xử lý khi gửi form
  onSubmit(): void {
    if (this.formdata) {
      alert('Vui lòng điền đầy đủ thông tin!');
      return;
    }
    const formData = this.formdata;
  
    // Gửi dữ liệu dạng JSON
    this.userService.registerUser(formData).subscribe(
      (response) => {
        alert('Đăng ký thành công!');
        this.formdata;
      },
      (error) => {
        alert(error.error.message || 'Đăng ký thất bại, vui lòng thử lại!');
      }
    );
  }}
