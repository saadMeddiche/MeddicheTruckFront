import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-base-pagination',
  templateUrl: './base-pagination.component.html',
  styleUrl: './base-pagination.component.scss'
})
export class BasePaginationComponent {

  @Input() page: number = 0;

  @Input() size: number = 5;

  @Input() totalPages: number = 0;

  @Output() pageChange = new EventEmitter<number>();
  alertParentThatPageChange(n: number){
    this.pageChange.emit(n);
  }

  onPageChange(n: number) {
    this.page += n;
    this.alertParentThatPageChange(this.page);
  }

  isPreviousDisabled(){
    return this.page === 0 || this.totalPages == 0
  }

  isNextDisabled(){
    return this.page === this.totalPages - 1 || this.totalPages == 0
  }

  currentPage(){
    return this.totalPages != 0 ? this.page + 1 : 0;
  }

}
