// import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';

import * as actions from './contacts-actions';

axios.defaults.baseURL = 'http://localhost:4040/';

const fetchContact = () => async dispatch => {
  dispatch(actions.fetchContactRequest());

  try {
    const { data } = await axios.get('/contacts');
    dispatch(actions.fetchContactSuccess(data));
  } catch (error) {
    dispatch(actions.fetchContactError(error));
  }

  // axios
  //   .get('/contacts')
  //   .then(data => dispatch(actions.fetchContactSuccess(data)))
  //   .catch(error => dispatch(actions.fetchContactError(error)));
};

const addContact = (name, number) => dispatch => {
  const contact = {
    // id: uuidv4(),
    name,
    number,
    completed: false,
  };

  dispatch(actions.addContactRequest());

  axios
    .post('/contacts', contact)
    .then(({ data }) => dispatch(actions.addContactSuccess(data)))
    .catch(error => dispatch(actions.addContactError(error)));
};

const deleteContact = id => dispatch => {
  dispatch(actions.deleteContactRequest());

  axios
    .delete(`/contacts/${id}`)
    .then(() => dispatch(actions.deleteContactSuccess(id)))
    .catch(error => dispatch(actions.deleteContactError(error)));
};

export { fetchContact, addContact, deleteContact };
