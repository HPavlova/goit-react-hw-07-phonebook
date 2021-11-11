import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

axios.defaults.baseURL = 'https://618d5076fe09aa00174406a2.mockapi.io';

const fetchContact = createAsyncThunk('contacts/fetchContact', async () => {
  fetchContact.pending();
  try {
    const { data } = await axios.get('/contacts');
    console.log(data);
    return data;
  } catch (error) {
    fetchContact.rejected(error);
  }
});

const addContact = createAsyncThunk('contacts/addContact', async contact => {
  addContact.pending();
  try {
    const { data } = await axios.post('/contacts', contact);
    console.log(data);
    return data;
  } catch (error) {
    addContact.rejected(error);
  }
});

const deleteContact = createAsyncThunk('contacts/deleteContact', async id => {
  deleteContact.pending();
  try {
    await axios.delete(`/contacts/${id}`);

    return id;
  } catch (error) {
    deleteContact.rejected(error);
  }
});

export { fetchContact, addContact, deleteContact };

// =====  previous version ===
// const fetchContact = () => async dispatch => {
//   dispatch(actions.fetchContactRequest());
//   console.log(dispatch(actions.fetchContactRequest()));

//   try {
//     const { data } = await axios.get('/contacts');
//     dispatch(actions.fetchContactSuccess(data));
//   } catch (error) {
//     dispatch(actions.fetchContactError(error));
//   }
// };

// const addContact = (name, number) => dispatch => {
// const contact = {
//   name,
//   number,
//   completed: false,
// };

//   dispatch(actions.addContactRequest());

//   axios
//     .post('/contacts', contact)
//     .then(({ data }) => dispatch(actions.addContactSuccess(data)))
//     .catch(error => dispatch(actions.addContactError(error)));
// };

// const deleteContact = id => dispatch => {
//   dispatch(actions.deleteContactRequest());

//   axios
//     .delete(`/contacts/${id}`)
//     .then(() => dispatch(actions.deleteContactSuccess(id)))
//     .catch(error => dispatch(actions.deleteContactError(error)));
// };
