import { Component, OnInit, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { CartService } from '../../services/cart.service';
import { OrderService } from '../../services/order.service';
import { CartItem } from '../../models/product.interface';

interface PaymentMethod {
  id: string;
  name: string;
  description: string;
  icon: string;
  badge?: string;
  badgeColor?: string;
}

interface TimeSlot {
  time: string;
  disabled: boolean;
}

interface DayOption {
  id: string;
  name: string;
  date: string;
  fullDate: Date;
}

@Component({
  selector: 'app-payment',
  imports: [CommonModule, RouterModule, HeaderComponent, FooterComponent],
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit {
  // Signals for reactive state
  selectedPaymentMethod = signal<string>('cash');
  selectedDay = signal<string>('today');
  selectedTime = signal<string>('');
  isLoadingOrder = signal<boolean>(false);
  termsAccepted = signal<boolean>(false);
  cartItems = signal<CartItem[]>([]);

  // Computed values
  cartTotal = computed(() => {
    return this.cartItems().reduce((total, item) => {
      return total + (item.product.price * item.quantity);
    }, 0);
  });
  
  cartItemsCount = computed(() => {
    return this.cartItems().reduce((count, item) => count + item.quantity, 0);
  });
  
  discountAmount = computed(() => {
    return this.selectedPaymentMethod() === 'transfer' ? this.cartTotal() * 0.05 : 0;
  });
  
  finalTotal = computed(() => {
    return this.cartTotal() - this.discountAmount();
  });

  showTransferDetails = computed(() => this.selectedPaymentMethod() === 'transfer');

  // Data arrays
  paymentMethods: PaymentMethod[] = [
    {
      id: 'cash',
      name: 'Efectivo',
      description: 'Pago al retirar en el local',
      icon: '💵',
      badge: 'Sin recargo',
      badgeColor: 'text-green-600'
    },
    {
      id: 'card',
      name: 'Tarjeta de Débito/Crédito',
      description: 'Pago al retirar en el local',
      icon: '💳',
      badge: 'Seguro',
      badgeColor: 'text-blue-600'
    },
    {
      id: 'transfer',
      name: 'Transferencia Bancaria',
      description: 'Pago anticipado',
      icon: '🏦',
      badge: '5% descuento',
      badgeColor: 'text-green-600'
    },
    {
      id: 'digital',
      name: 'Billeteras Digitales',
      description: 'MercadoPago, Ualá al retirar',
      icon: '📱',
      badge: 'Instantáneo',
      badgeColor: 'text-blue-600'
    }
  ];

  dayOptions: DayOption[] = [];
  timeSlots: TimeSlot[] = [];

  // Day names and months for date formatting
  private dayNames = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
  private monthNames = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];

  constructor(private cartService: CartService, private orderService: OrderService, private router: Router) {}

  ngOnInit() {
    // Subscribe to cart items
    this.cartService.cartItems$.subscribe(items => {
      this.cartItems.set(items);
    });
    
    this.initializeDayOptions();
    this.generateTimeSlots();
  }

  private initializeDayOptions() {
    const today = new Date();
    this.dayOptions = [];

    for (let i = 0; i < 4; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      
      let name: string;
      if (i === 0) name = 'Hoy';
      else if (i === 1) name = 'Mañana';
      else name = this.dayNames[date.getDay()];

      this.dayOptions.push({
        id: i === 0 ? 'today' : i === 1 ? 'tomorrow' : `day${i + 1}`,
        name,
        date: this.formatDate(date),
        fullDate: date
      });
    }
  }

  private formatDate(date: Date): string {
    return `${date.getDate()} ${this.monthNames[date.getMonth()]}`;
  }

  private generateTimeSlots() {
    const slots: string[] = [];
    for (let hour = 11; hour <= 23; hour++) {
      slots.push(`${hour.toString().padStart(2, '0')}:00`);
      if (hour < 23) {
        slots.push(`${hour.toString().padStart(2, '0')}:30`);
      }
    }

    const now = new Date();
    const currentHour = now.getHours();
    const currentMinutes = now.getMinutes();

    this.timeSlots = slots.map(time => {
      const [hour, minute] = time.split(':').map(Number);
      const isDisabled = this.selectedDay() === 'today' && 
        (hour < currentHour || (hour === currentHour && minute <= currentMinutes + 45));
      
      return { time, disabled: isDisabled };
    });
  }

  selectDay(dayId: string) {
    this.selectedDay.set(dayId);
    this.selectedTime.set(''); // Reset time selection when day changes
    this.generateTimeSlots(); // Regenerate time slots
  }

  selectTime(time: string) {
    this.selectedTime.set(time);
  }

  selectPaymentMethod(methodId: string) {
    this.selectedPaymentMethod.set(methodId);
  }

  toggleTerms() {
    this.termsAccepted.set(!this.termsAccepted());
  }

  getSelectedDayDisplay(): string {
    const selectedOption = this.dayOptions.find(day => day.id === this.selectedDay());
    return selectedOption ? selectedOption.name : 'Seleccionar día';
  }

  getSelectedTimeDisplay(): string {
    return this.selectedTime() || 'Seleccionar horario';
  }

  getSelectedPaymentMethodInfo(): PaymentMethod | undefined {
    return this.paymentMethods.find(method => method.id === this.selectedPaymentMethod());
  }

  validateOrder(): boolean {
    if (!this.selectedTime()) {
      alert('Por favor, seleccioná un horario para retirar tu pedido');
      return false;
    }

    if (!this.termsAccepted()) {
      alert('Debés aceptar los términos y condiciones para continuar');
      return false;
    }

    if (this.cartItemsCount() === 0) {
      alert('Tu carrito está vacío');
      return false;
    }

    return true;
  }

  async placeOrder() {
    if (!this.validateOrder()) {
      return;
    }

    this.isLoadingOrder.set(true);

    try {
      // Simulate order processing
      await new Promise(resolve => setTimeout(resolve, 3000));

      // Create order using OrderService
      const paymentInfo = this.getSelectedPaymentMethodInfo();
      const pickupInfo = {
        day: this.getSelectedDayDisplay(),
        time: this.selectedTime()
      };

      const newOrder = this.orderService.createOrderFromCart(
        this.cartItems(),
        paymentInfo,
        pickupInfo
      );
      
      let orderSummary = `¡Pedido confirmado!\n\n`;
      orderSummary += `Número de pedido: #${newOrder.id}\n`;
      orderSummary += `Total: $${this.finalTotal().toLocaleString()}\n\n`;
      orderSummary += `Retiro: ${this.getSelectedDayDisplay()} a las ${this.selectedTime()}\n`;
      orderSummary += `Local: Rotisería Cacho - Av. Corrientes 1234\n\n`;
      orderSummary += `Método de pago: ${paymentInfo?.icon} ${paymentInfo?.name}\n`;
      
      if (this.selectedPaymentMethod() === 'transfer') {
        orderSummary += `\nRealizá la transferencia y enviá el comprobante por WhatsApp.\n`;
      }
      
      orderSummary += `\nTu pedido estará listo en el horario seleccionado.\n¡Gracias por tu compra!`;
      
      alert(orderSummary);
      
      // Clear cart and redirect to orders
      this.cartService.clearCart();
      this.router.navigate(['/orders']);
      
    } catch (error) {
      alert('Hubo un error al procesar tu pedido. Por favor, intentá nuevamente.');
    } finally {
      this.isLoadingOrder.set(false);
    }
  }

  goBack() {
    if (confirm('¿Estás seguro que querés volver? Se perderán los datos ingresados.')) {
      this.router.navigate(['/cart']);
    }
  }
}
