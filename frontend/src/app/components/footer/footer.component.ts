import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {
  currentYear: number = new Date().getFullYear();
  
  socialLinks = [
    { name: 'Facebook', url: 'https://facebook.com', icon: 'facebook' },
    { name: 'Instagram', url: 'https://instagram.com', icon: 'instagram' },
    { name: 'Twitter', url: 'https://twitter.com', icon: 'twitter' }
  ];

  quickLinks = [
    { name: 'Inicio', route: '/' },
    { name: 'Comidas', route: '/comidas' },
    { name: 'Carrito', route: '/cart' },
    { name: 'Mis Pedidos', route: '/orders' }
  ];

  getSocialIcon(iconName: string): string {
    const icons: { [key: string]: string } = {
      'facebook': 'f',
      'instagram': '📷',
      'twitter': '🐦'
    };
    return icons[iconName] || '📱';
  }
}
