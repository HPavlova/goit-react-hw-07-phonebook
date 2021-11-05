import { useSelector, useDispatch } from 'react-redux';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import styles from './ContactList.module.css';

import {
  fetchContact,
  deleteContact,
} from '../../redux/contacts/contacts-operations';
import { getVisibleContacts } from '../../redux/contacts/contacts-selectors';

function ContactList() {
  const contacts = useSelector(getVisibleContacts);
  const dispatch = useDispatch();

  return (
    // {isLoadingContacts && <h1>Загружается...</h1>}
    <ul className={styles.ContactList}>
      {contacts.map(contact => (
        <li className={styles.ContactList__item} key={contact.id}>
          {contact.name + ': ' + contact.number}
          <button
            type="button"
            className={styles.ContactList__button}
            name="delete"
            onClick={() => dispatch(deleteContact(contact.id))}
          >
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
}

ContactList.propTypes = {
  onDeleteContact: propTypes.func,
  contacts: propTypes.arrayOf(propTypes.object),
  contact: propTypes.shape({
    id: propTypes.string.isRequired,
    name: propTypes.string.isRequired,
    number: propTypes.string.isRequired,
  }),
};

const mapStatetoProps = state => ({
  isLoadingContacts: state.contacts.loading,
});

const mapDispatchToProps = dispatch => ({
  fetchContacts: () => dispatch(fetchContact()),
});

export default connect(mapStatetoProps, mapDispatchToProps)(ContactList);
