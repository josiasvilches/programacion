import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {
  currentYear: number = new Date().getFullYear();
  
  socialLinks = [
    { name: 'Facebook', url: '#', icon: 'bi-facebook' },
    { name: 'Instagram', url: '#', icon: 'bi-instagram' },
    { name: 'Twitter', url: '#', icon: 'bi-twitter' }
  ];

  quickLinks = [
    { name: 'Menú', route: '/menu' },
    { name: 'Sobre Nosotros', route: '/about' },
    { name: 'Contacto', route: '/contact' },
    { name: 'Políticas', route: '/policies' }
  ];
}
