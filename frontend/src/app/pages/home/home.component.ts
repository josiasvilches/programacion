import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { Schedule, ContactInfo, Testimonial } from '../../models/product.interface';
import { FavoriteProductsCarrouselComponent } from '../../components/carrousel/favorite-products-carrousel/favorite-products-carrousel.component';
import { RecommendedProductsCarrouselComponent } from '../../components/carrousel/recommended-products-carrousel/recommended-products-carrousel.component';
import { ProductService } from '../../services/product.service';
import { RatingService } from '../../services/rating.service';

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
export class HomeComponent implements OnInit {
  errorMessage: string = '';
  showError: boolean = false;
  isLoadingProducts: boolean = false;
  
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
  testimonials: Testimonial[] = [];
  isLoadingTestimonials: boolean = false;

  isOpen = true; // This could be calculated based on current time
  
  constructor(
    private router: Router, 
    private route: ActivatedRoute,
    private productService: ProductService,
    private ratingService: RatingService,
    private cdr: ChangeDetectorRef
  ) {}
  
  ngOnInit() {
    // Verificar si hay parámetros de error por acceso denegado
    this.route.queryParams.subscribe(params => {
      if (params['error'] === 'access_denied') {
        this.errorMessage = params['message'] || 'Acceso denegado';
        this.showError = true;
        
        // Ocultar mensaje después de 5 segundos
        setTimeout(() => {
          this.showError = false;
        }, 5000);
        
        // Limpiar los query params
        this.router.navigate(['/'], { replaceUrl: true });
      }
    });

    // Cargar productos favoritos y recomendados desde la API
    this.loadProducts();
    this.loadTestimonials();
  }

  /**
   * Carga los productos desde la API
   */
  async loadProducts() {
    try {
      this.isLoadingProducts = true;
      
      // Fetch de productos desde el backend
      const productos = await this.productService.fetchProductsFromAPI();
      console.log('Productos cargados exitosamente desde la API');
    } catch (error) {
      console.error('Error al cargar productos en home:', error);
      this.errorMessage = 'Error al cargar los productos. Por favor, intente nuevamente.';
      this.showError = true;
      
      // Ocultar mensaje de error después de 5 segundos
      setTimeout(() => {
        this.showError = false;
      }, 5000);
    } finally {
      this.isLoadingProducts = false;
    }
  }

  /**
   * Carga las últimas valoraciones para mostrar como testimonios
   */
  async loadTestimonials() {
    try {
      this.isLoadingTestimonials = true;
      this.cdr.detectChanges(); // Forzar detección de cambios para mostrar el skeleton
      
      const result = await this.ratingService.getRecentRatings(3);
      
      if (result.success && result.data) {
        const valoraciones = result.data.valoraciones || [];
        
        // Mapear valoraciones a formato de testimonios
        this.testimonials = valoraciones.map((val: any, index: number) => ({
          id: val.valoracion_id || index + 1,
          name: val.nombre_usuario || 'Usuario Anónimo',
          comment: val.comentario || `Calificó "${val.producto_nombre}" con ${val.valoracion} estrellas`,
          rating: Math.floor(val.valoracion),
          avatar: this.getInitials(val.nombre_usuario || 'U'),
          role: 'Cliente'
        }));
      }
    } catch (error) {
      console.error('Error al cargar testimonios:', error);
      // Si hay error, dejar el array vacío
      this.testimonials = [];
    } finally {
      this.isLoadingTestimonials = false;
      this.cdr.detectChanges(); // Forzar detección de cambios después de cargar
    }
  }

  /**
   * Obtiene las iniciales de un nombre
   */
  getInitials(name: string): string {
    if (!name) return 'U';
    const words = name.trim().split(' ');
    if (words.length === 1) return words[0].charAt(0).toUpperCase();
    return (words[0].charAt(0) + words[words.length - 1].charAt(0)).toUpperCase();
  }

  dismissError() {
    this.showError = false;
  }

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
