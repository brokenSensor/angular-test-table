import { createAction, props } from '@ngrx/store';
import { IData, ISortQuery } from './table.reducer';

export const loadState = createAction('[Table Component] LoadState');

export const addRow = createAction('[Table Component] AddRow', props<IData>());

export const setSearchQuery = createAction(
  '[Table Component] SetSearchQuery',
  props<{ searchQuery: string }>()
);

export const setSortQuery = createAction(
  '[Table Component] SetSortQuery',
  props<{
    sortQuery: ISortQuery;
  }>()
);
