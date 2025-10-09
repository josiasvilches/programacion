import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AdminSidebarComponent } from '../../../components/admin/sidebar/admin-sidebar.component';
import { AdminHeaderComponent } from '../../../components/admin/header/admin-header.component';

interface EmailCampaign {
  id: number;
  name: string;
  subject: string;
  status: 'sent' | 'draft' | 'scheduled' | 'sending';
  recipients: number;
  openRate?: number;
  clickRate?: number;
  sentDate?: string;
  scheduledDate?: string;
  template: string;
  content?: string;
  cta?: string;
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
  // Campaign data
  campaigns: EmailCampaign[] = [
    {
      id: 1,
      name: "Promoción Fin de Semana",
      subject: "¡50% OFF en todos los platos!",
      status: "sent",
      recipients: 45,
      openRate: 72,
      clickRate: 38,
      sentDate: "2024-01-20",
      template: "promo"
    },
    {
      id: 2,
      name: "Nuevos Platos de Temporada",
      subject: "Descubre nuestros nuevos sabores",
      status: "scheduled",
      recipients: 38,
      scheduledDate: "2024-01-25",
      template: "news"
    },
    {
      id: 3,
      name: "Oferta Especial Miércoles",
      subject: "Miércoles de descuentos especiales",
      status: "draft",
      recipients: 0,
      template: "promo"
    }
  ];

  // User data
  users: User[] = [
    { id: 1, name: "María González", email: "maria@email.com", status: "active", role: "user" },
    { id: 2, name: "Carlos Rodríguez", email: "carlos@email.com", status: "active", role: "user" },
    { id: 3, name: "Ana Martínez", email: "ana@email.com", status: "active", role: "user" },
    { id: 4, name: "Luis Torres", email: "luis@email.com", status: "active", role: "user" },
    { id: 5, name: "Laura Sánchez", email: "laura@email.com", status: "active", role: "user" },
    { id: 6, name: "Diego Fernández", email: "diego@email.com", status: "active", role: "user" },
    { id: 7, name: "Carmen López", email: "carmen@email.com", status: "active", role: "user" },
    { id: 8, name: "Roberto Silva", email: "roberto@email.com", status: "active", role: "user" },
    { id: 9, name: "Patricia Ruiz", email: "patricia@email.com", status: "active", role: "user" },
    { id: 10, name: "Fernando Castro", email: "fernando@email.com", status: "active", role: "user" },
    { id: 11, name: "Mónica Herrera", email: "monica@email.com", status: "active", role: "user" },
    { id: 12, name: "Alejandro Morales", email: "alejandro@email.com", status: "active", role: "user" }
  ];

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
    template: 'promo'
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

  ngOnInit() {
    this.updateStats();
  }

