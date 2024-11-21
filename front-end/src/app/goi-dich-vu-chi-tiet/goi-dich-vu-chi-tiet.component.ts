import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { DvService } from '../services/dv.service';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';


@Component({
  selector: 'app-goi-dich-vu-chi-tiet',
  standalone: true,
  imports: [CommonModule, HeaderComponent, FooterComponent, RouterModule],
  templateUrl: './goi-dich-vu-chi-tiet.component.html',
  styleUrl: './goi-dich-vu-chi-tiet.component.css'
})


export class GoiDichVuChiTietComponent implements OnInit {

  maLinhVuc: string | null = null;
  maGoi: string | null = null;
  chiTietGoi: any;
  goiDichVuGoiY: any[] = []; // Danh sách 3 gói dịch vụ gợi ý


  constructor(private route: ActivatedRoute, private dvService: DvService) {}

  ngOnInit(): void {
    // Lấy `maLinhVuc` và `maGoi` từ router
    this.maLinhVuc = this.route.snapshot.paramMap.get('maLinhVuc');
    this.maGoi = this.route.snapshot.paramMap.get('maGoi');

    // Gọi service để lấy thông tin gói dịch vụ
    this.dvService.getGoi().subscribe((data: any) => {
      const linhVuc = data.find((dv: any) => dv.maLinhVuc === this.maLinhVuc);
      if (linhVuc) {
        this.chiTietGoi = linhVuc.goiDichVu.find((goi: any) => goi.maGoi === this.maGoi);

        // Lọc các gói dịch vụ cùng lĩnh vực (không bao gồm gói hiện tại)
        this.goiDichVuGoiY = linhVuc.goiDichVu
          .filter((goi: any) => goi.maGoi !== this.maGoi) // Loại gói hiện tại ra
          .slice(0, 3); // Chọn 3 gói dịch vụ
      }
    });
  }
  
}
