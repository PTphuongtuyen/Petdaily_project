import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { CommonModule } from '@angular/common';
import { BacsiService } from '../services/bacsi.service';

@Component({
  selector: 'app-gioi-thieu',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, CommonModule],
  templateUrl: './gioi-thieu.component.html',
  styleUrl: './gioi-thieu.component.css'
})
export class GioiThieuComponent {
  veterinarians: any[] = [];
  visibleVeterinarians: any[] = [];
  currentPage: number = 0;
  itemsPerPage: number = 3  ; 
  indicators: number[] = []; // Mảng lưu chỉ số các trang


  constructor(private _service: BacsiService) {}

  ngOnInit(): void {
    this._service.getDanhsachbacsi().subscribe(
      (data) => {
        this.veterinarians = data;
        this.initializeIndicators();
        this.updateVisibleVeterinarians();
      },
      (error) => console.error('Error loading data', error)
    );
  }

  // Khởi tạo các chỉ số trang dựa trên số lượng bác sĩ
  initializeIndicators() {
    const pageCount = Math.ceil(this.veterinarians.length / this.itemsPerPage);
    this.indicators = Array.from({ length: pageCount }, (_, i) => i);
  }

  // Cập nhật danh sách bác sĩ hiển thị theo trang hiện tại
  updateVisibleVeterinarians() {
    const start = this.currentPage * this.itemsPerPage;
    this.visibleVeterinarians = this.veterinarians.slice(start, start + this.itemsPerPage);
  }

  // Di chuyển tới trang tiếp theo
  showNext() {
    if ((this.currentPage + 1) * this.itemsPerPage < this.veterinarians.length) {
      this.currentPage++;
      this.updateVisibleVeterinarians();
    }
  }

  // Di chuyển tới trang trước
  showPrevious() {
    if (this.currentPage > 0) {
      this.currentPage--;
      this.updateVisibleVeterinarians();
    }
  }

  // Đi tới trang được chỉ định
  goToPage(pageIndex: number) {
    this.currentPage = pageIndex;
    this.updateVisibleVeterinarians();
  }
}
