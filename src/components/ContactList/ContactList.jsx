import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import propTypes from 'prop-types';
import styles from './ContactList.module.css';

import {
  fetchContact,
  deleteContact,
  getVisibleContacts,
  getLoading,
} from '../../redux/contacts';

export default function ContactList() {
  const contacts = useSelector(getVisibleContacts);
  const loader = useSelector(getLoading);
  const dispatch = useDispatch();

  useEffect(() => dispatch(fetchContact()), [dispatch]);

  return (
    !loader && <h1>Загружается...</h1> &&
    contacts && (
      <ul className={styles.ContactList}>
        {contacts.map(contact => (
          <li className={styles.ContactList__item} key={contact.id}>
            {contact.name + ': ' + contact.phone}
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
    )
  );
}

ContactList.propTypes = {
  onDeleteContact: propTypes.func,
  contacts: propTypes.arrayOf(propTypes.object),
  contact: propTypes.shape({
    id: propTypes.string.isRequired,
    name: propTypes.string.isRequired,
    phone: propTypes.string.isRequired,
  }),
};

// =====  previous version ===

// const mapStatetoProps = state => ({
//   isLoadingContacts: state.contacts.loading,
// });

// const mapDispatchToProps = dispatch => ({
//   fetchContacts: () => dispatch(fetchContact()),
// });

// export default connect(mapStatetoProps, mapDispatchToProps)(ContactList);
