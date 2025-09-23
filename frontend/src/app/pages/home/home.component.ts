import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { Schedule, ContactInfo, Testimonial } from '../../models/product.interface';
import { FavoriteProductsCarrouselComponent } from '../../components/carrousel/favorite-products-carrousel/favorite-products-carrousel.component';
import { RecommendedProductsCarrouselComponent } from '../../components/carrousel/recommended-products-carrousel/recommended-products-carrousel.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    HeaderComponent,
    FavoriteProductsCarrouselComponent,
    RecommendedProductsCarrouselComponent,
    FooterComponent,
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  schedules: Schedule[] = [
    { day: 'Lun - Vie', hours: '11:00 - 23:00' },
    { day: 'Sábados', hours: '11:00 - 24:00' },
    { day: 'Domingos', hours: '12:00 - 23:00' },
  ];



  contactInfo: ContactInfo = {
    phone: '(011) 4567-8900',
    address: 'Av. Corrientes 1234',
    whatsapp: '+54 9 11 1234-5678',
    email: 'info@rotiseriacacho.com',
  };
  testimonials: Testimonial[] = [
    {
      id: 1,
      name: 'María',
      comment: 'El mejor pollo del barrio. Hace años que vengo y siempre la misma calidad.',
      rating: 5,
      avatar: 'M',
      role: 'Cliente habitual',
    },
    {
      id: 2,
      name: 'Carlos',
      comment: 'Las empanadas son increíbles y siempre están a tiempo.',
      rating: 5,
      avatar: 'C',
      role: 'Cliente habitual',
    },
    {
      id: 3,
      name: 'Ana',
      comment: 'Tradición familiar que se nota en cada plato. Muy recomendable.',
      rating: 5,
      avatar: 'A',
      role: 'Cliente habitual',
    },
  ];

  isOpen = true; // This could be calculated based on current time
  
  constructor(private router: Router) {}

  onViewMenu() {
    this.router.navigate(['/comidas']);
  }

  onCallNow() {
    window.open('tel:01145678900', '_self');
  }

  onCallPhone() {
    window.open(`tel:${this.contactInfo.phone.replace(/\D/g, '')}`, '_self');
  }

  onWhatsApp() {
    window.open(`https://wa.me/${this.contactInfo.whatsapp.replace(/\D/g, '')}`, '_blank');
  }

  getStars(rating: number): string {
    return '★'.repeat(rating);
  }

  getAvatarColor(name: string): string {
    const colors = ['bg-blue-500', 'bg-green-500', 'bg-purple-500', 'bg-orange-500', 'bg-pink-500'];
    const index = name.charCodeAt(0) % colors.length;
    return colors[index];
  }
}
