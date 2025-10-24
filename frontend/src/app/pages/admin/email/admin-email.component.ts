import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AdminSidebarComponent } from '../../../components/admin/sidebar/admin-sidebar.component';
import { AdminHeaderComponent } from '../../../components/admin/header/admin-header.component';
import { CampaignService } from '../../../services/campaign.service';
import { UserService } from '../../../services/user.service';

interface EmailCampaign {
  id: number;
  name: string;
  subject: string;
  status: 'activa' | 'pausada' | 'finalizada';
  recipients: number;
  openRate?: number;
  clickRate?: number;
  sentDate?: string;
  scheduledDate?: string;
  template: string;
  content?: string;
  cta?: string;
  descuento?: string;
}

interface User {
  id: number;
  name: string;
  email: string;
  status: string;
  role: string;
}

interface EmailTemplate {
  id: string;
  name: string;
  description: string;
  preview: string;
  color: string;
}

interface EmailStats {
  totalSent: number;
  openRate: number;
  clickRate: number;
  scheduledCount: number;
}

@Component({
  selector: 'app-admin-email',
  standalone: true,
  imports: [CommonModule, FormsModule, AdminSidebarComponent, AdminHeaderComponent],
  templateUrl: './admin-email.component.html',
  styleUrls: ['./admin-email.component.scss']
})
export class AdminEmailComponent implements OnInit {
  // Signals
  campaigns = signal<EmailCampaign[]>([]);
  isLoading = signal<boolean>(false);

  // User data (mantenerlo por ahora para el modal de selección)
  users: User[] = [];

  // Email templates
  templates: EmailTemplate[] = [
    {
      id: 'promo',
      name: 'Plantilla Promocional',
      description: 'Perfecta para ofertas y descuentos',
      preview: '🍗 Promoción Especial',
      color: 'red'
    },
    {
      id: 'news',
      name: 'Plantilla de Noticias',
      description: 'Ideal para anuncios y novedades',
      preview: '📰 Novedades',
      color: 'blue'
    },
    {
      id: 'event',
      name: 'Plantilla de Eventos',
      description: 'Para celebraciones y eventos',
      preview: '🎉 Evento',
      color: 'green'
    }
  ];

  // Modal states
  showCampaignModal = false;
  showTemplatesModal = false;
  isEditMode = false;
  currentCampaignId = 0;

  // Form data
  campaignForm = {
    name: '',
    subject: '',
    content: '',
    cta: '',
    date: '',
    time: '',
    template: 'promo',
    descuento: ''
  };

  // Selection states
  selectedUsers: number[] = [];
  selectedTemplate = 'promo';
  selectAllUsers = false;

  // Stats
  stats: EmailStats = {
    totalSent: 0,
    openRate: 0,
    clickRate: 0,
    scheduledCount: 0
  };

  constructor(
    private campaignService: CampaignService,
    private userService: UserService
  ) {}

  async ngOnInit() {
    await this.loadCampaignsFromBackend();
    this.updateStats();
  }

  // Cargar campañas desde el backend
  async loadCampaignsFromBackend() {
    console.log('🔄 Cargando campañas desde backend...');
    this.isLoading.set(true);
    
    try {
      const result = await this.campaignService.getAllCampaignsFromBackend(1, 100);
      
      if (result.success && result.data) {
        const backendCampaigns = result.data.campanas || [];
        console.log('📦 Campañas recibidas:', backendCampaigns);
        
        const convertedCampaigns = this.convertBackendCampaignsToUI(backendCampaigns);
        this.campaigns.set(convertedCampaigns);
        console.log('✅ Campañas convertidas:', convertedCampaigns);
      } else {
        console.error('❌ Error al cargar campañas:', result.message);
      }
    } catch (error) {
      console.error('❌ Error al cargar campañas:', error);
    } finally {
      this.isLoading.set(false);
    }
  }

  // Convertir campañas del backend al formato UI
  convertBackendCampaignsToUI(backendCampaigns: any[]): EmailCampaign[] {
    return backendCampaigns.map(campana => ({
      id: campana.campana_id,
      name: campana.titulo,
      subject: campana.mensaje,
      status: campana.estado || 'activa',
      recipients: 0, // El backend no almacena esto
      descuento: campana.descuento,
      sentDate: campana.fecha_creacion,
      scheduledDate: campana.fecha_inicio,
      template: 'promo',
      content: campana.mensaje
    }));
  }

