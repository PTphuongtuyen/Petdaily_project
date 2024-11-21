import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-lien-he',
  standalone: true,
  imports: [HeaderComponent, FooterComponent],
  templateUrl: './lien-he.component.html',
  styleUrl: './lien-he.component.css'
})
export class LienHeComponent {

}
