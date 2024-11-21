import { Component, OnInit } from '@angular/core';
import { DvService } from '../services/dv.service';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-dich-vu',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, CommonModule, RouterModule],
  templateUrl: './dich-vu.component.html',
  styleUrls: ['./dich-vu.component.css']
})
export class DichVuComponent implements OnInit {
  danhSachDichVu: any[] = [];


  goiCards = [
    // Danh sách dữ liệu thẻ
  ];
  pageSize = 2; // Số thẻ mỗi trang
  currentPage = 1;
  // totalPages: number;

  constructor(private dvService: DvService, private router: Router, private activate: ActivatedRoute) {}

  ngOnInit(): void {
    this.dvService.getGoi().subscribe(data => {
      this.danhSachDichVu = data;  // Lưu danh sách dịch vụ vào biến
    });

    

    // this.totalPages = Math.ceil(this.goiCards.length / this.pageSize);
  }


  
  getPaginatedCards() {
    const start = (this.currentPage - 1) * this.pageSize;
    return this.goiCards.slice(start, start + this.pageSize);
  }

  changePage(page: number) {
    this.currentPage = page;
  }




}
