import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import {DanhgiaService} from '../services/danhgia.service'
import { FormsModule } from '@angular/forms';
import { CommonModule, NgForOf, NgIf } from '@angular/common';

@Component({
  selector: 'app-danh-gia',
  standalone: true,
  imports: [HeaderComponent, FooterComponent,FormsModule,NgForOf,CommonModule],
  templateUrl: './danh-gia.component.html',
  styleUrl: './danh-gia.component.css'
})
export class DanhGiaComponent implements OnInit {
  reviews: any[] = [];
  stats: any = {};
  linhVucs = ['Chăm sóc sức khỏe', 'Spa-Grooming', 'Khách sạn thú cưng']; // Các lĩnh vực có sẵn
  averageRating: number = 0;
  totalReviews: number = 0;
  filter: any = {
    danhGia: '',
    linhVuc: '',
  };

  constructor(private reviewService: DanhgiaService) {}

  ngOnInit(): void {
    this.loadReviews();
    this.loadStats();
  }

  loadReviews(): void {
    this.reviewService.getReviews(this.filter).subscribe((data) => {
      this.reviews = data;
    });
  }

  loadStats(): void {
    this.reviewService.getStats().subscribe((data) => {
      // Chuyển đổi dữ liệu từ API để tạo object `stats`
      this.stats = data.stats.reduce(
        (acc:{[key:number]:number}, stat:{_id:number;count:number}) =>{
          acc[stat._id] = stat.count;
          return acc;
        },
        {}
      );
      this.totalReviews = data.total;
      this.averageRating = data.average;
    });
  }

  // Hàm tính phần trăm dựa trên số sao
  getPercentage(star: number): number {
    const count = this.stats[star] || 0;
    return this.totalReviews >0 ? (count/this.totalReviews)*100 :0;
  }

  }
  