  // Statistics methods
  updateStats() {
    const currentCampaigns = this.campaigns();
    const activeCampaigns = currentCampaigns.filter(c => c.status === 'activa');
    
    this.stats.totalSent = currentCampaigns.length;
    this.stats.openRate = 0; // No lo tenemos del backend
    this.stats.clickRate = 0; // No lo tenemos del backend
    this.stats.scheduledCount = activeCampaigns.length;
  }

  // Campaign management
  openNewCampaignModal() {
    this.isEditMode = false;
    this.currentCampaignId = 0;
    this.resetForm();
    this.showCampaignModal = true;
  }

  openEditCampaignModal(campaign: EmailCampaign) {
    this.isEditMode = true;
    this.currentCampaignId = campaign.id;
    this.campaignForm = {
      name: campaign.name,
      subject: campaign.subject,
      content: campaign.content || '',
      cta: campaign.cta || '',
      date: campaign.scheduledDate || '',
      time: '',
      template: campaign.template,
      descuento: campaign.descuento || ''
    };
    this.selectedTemplate = campaign.template;
    this.showCampaignModal = true;
  }

  closeCampaignModal() {
    this.showCampaignModal = false;
    this.resetForm();
  }

  resetForm() {
    this.campaignForm = {
      name: '',
      subject: '',
      content: '',
      cta: '',
      date: '',
      time: '',
      template: 'promo',
      descuento: ''
    };
    this.selectedUsers = [];
    this.selectedTemplate = 'promo';
    this.selectAllUsers = false;
  }

  // Template management
  openTemplatesModal() {
    this.showTemplatesModal = true;
  }

  closeTemplatesModal() {
    this.showTemplatesModal = false;
  }

  selectTemplate(templateId: string) {
    this.selectedTemplate = templateId;
    this.campaignForm.template = templateId;
    
    // Pre-fill content based on template, except for blank template
    if (templateId !== 'blank') {
      const templateContent = this.getTemplateContent(templateId);
      this.campaignForm.subject = templateContent.subject;
      this.campaignForm.content = templateContent.content;
      this.campaignForm.cta = templateContent.cta;
    } else {
      // Clear content for blank template
      this.campaignForm.subject = '';
      this.campaignForm.content = '';
      this.campaignForm.cta = '';
    }
  }

  useTemplate(templateId: string) {
    this.selectTemplate(templateId);
    this.closeTemplatesModal();
    this.openNewCampaignModal();
  }

  getTemplateContent(templateId: string) {
    const templates = {
      'promo': {
        subject: '¡Oferta especial solo para ti!',
        content: '¡Hola!\n\nTenemos una promoción increíble que no te puedes perder. Disfruta de descuentos especiales en todos nuestros platos favoritos.\n\n¡No dejes pasar esta oportunidad única!',
        cta: ''
      },
      'news': {
        subject: 'Novedades en Rotisería Cacho',
        content: '¡Hola!\n\nQueremos contarte todas las novedades que tenemos preparadas para ti. Nuevos platos, horarios especiales y mucho más.\n\n¡Mantente al día con nosotros!',
        cta: ''
      },
      'event': {
        subject: 'Te invitamos a nuestro evento especial',
        content: '¡Hola!\n\nTenemos un evento especial que no te puedes perder. Ven y disfruta de una experiencia única con nosotros.\n\n¡Te esperamos!',
        cta: 'Confirmar Asistencia'
      }
    };
    
    return templates[templateId as keyof typeof templates] || templates.promo;
  }

  // User selection
  toggleAllUsers() {
    const activeUsers = this.getActiveUsers();
    
    if (this.selectAllUsers) {
      this.selectedUsers = activeUsers.map(u => u.id);
    } else {
      this.selectedUsers = [];
    }
  }

  toggleUser(userId: number) {
    const index = this.selectedUsers.indexOf(userId);
    if (index > -1) {
      this.selectedUsers.splice(index, 1);
    } else {
      this.selectedUsers.push(userId);
    }
    
    const activeUsers = this.getActiveUsers();
    this.selectAllUsers = this.selectedUsers.length === activeUsers.length;
  }

  isUserSelected(userId: number): boolean {
    return this.selectedUsers.includes(userId);
  }

  getActiveUsers(): User[] {
    return this.users.filter(u => u.status === 'active' && u.role === 'USER');
  }

  getSelectedCount(): number {
    return this.selectedUsers.length;
  }

