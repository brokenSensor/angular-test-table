import { Action, createReducer, on } from '@ngrx/store';
import {
  addRow,
  loadState,
  setSearchQuery,
  setSortQuery,
} from './table.actions';

export interface IData {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: {
    streetAddress: string;
    city: string;
    state: string;
    zip: string;
  };
  description?: string;
}

export interface ISortQuery {
  column: string;
  direction: string;
}

export interface ITableState {
  rows: IData[];
  searchQuery: string;
  sortQuery: ISortQuery;
}

export const initialState: ITableState = {
  rows: [],
  searchQuery: '',
  sortQuery: {
    column: '',
    direction: '',
  },
};

const _tableReducer = createReducer(
  initialState,
  on(loadState, (state) => {
    const ladedString = localStorage.getItem('tableState');
    if (!ladedString) return state;

    const loadedState = JSON.parse(ladedString);

    return loadedState;
  }),

  on(addRow, (state, payload) => {
    const newState = {
      ...state,
      rows: [payload, ...state.rows],
    };
    localStorage.setItem('tableState', JSON.stringify(newState));

    return newState;
  }),

  on(setSearchQuery, (state, { searchQuery }) => ({ ...state, searchQuery })),

  on(setSortQuery, (state, { sortQuery }) => ({ ...state, sortQuery }))
);

export function tableReducer(state: ITableState | undefined, action: Action) {
  return _tableReducer(state, action);
}
