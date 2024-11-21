import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { TinTuc, TtService } from '../services/tt.service';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-tin-tuc',
  standalone: true,
  imports: [CommonModule,HeaderComponent, FooterComponent, RouterModule],
  templateUrl: './tin-tuc.component.html',
  styleUrl: './tin-tuc.component.css'
})
export class TinTucComponent implements OnInit{
  dsTinTuc: TinTuc[] = []; // Dữ liệu bài viết
  
  selectedId: any;

  constructor(private ttService: TtService, private router: Router, private activate: ActivatedRoute) { }

  ngOnInit(): void {
    // Sử dụng Service để lấy dữ liệu từ file JSON
    this.ttService.getTinTuc().subscribe(data => {
      this.dsTinTuc = data;
    });  

    this.activate.paramMap.subscribe((param) => {
      let id = param.get('maTinTuc');
      if (id != null) this.selectedId = id
    })
  }


  onItemClick(t: any) {
    this.router.navigate(['/tinTuc', t.maTinTuc])
  }

  onActive (t: any) {
    return t.maTinTuc == this.selectedId;
  }
}
