import { ContactItem } from 'components/ContactItem/ContactItem';

import PropTypes from 'prop-types';

export const ContactList = ({ onDeleteUser, contacts, filter }) => {
  return (
    <ul>
      {filter
        ? contacts
            .filter(contact => contact.name.toLowerCase().includes(filter))
            .map(contact => (
              <ContactItem
                onDeleteUser={onDeleteUser}
                key={contact.id}
                contact={contact}
              />
            ))
        : contacts.map(contact => (
            <ContactItem
              onDeleteUser={onDeleteUser}
              key={contact.id}
              contact={contact}
            />
          ))}
    </ul>
  );
};

ContactList.propTypes = {
  onDeleteUser: PropTypes.func.isRequired,
  filter: PropTypes.string.isRequired,
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string,
      number: PropTypes.string,
    }).isRequired
  ),
};
