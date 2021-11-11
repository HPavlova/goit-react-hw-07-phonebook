import { combineReducers } from 'redux';
import { createReducer } from '@reduxjs/toolkit';

import {
  fetchContact,
  addContact,
  deleteContact,
  changeFilter,
} from '../../redux/contacts';

const items = createReducer([], {
  [fetchContact.fulfilled]: (_, { payload }) => payload,
  [addContact.fulfilled]: (state, { payload }) => [...state, payload],
  [deleteContact.fulfilled]: (state, { payload }) =>
    state.filter(({ id }) => id !== payload),
});

const loading = createReducer(false, {
  [fetchContact.pending]: () => true,
  [fetchContact.fulfilled]: () => false,
  [fetchContact.rejected]: () => false,

  [addContact.pending]: () => true,
  [addContact.fulfilled]: () => false,
  [addContact.rejected]: () => false,

  [deleteContact.pending]: () => true,
  [deleteContact.fulfilled]: () => false,
  [deleteContact.rejected]: () => false,
});

const filter = createReducer('', {
  [changeFilter]: (_, { payload }) => payload,
});

const error = createReducer(null, {
  [fetchContact.rejected]: (_, action) => action.payload,
  [fetchContact.pending]: () => null,

  [addContact.rejected]: (_, action) => action.payload,
  [addContact.pending]: () => null,

  [deleteContact.rejected]: (_, action) => action.payload,
  [deleteContact.pending]: () => null,
});

export default combineReducers({ items, filter, loading, error });
