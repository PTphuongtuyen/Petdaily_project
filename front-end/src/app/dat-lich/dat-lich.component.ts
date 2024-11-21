import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { FooterComponent } from '../footer/footer.component';
import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'app-dat-lich',
  standalone: true,
  imports: [CommonModule,FormsModule,FooterComponent,HeaderComponent],
  templateUrl: './dat-lich.component.html',
  styleUrl: './dat-lich.component.css'
})
export class DatLichComponent {
  @ViewChild('formRef') formRef!: NgForm;
  today = new Date().toISOString().split('T')[0];
  appointment = {
    hoTen: '',
    soDienThoai: '',
    ngLienhekhac: '',
    sdt_ngLienhekhac: '',
    email: '',
    loaiThuCung: '',
    dichVu: '',
    ngayBatDau: '',
    ngayKetThuc: '',
    hinhThuc: '',
    diaChi: '',
    ngayHen: '',
    gioHen: '',
    luuY: ''
  };

  constructor(private http: HttpClient) { }

  isModalVisible = false; // Điều khiển việc hiển thị modal


  // Kiểm tra tính hợp lệ của form
  validateForm(): boolean {
    return !!this.appointment.hoTen &&
           !!this.appointment.soDienThoai &&
           !!this.appointment.email &&
           !!this.appointment.dichVu &&
           !!this.appointment.hinhThuc &&
           !!this.appointment.ngayHen &&
           !!this.appointment.gioHen;
}
  

  // Phương thức xử lý khi người dùng gửi form
  
  handleFormSubmit() {
    if (this.validateForm()) {
      console.log('Data being sent:', this.appointment); 
      // Send data to backend
      this.http.post('http://localhost:3000/datlich', this.appointment).subscribe({
        next: (response) => {
          console.log('Response from server:', response); // Optional: Log server response
          this.isModalVisible = true; // Show success modal
          this.resetForm(); 

        },
        error: (err) => {
          console.error('Error saving form:', err); // Log error for debugging
          alert('Có lỗi xảy ra khi lưu dữ liệu. Vui lòng thử lại!'); // Show error alert
        }
      });
    } else {
      alert('Vui lòng điền đầy đủ thông tin!'); // Validation failed alert
    }
  }

  // Đặt lại form sau khi gửi
  resetForm() {
    this.appointment = {
      hoTen: '',
      soDienThoai: '',
      ngLienhekhac: '',
      sdt_ngLienhekhac: '',
      email: '',
      loaiThuCung: '',
      dichVu: '',
      ngayBatDau: '',
      ngayKetThuc: '',
      hinhThuc: '',
      diaChi: '',
      ngayHen: '',
      gioHen: '',
      luuY: ''
    };
    if (this.formRef) {
      this.formRef.resetForm(); // Reset trạng thái form (ng-dirty, ng-touched, ng-invalid)
    }

    
    setTimeout(() => {
      this.isModalVisible = false;
    }, 3000);  
  }
  // Đóng modal
  closeModal() {
    setTimeout(() => {
      this.isModalVisible = false;
    }, 300); // Thêm thời gian chờ trước khi đóng modal
  }

  // Kiểm tra và xử lý dịch vụ được chọn
  toggleOptions() {
    const dichVu = this.appointment.dichVu;
  
    // Khi chọn dịch vụ spa grooming hoặc tiêm phòng, cho phép người dùng chọn phương thức
    if (dichVu === 'Spa - Grooming' || dichVu== 'Chăm sóc sức khỏe - Tiêm phòng') {
      this.appointment.hinhThuc = '';  // Để người dùng tự chọn phương thức, không mặc định
      const methodSelect = <HTMLSelectElement>document.getElementsByName('hinhThuc')[0];
      methodSelect.disabled = false;  // Không disabled dropdown phương thức
    }
    // Các dịch vụ khác (khách sạn thú cưng, chăm sóc sức khỏe) mặc định phương thức là "Tại cửa hàng"
    else {
      this.appointment.hinhThuc = 'Tại cửa hàng PetDaily'; // Mặc định phương thức là "Tại cửa hàng"
      const methodSelect = <HTMLSelectElement>document.getElementsByName('hinhThuc')[0];
      methodSelect.disabled = true; // Disabled dropdown phương thức khi dịch vụ không phải spa hoặc tiêm phòng
    }
  }
  


  // Hiển thị hoặc ẩn địa chỉ khi chọn phương thức "Tại nhà"
  toggleAddressField() {
    if (this.appointment.hinhThuc !== 'Tại nhà') {
      this.appointment.diaChi = '';
    }
  }

  // Đồng bộ ngày bắt đầu với ngày hẹn
  syncAppointmentDate() {
    const ngayBatDau = this.appointment.ngayBatDau;
    if (ngayBatDau) {
      this.appointment.ngayHen = ngayBatDau;
    }
  }

  // Kiểm tra số điện thoại và chỉ cho phép nhập số
  validatePhoneNumber(field: keyof typeof this.appointment) {
    if (this.appointment[field]) {
      // Loại bỏ các ký tự không phải số
      this.appointment[field] = this.appointment[field].replace(/[^0-9]/g, '');
      
      // Kiểm tra số điện thoại: ví dụ, độ dài tối thiểu (10 chữ số)
      if (this.appointment[field].length < 10) {
        alert('Số điện thoại phải có ít nhất 10 chữ số!');
      }
    }
  }

  validateEmail(field: keyof typeof this.appointment) {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Biểu thức chính quy kiểm tra định dạng email
    const email = this.appointment[field];

    if (email && !emailPattern.test(email)) {
        alert('Địa chỉ email không hợp lệ!'); // Thông báo lỗi nếu định dạng không hợp lệ
        this.appointment[field] = ''; // Xóa giá trị email không hợp lệ
    }
}
    
  
}