  // Statistics methods
  updateStats() {
    const sentCampaigns = this.campaigns.filter(c => c.status === 'sent');
    
    this.stats.totalSent = sentCampaigns.reduce((sum, c) => sum + c.recipients, 0);
    
    this.stats.openRate = sentCampaigns.length > 0 
      ? Math.round(sentCampaigns.reduce((sum, c) => sum + (c.openRate || 0), 0) / sentCampaigns.length)
      : 0;
    
    this.stats.clickRate = sentCampaigns.length > 0 
      ? Math.round(sentCampaigns.reduce((sum, c) => sum + (c.clickRate || 0), 0) / sentCampaigns.length)
      : 0;
    
    this.stats.scheduledCount = this.campaigns.filter(c => c.status === 'scheduled').length;
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
      template: campaign.template
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
      template: 'promo'
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
  sendCampaign() {
    if (!this.validateForm()) {
      alert('Por favor completa todos los campos obligatorios y selecciona al menos un destinatario.');
      return;
    }

    const isScheduled = !!(this.campaignForm.date && this.campaignForm.time);
    
    if (this.isEditMode) {
      this.updateCampaign();
    } else {
      this.createCampaign(isScheduled);
    }

    this.closeCampaignModal();
    this.updateStats();
    
    const message = isScheduled 
      ? `¡Campaña programada exitosamente para el ${this.formatDate(this.campaignForm.date)} a las ${this.campaignForm.time}!`
      : `¡Campaña enviada exitosamente a ${this.selectedUsers.length} usuarios!`;
    
    alert(message);
  }

  saveDraft() {
    const campaign: EmailCampaign = {
      id: this.isEditMode ? this.currentCampaignId : this.campaigns.length + 1,
      name: this.campaignForm.name || 'Borrador sin título',
      subject: this.campaignForm.subject || 'Sin asunto',
      status: 'draft',
      recipients: this.selectedUsers.length,
      template: this.selectedTemplate,
      content: this.campaignForm.content,
      cta: this.campaignForm.cta
    };

    if (this.isEditMode) {
      const index = this.campaigns.findIndex(c => c.id === this.currentCampaignId);
      if (index > -1) {
        this.campaigns[index] = campaign;
      }
    } else {
      this.campaigns.unshift(campaign);
    }

    this.closeCampaignModal();
    this.updateStats();
    alert('¡Borrador guardado exitosamente!');
  }

  private validateForm(): boolean {
    return !!(this.campaignForm.name && 
             this.campaignForm.subject && 
             this.campaignForm.content && 
             this.selectedUsers.length > 0);
  }

  private createCampaign(isScheduled: boolean) {
    const newCampaign: EmailCampaign = {
      id: this.campaigns.length + 1,
      name: this.campaignForm.name,
      subject: this.campaignForm.subject,
      status: isScheduled ? 'scheduled' : 'sent',
      recipients: this.selectedUsers.length,
      template: this.selectedTemplate,
      content: this.campaignForm.content,
      cta: this.campaignForm.cta,
      sentDate: isScheduled ? undefined : new Date().toISOString().split('T')[0],
      scheduledDate: isScheduled ? this.campaignForm.date : undefined,
      openRate: isScheduled ? undefined : Math.floor(Math.random() * 30) + 60,
      clickRate: isScheduled ? undefined : Math.floor(Math.random() * 20) + 25
    };

    this.campaigns.unshift(newCampaign);
  }

  private updateCampaign() {
    const index = this.campaigns.findIndex(c => c.id === this.currentCampaignId);
    if (index > -1) {
      const campaign = this.campaigns[index];
      campaign.name = this.campaignForm.name;
      campaign.subject = this.campaignForm.subject;
      campaign.content = this.campaignForm.content;
      campaign.cta = this.campaignForm.cta;
      campaign.template = this.selectedTemplate;
      campaign.recipients = this.selectedUsers.length;
      
      if (this.campaignForm.date && this.campaignForm.time) {
        campaign.status = 'scheduled';
        campaign.scheduledDate = this.campaignForm.date;
      }
    }
  }

  duplicateCampaign(campaign: EmailCampaign) {
    const newCampaign: EmailCampaign = {
      ...campaign,
      id: this.campaigns.length + 1,
      name: `${campaign.name} (Copia)`,
      status: 'draft',
      recipients: 0,
      sentDate: undefined,
      scheduledDate: undefined,
      openRate: undefined,
      clickRate: undefined
    };

    this.campaigns.unshift(newCampaign);
    this.updateStats();
    alert('¡Campaña duplicada exitosamente!');
  }

  deleteCampaign(id: number) {
    if (confirm('¿Estás seguro de que quieres eliminar esta campaña?')) {
      this.campaigns = this.campaigns.filter(c => c.id !== id);
      this.updateStats();
      alert('Campaña eliminada exitosamente.');
    }
  }

  cancelScheduled(id: number) {
    if (confirm('¿Estás seguro de que quieres cancelar esta campaña programada?')) {
      const campaign = this.campaigns.find(c => c.id === id);
      if (campaign) {
        campaign.status = 'draft';
        campaign.scheduledDate = undefined;
      }
      this.updateStats();
      alert('Campaña cancelada y guardada como borrador.');
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