  // Campaign actions
  async sendCampaign() {
    if (!this.validateForm()) {
      alert('Por favor completa todos los campos obligatorios.');
      return;
    }

    const token = this.userService.getAuthToken();
    console.log('🔑 Token obtenido:', token ? 'Sí (oculto)' : 'No encontrado');
    
    if (!token) {
      alert('Debes iniciar sesión para realizar esta acción');
      return;
    }

    const isScheduled = !!(this.campaignForm.date && this.campaignForm.time);
    
    if (this.isEditMode) {
      await this.updateCampaignInBackend(token);
    } else {
      await this.createCampaignInBackend(token, isScheduled);
    }

    await this.loadCampaignsFromBackend();
    this.closeCampaignModal();
    this.updateStats();
    
    const message = isScheduled 
      ? `¡Campaña programada exitosamente!`
      : `¡Campaña creada exitosamente!`;
    
    alert(message);
  }

  async saveDraft() {
    const token = this.userService.getAuthToken();
    console.log('🔑 Token obtenido (draft):', token ? 'Sí (oculto)' : 'No encontrado');
    
    if (!token) {
      alert('Debes iniciar sesión para realizar esta acción');
      return;
    }

    const campaignData = {
      titulo: this.campaignForm.name || 'Borrador sin título',
      mensaje: this.campaignForm.subject || 'Sin asunto',
      descuento: this.campaignForm.descuento,
      estado: 'pausada'
    };

    if (this.isEditMode) {
      const result = await this.campaignService.updateCampaignInBackend(
        this.currentCampaignId,
        campaignData,
        token
      );

      if (result.success) {
        alert('¡Borrador actualizado exitosamente!');
      } else {
        alert('Error al actualizar: ' + result.message);
      }
    } else {
      const result = await this.campaignService.createCampaignInBackend(
        campaignData,
        token
      );

      if (result.success) {
        alert('¡Borrador guardado exitosamente!');
      } else {
        alert('Error al guardar: ' + result.message);
      }
    }

    await this.loadCampaignsFromBackend();
    this.closeCampaignModal();
    this.updateStats();
  }

  private async createCampaignInBackend(token: string, isScheduled: boolean) {
    console.log('📤 Creando campaña en backend...');
    console.log('🔑 Token disponible:', !!token);
    
    const campaignData = {
      titulo: this.campaignForm.name,
      mensaje: this.campaignForm.subject,
      descuento: this.campaignForm.descuento,
      estado: 'activa',
      fecha_inicio: isScheduled ? this.campaignForm.date : undefined,
      fecha_fin: undefined
    };

    console.log('📦 Datos a enviar:', campaignData);

    const result = await this.campaignService.createCampaignInBackend(
      campaignData,
      token
    );

    console.log('📥 Resultado:', result);

    if (!result.success) {
      alert('Error al crear campaña: ' + result.message);
    }
  }

  private async updateCampaignInBackend(token: string) {
    const campaignData = {
      titulo: this.campaignForm.name,
      mensaje: this.campaignForm.subject,
      descuento: this.campaignForm.descuento,
      estado: 'activa'
    };

    const result = await this.campaignService.updateCampaignInBackend(
      this.currentCampaignId,
      campaignData,
      token
    );

    if (!result.success) {
      alert('Error al actualizar campaña: ' + result.message);
    }
  }

  private validateForm(): boolean {
    return !!(this.campaignForm.name && 
             this.campaignForm.subject);
  }

  duplicateCampaign(campaign: EmailCampaign) {
    // Por ahora solo alert, ya que duplicar implica crear una nueva campaña
    alert('Funcionalidad de duplicar en desarrollo');
  }

  async deleteCampaign(id: number) {
    if (confirm('¿Estás seguro de que quieres eliminar esta campaña?')) {
      const token = this.userService.getAuthToken();
      if (!token) {
        alert('Debes iniciar sesión para realizar esta acción');
        return;
      }

      const result = await this.campaignService.deleteCampaignInBackend(id, token);
      
      if (result.success) {
        alert('Campaña eliminada exitosamente.');
        await this.loadCampaignsFromBackend();
        this.updateStats();
      } else {
        alert('Error al eliminar: ' + result.message);
      }
    }
  }

  async cancelScheduled(id: number) {
    if (confirm('¿Estás seguro de que quieres pausar esta campaña?')) {
      const token = this.userService.getAuthToken();
      if (!token) {
        alert('Debes iniciar sesión para realizar esta acción');
        return;
      }

      const result = await this.campaignService.updateCampaignInBackend(
        id,
        { estado: 'pausada' },
        token
      );
      
      if (result.success) {
        alert('Campaña pausada exitosamente.');
        await this.loadCampaignsFromBackend();
        this.updateStats();
      } else {
        alert('Error al pausar: ' + result.message);
      }
    }
  }

