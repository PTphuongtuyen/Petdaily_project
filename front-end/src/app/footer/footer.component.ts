import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent {

  isPhonePopupVisible: boolean = false;

  isChatPopupVisible: boolean  = false;


  // Hiển thị popup khi nhấn vào nút phone
  openPhonePopup() {
    this.isPhonePopupVisible = true;
  }

  // Đóng popup
  closePhonePopup() {
    this.isPhonePopupVisible = false;
  }

  openChatPopup() {
    this.isChatPopupVisible = true;
  }

  closeChatPopup() {
      this.isChatPopupVisible = false;
  }

  scrollToTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

}
