import { createSelector } from '@ngrx/store';
import { AppState } from '../app.state';
import { IData } from './table.reducer';

export const selectFilteredRows = createSelector(
  (state: AppState) => state.table.rows,
  (state: AppState) => state.table.searchQuery,
  (state: AppState) => state.table.sortQuery,
  (
    selectRows: Array<IData>,
    selectSearchQuery: string,
    selectSortQuery: string
  ) => {
    const filter = selectSearchQuery.split(' ');

    return selectRows;
  }
);
