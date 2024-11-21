import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

  isMenuActive = false;
  constructor( private AuthService : UserService, private router: Router) {}

  handleAvatarClick(){
    if (this.AuthService.isLoggedIn()) {
      //nếu đã đăng nhập, chuyển tới trang đăng nhập
      this.router.navigate(['/caNhan']);
    } else{
      //nếu chưa đăng nhập, chuyển tới trang hồ sơ cá nhân
      this.router.navigate(['/login'])
    }
  }

  toggleMenu() {
    this.isMenuActive = !this.isMenuActive;
  }

}
