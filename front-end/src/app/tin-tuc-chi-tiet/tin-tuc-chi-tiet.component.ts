import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { TinTuc, TtService } from '../services/tt.service';
import { CommonModule } from '@angular/common';



@Component({
  selector: 'app-tin-tuc-chi-tiet',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, CommonModule, RouterModule],
  templateUrl: './tin-tuc-chi-tiet.component.html',
  styleUrl: './tin-tuc-chi-tiet.component.css'
})
export class TinTucChiTietComponent implements OnInit{
  selectedId: any;
  tinTuc!: TinTuc; // Dữ liệu bài viết chi tiết
  relatedArticles: TinTuc[] = []; // Danh sách bài viết gợi ý


  

  constructor(private activate: ActivatedRoute, private router: Router, private ttService: TtService) {}

  ngOnInit(): void {
    // Lấy `maTinTuc` từ URL
    const maTinTuc = this.activate.snapshot.paramMap.get('maTinTuc');
    if (maTinTuc) {
      // Tìm chi tiết bài viết qua service
      this.ttService.getTinTuc().subscribe(data => {
        this.tinTuc = data.find(t => t.maTinTuc === maTinTuc) || {} as TinTuc;

         // Lọc các bài viết có cùng chủ đề nhưng khác mã bài viết
        if (this.tinTuc.chuDe) {
          this.relatedArticles = data.filter(
            t => t.chuDe === this.tinTuc.chuDe && t.maTinTuc !== maTinTuc
          );
      }
     })}
  
  }


  
}
