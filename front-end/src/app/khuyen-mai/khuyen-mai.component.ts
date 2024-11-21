import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-khuyen-mai',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, CommonModule],
  templateUrl: './khuyen-mai.component.html',
  styleUrl: './khuyen-mai.component.css'
})
export class KhuyenMaiComponent {
  banners = [
    { id: 1, src: 'assets/images/km_banner01.png', alt: 'Banner Khuyến Mãi 1' },
    { id: 2, src: 'assets/images/km_banner02.png', alt: 'Banner Khuyến Mãi 2' },
    { id: 3, src: 'assets/images/km_banner03.png', alt: 'Banner Khuyến Mãi 3' },
  ];
}
