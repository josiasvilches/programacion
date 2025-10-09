import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-dev-panel',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="fixed bottom-4 right-4 bg-white border border-gray-300 rounded-lg shadow-lg p-4 max-w-sm z-50">
      <h3 class="font-bold text-gray-800 mb-3">🛠️ Panel de Desarrollo</h3>
      
      <div class="space-y-2 mb-4">
        <p class="text-sm text-gray-600">Usuario actual:</p>
        @if (userService.user(); as currentUser) {
          <div class="bg-gray-50 p-2 rounded text-sm">
            <p><strong>{{ currentUser.fullName }}</strong></p>
            <p class="text-gray-600">{{ currentUser.role }} - {{ currentUser.email }}</p>
          </div>
        } @else {
          <p class="text-sm text-gray-500 italic">Sin usuario logueado</p>
        }
      </div>

      <div class="space-y-2">
        <p class="text-sm font-medium text-gray-700 mb-2">Cambiar usuario:</p>
        
        <button 
          (click)="userService.loginAsAdmin()"
          class="w-full text-left px-3 py-2 text-sm bg-purple-50 hover:bg-purple-100 rounded border text-purple-700">
          👨‍💼 María García (Admin)
        </button>
        
        <button 
          (click)="userService.loginAsEmployee()"
          class="w-full text-left px-3 py-2 text-sm bg-blue-50 hover:bg-blue-100 rounded border text-blue-700">
          👷‍♂️ Carlos Rodríguez (Empleado)
        </button>
        
        <button 
          (click)="userService.loginAsClient()"
          class="w-full text-left px-3 py-2 text-sm bg-green-50 hover:bg-green-100 rounded border text-green-700">
          👤 Juan Carlos (Cliente)
        </button>
        
        <button 
          (click)="userService.logout()"
          class="w-full text-left px-3 py-2 text-sm bg-red-50 hover:bg-red-100 rounded border text-red-700">
          🚪 Desloguearse
        </button>
      </div>

      <div class="mt-3 pt-3 border-t border-gray-200">
        <p class="text-xs text-gray-500">
          Este panel es solo para desarrollo y testing de las vistas.
        </p>
      </div>
    </div>
  `,
  styles: []
})
export class DevPanelComponent {
  userService = inject(UserService);
}