import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-resetpass2',
  standalone: true,
  imports: [CommonModule, HeaderComponent,FooterComponent],
  templateUrl: './resetpass2.component.html',
  styleUrl: './resetpass2.component.css'
})
export class Resetpass2Component {

  constructor(private router: Router) {}

  toCompleted(){
    this.router.navigate(['/'])
  }
}
