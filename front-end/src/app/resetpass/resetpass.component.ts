import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-resetpass',
  standalone: true,
  imports: [HeaderComponent,FooterComponent],
  templateUrl: './resetpass.component.html',
  styleUrl: './resetpass.component.css'
})
export class ResetpassComponent {

  constructor( private router : Router){}


  toResetpass(){
    this.router.navigate(['/resetpass#'])
  }
}
