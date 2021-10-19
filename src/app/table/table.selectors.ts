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
    let sortedRows;

    if (selectSortQuery.column === '' || selectSortQuery.direction === '') {
      return selectRows;
    } else {
      sortedRows = [...selectRows].sort((a, b) => {
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
