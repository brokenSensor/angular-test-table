import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Store } from '@ngrx/store';
import { AppState } from '../app.state';
import { SortEvent } from '../sortable.directive';
import { loadState, setSearchQuery, setSortQuery } from './table.actions';
import { IData } from './table.reducer';
import { selectFilteredRows } from './table.selectors';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.sass'],
})
export class TableComponent {
  rows$ = this.store.select(selectFilteredRows);
  sortQuery$ = this.store.select((store) => store.table.sortQuery);

  page = 1;
  pageSize = 10;
  dataItems = 0;
  originalRows: IData[] = [];
  paginatedRows: IData[] = [];
  searchTerm = '';

  constructor(private modalService: NgbModal, private store: Store<AppState>) {
    this.store.dispatch(loadState());
    this.rows$.subscribe((event) => {
      this.dataItems = event.length;
      this.originalRows = event;
      this.refreshData();
    });
  }

  open(content: any) {
    this.modalService.open(content, {
      ariaLabelledBy: 'modal-basic-title',
      size: 'xl',
    });
  }

  refreshData() {
    this.paginatedRows = this.originalRows.slice(
      (this.page - 1) * this.pageSize,
      (this.page - 1) * this.pageSize + this.pageSize
    );
  }

  onSort({ column, direction }: SortEvent) {
    this.store.dispatch(setSortQuery({ sortQuery: { column, direction } }));
  }

  onSearch() {
    this.store.dispatch(setSearchQuery({ searchQuery: this.searchTerm }));
  }
}
