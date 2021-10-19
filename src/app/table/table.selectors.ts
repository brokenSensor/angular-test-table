import { createSelector } from '@ngrx/store';
import { AppState } from '../app.state';
import { IData, ISortQuery } from './table.reducer';

export const selectFilteredRows = createSelector(
  (state: AppState) => state.table.rows,
  (state: AppState) => state.table.searchQuery,
  (state: AppState) => state.table.sortQuery,
  (
    selectRows: Array<IData>,
    selectSearchQuery: string,
    selectSortQuery: ISortQuery
  ) => {
    let filteredRows;
    let sortedRows;

    if (selectSearchQuery !== '') {
      filteredRows = [...selectRows].filter((value) => {
        if (
          String(value.id)
            .toLowerCase()
            .includes(selectSearchQuery.toLowerCase()) ||
          String(value.firstName)
            .toLowerCase()
            .includes(selectSearchQuery.toLowerCase()) ||
          String(value.lastName)
            .toLowerCase()
            .includes(selectSearchQuery.toLowerCase()) ||
          String(value.email)
            .toLowerCase()
            .includes(selectSearchQuery.toLowerCase()) ||
          String(value.phone)
            .toLowerCase()
            .includes(selectSearchQuery.toLowerCase())
        ) {
          return true;
        } else return false;
      });
    } else {
      filteredRows = selectRows;
    }

    if (selectSortQuery.column === '' || selectSortQuery.direction === '') {
      return filteredRows;
    } else {
      sortedRows = [...filteredRows].sort((a, b) => {
        const res =
          (a as any)[selectSortQuery.column] <
          (b as any)[selectSortQuery.column]
            ? -1
            : (a as any)[selectSortQuery.column] >
              (b as any)[selectSortQuery.column]
            ? 1
            : 0;
        return selectSortQuery.direction === 'asc' ? res : -res;
      });
    }

    return sortedRows;
  }
);
