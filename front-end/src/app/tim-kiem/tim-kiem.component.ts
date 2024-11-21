import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { CommonModule } from '@angular/common';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DvService } from '../services/dv.service';
import { TinTuc, TtService } from '../services/tt.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-tim-kiem',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './tim-kiem.component.html',
  styleUrls: ['./tim-kiem.component.css']
})
export class TimKiemComponent implements OnInit {
  searchTerm = new FormControl('');
  danhSachDichVu: any[] = [];
  dsTinTuc: TinTuc[] = [];
  filteredDichVu: any[] = [];
  filteredTinTuc: TinTuc[] = [];
  selectedId: any;
  showResults: boolean = false;

  constructor(
    private dvService: DvService,
    private ttService: TtService,
    private router: Router,
    private activate: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.dvService.getGoi().subscribe(data => {
      this.danhSachDichVu = data;
    });

    this.ttService.getTinTuc().subscribe(data => {
      this.dsTinTuc = data;
    });

    this.activate.paramMap.subscribe(param => {
      const id = param.get('maTinTuc');
      this.selectedId = id ? id : null;
    });
  }

  performSearch(): void {
    const searchTermLower = this.searchTerm.value?.toLowerCase() || '';

    if (!searchTermLower.trim()) {
      this.showResults = false;
      return;
    }

    this.filteredDichVu = this.danhSachDichVu.filter(dichVu =>
      dichVu.goiDichVu.some((goi: { tenGoi: string }) =>
        goi.tenGoi.toLowerCase().includes(searchTermLower)
      )
    );

    this.filteredTinTuc = this.dsTinTuc.filter(tin =>
      tin.tieuDeChinh.toLowerCase().includes(searchTermLower)
    );

    this.showResults =
      this.filteredDichVu.length > 0 || this.filteredTinTuc.length > 0;
  }

  onItemClick(t: any): void {
    this.router.navigate(['/tinTuc', t.maTinTuc]);
  }

  onActive(t: any): boolean {
    return t.maTinTuc === this.selectedId;
  }
  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];
      console.log('Tệp đã chọn:', file);
    }
  }
}
