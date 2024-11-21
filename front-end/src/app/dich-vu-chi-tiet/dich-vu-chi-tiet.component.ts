import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { DvService } from '../services/dv.service';
import { FormsModule } from '@angular/forms';

interface Dv {
  maLinhVuc: string;
  linhVuc: string;
  goiDichVu: any[];
}

@Component({
  selector: 'app-dich-vu-chi-tiet',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, RouterModule, CommonModule, FormsModule],
  templateUrl: './dich-vu-chi-tiet.component.html',
  styleUrls: ['./dich-vu-chi-tiet.component.css']
})
export class DichVuChiTietComponent implements OnInit {
  linhVuc: string | null = null; // Lưu giá trị maLinhVuc được chọn
  dsGoi: any[] = []; // Danh sách gốc gói dịch vụ
  filteredGoi: any[] = []; // Danh sách sau khi lọc
  selectedPrice: number | null = null; // Giá được chọn để lọc

  constructor(private activate: ActivatedRoute, private dvService: DvService, private router: Router) {}

  ngOnInit(): void {
    // Lấy maLinhVuc từ router
    this.linhVuc = this.activate.snapshot.paramMap.get('maLinhVuc');

    // Lấy dữ liệu từ DvService và lọc theo maLinhVuc
    this.dvService.getGoi().subscribe((data: Dv[]) => {
      const linhVucData = data.find((dv) => dv.maLinhVuc === this.linhVuc);
      if (linhVucData) {
        this.dsGoi = linhVucData.goiDichVu;
        this.filteredGoi = [...this.dsGoi]; // Hiển thị mặc định tất cả
      }
    });
  }

  // Hàm lọc theo giá
  filterByPrice(): void {
    if (this.selectedPrice) {
      this.filteredGoi = this.dsGoi.filter((goi) => goi.gia === this.selectedPrice);
    } else {
      this.filteredGoi = [...this.dsGoi]; // Hiển thị lại tất cả nếu không chọn giá
    }
  }

  goToChiTietGoi(maGoi: string) {
    if (this.linhVuc) {
      this.router.navigate([`/dichVu/${this.linhVuc}/${maGoi}`]);
    }
  }
}
