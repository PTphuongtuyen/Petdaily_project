import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TrangChuComponent } from './trang-chu/trang-chu.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'front-end';
}
