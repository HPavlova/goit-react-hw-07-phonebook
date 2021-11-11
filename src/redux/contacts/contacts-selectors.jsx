import { createSelector } from 'reselect';

export const getAllContacts = state => state.contacts.items;
export const getFilter = state => state.contacts.filter;
export const getLoading = state => state.contacts.loading;

export const getVisibleContacts = createSelector(
  [getAllContacts, getFilter],
  (items, filter) => {
    const normalizedFilter = filter.toLowerCase();

    return items.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter),
    );
  },
);