  // Utility methods
  getStatusName(status: string): string {
    const names = {
      'sent': 'Enviado',
      'draft': 'Borrador',
      'scheduled': 'Programado',
      'sending': 'Enviando'
    };
    return names[status as keyof typeof names] || status;
  }

  getStatusClass(status: string): string {
    return `status-${status}`;
  }

  formatDate(dateString: string): string {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('es-AR');
  }

  getUserInitials(name: string): string {
    return name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
  }

  getTemplateById(id: string): EmailTemplate | undefined {
    return this.templates.find(t => t.id === id);
  }

  // Email preview
  getEmailPreview(): string {
    const template = this.getTemplateById(this.selectedTemplate);
    
    const name = this.campaignForm.name || 'Tu Campaña';
    const subject = this.campaignForm.subject || 'Asunto del email';
    const content = this.campaignForm.content || 'Contenido de tu promoción...';
    const cta = this.campaignForm.cta || 'Botón de Acción';

    if (this.selectedTemplate === 'blank') {
      return `
        <div class="bg-white border border-gray-200 rounded-lg overflow-hidden">
          <div class="bg-gradient-to-r from-gray-500 to-gray-600 text-white p-6 text-center">
            <h1 class="text-2xl font-bold mb-2">✉️ Rotisería Cacho</h1>
            <h2 class="text-xl">${subject || 'Asunto del email'}</h2>
          </div>
          <div class="p-6">
            <div class="text-gray-700 mb-6 leading-relaxed">
              ${content ? content.replace(/\n/g, '<br>') : '<p class="text-gray-400 italic">Escribe aquí tu contenido personalizado...</p>'}
            </div>
            ${cta && cta !== 'Botón de Acción' ? `<div class="text-center">
              <button class="bg-gray-500 text-white px-8 py-3 rounded-lg font-bold text-lg hover:bg-gray-600">
                ${cta}
              </button>
            </div>` : ''}
          </div>
          <div class="bg-gray-50 p-4 text-center text-sm text-gray-500">
            <p>Rotisería Cacho - Tu mensaje personalizado</p>
          </div>
        </div>
      `;
    } else if (this.selectedTemplate === 'promo') {
      return `
        <div class="bg-white border border-gray-200 rounded-lg overflow-hidden">
          <div class="bg-gradient-to-r from-red-500 to-red-600 text-white p-6 text-center">
            <h1 class="text-2xl font-bold mb-2">🍗 Rotisería Cacho</h1>
            <h2 class="text-xl">${subject}</h2>
          </div>
          <div class="p-6">
            <div class="text-gray-700 mb-6 leading-relaxed">
              ${content.replace(/\n/g, '<br>')}
            </div>
          </div>
          <div class="bg-gray-50 p-4 text-center text-sm text-gray-500">
            <p>Rotisería Cacho - Los mejores sabores de siempre</p>
          </div>
        </div>
      `;
    } else if (this.selectedTemplate === 'news') {
      return `
        <div class="bg-white border border-gray-200 rounded-lg overflow-hidden">
          <div class="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-6 text-center">
            <h1 class="text-2xl font-bold mb-2">📰 Rotisería Cacho</h1>
            <h2 class="text-xl">${subject}</h2>
          </div>
          <div class="p-6">
            <div class="text-gray-700 mb-6 leading-relaxed">
              ${content.replace(/\n/g, '<br>')}
            </div>
          </div>
          <div class="bg-gray-50 p-4 text-center text-sm text-gray-500">
            <p>Rotisería Cacho - Siempre innovando para ti</p>
          </div>
        </div>
      `;
    } else {
      return `
        <div class="bg-white border border-gray-200 rounded-lg overflow-hidden">
          <div class="bg-gradient-to-r from-green-500 to-green-600 text-white p-6 text-center">
            <h1 class="text-2xl font-bold mb-2">🎉 Rotisería Cacho</h1>
            <h2 class="text-xl">${subject}</h2>
          </div>
          <div class="p-6">
            <div class="text-gray-700 mb-6 leading-relaxed">
              ${content.replace(/\n/g, '<br>')}
            </div>
            <div class="text-center">
              <button class="bg-green-500 text-white px-8 py-3 rounded-lg font-bold text-lg hover:bg-green-600">
                ${cta}
              </button>
            </div>
          </div>
          <div class="bg-gray-50 p-4 text-center text-sm text-gray-500">
            <p>Rotisería Cacho - Eventos únicos para ti</p>
          </div>
        </div>
      `;
    }
  }
}
