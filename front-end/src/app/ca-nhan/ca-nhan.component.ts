import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { RouterModule } from '@angular/router';
import { HSCNComponent } from './hscn/hscn.component';

@Component({
  selector: 'app-ca-nhan',
  standalone: true,
  imports: [HeaderComponent, FooterComponent,RouterModule, HSCNComponent],
  templateUrl: './ca-nhan.component.html',
  styleUrl: './ca-nhan.component.css'
})
export class CaNhanComponent {

  showPopup(){
    const confirmation = confirm("Bạn có muốn đăng xuất tài khoản không?"); 
    if (confirmation) { 
      // Thực hiện hành động đăng xuất 
      console.log("Đăng xuất thành công!");
     } else { 
      // Hủy hành động đăng xuất 
      console.log("Hủy đăng xuất.");
  }
}
}
