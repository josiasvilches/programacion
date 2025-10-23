import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface PaginationInfo {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
}

@Component({
  selector: 'app-pagination',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PaginationComponent {
  @Input() paginationInfo: PaginationInfo = {
    currentPage: 1,
    totalPages: 1,
    totalItems: 0,
    itemsPerPage: 10
  };

  @Output() pageChange = new EventEmitter<number>();

  goToPage(page: number): void {
    if (page >= 1 && page <= this.paginationInfo.totalPages && page !== this.paginationInfo.currentPage) {
      this.pageChange.emit(page);
    }
  }

  goToPreviousPage(): void {
    if (this.paginationInfo.currentPage > 1) {
      this.goToPage(this.paginationInfo.currentPage - 1);
    }
  }

  goToNextPage(): void {
    if (this.paginationInfo.currentPage < this.paginationInfo.totalPages) {
      this.goToPage(this.paginationInfo.currentPage + 1);
    }
  }

  goToFirstPage(): void {
    if (this.paginationInfo.currentPage !== 1) {
      this.goToPage(1);
    }
  }

  goToLastPage(): void {
    if (this.paginationInfo.currentPage !== this.paginationInfo.totalPages) {
      this.goToPage(this.paginationInfo.totalPages);
    }
  }

  getPageNumbers(): number[] {
    const { currentPage, totalPages } = this.paginationInfo;
    const pages: number[] = [];
    const maxPagesToShow = 5;

    if (totalPages <= maxPagesToShow) {
      // Mostrar todas las páginas si son pocas
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Mostrar páginas alrededor de la actual
      let startPage = Math.max(1, currentPage - 2);
      let endPage = Math.min(totalPages, currentPage + 2);

      // Ajustar si estamos cerca del inicio
      if (currentPage <= 3) {
        endPage = Math.min(maxPagesToShow, totalPages);
      }

      // Ajustar si estamos cerca del final
      if (currentPage >= totalPages - 2) {
        startPage = Math.max(1, totalPages - maxPagesToShow + 1);
      }

      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }
    }

    return pages;
  }

  getStartItem(): number {
    return (this.paginationInfo.currentPage - 1) * this.paginationInfo.itemsPerPage + 1;
  }

  getEndItem(): number {
    const end = this.paginationInfo.currentPage * this.paginationInfo.itemsPerPage;
    return Math.min(end, this.paginationInfo.totalItems);
  }
}
