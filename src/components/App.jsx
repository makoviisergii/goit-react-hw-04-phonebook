import styled from 'styled-components';
import { ContactForm } from './ContactForm/ContactForm';
import { Filter } from './Filter/Filter';
import { ContactList } from './ContactList/ContactList';
import { useState, useEffect } from 'react';

const CONTACTS_KEY = 'contacts';

export const App = () => {
  const [contacts, setContacts] = useState([
    { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
    { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
    { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
  ]);

  const [searchStr, setSearchStr] = useState('');

  useEffect(() => {
    const contacts = localStorage.getItem(CONTACTS_KEY);
    if (contacts && JSON.parse(contacts).length) {
      setContacts(JSON.parse(contacts));
    }
  }, []);

  // state = {
  //   contacts: [
  //     { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
  //     { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
  //     { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
  //   ],
  //   filters: {
  //     searchStr: '',
  //   },
  // };

  // componentDidMount() {
  //   const contacts = localStorage.getItem(CONTACTS_KEY);
  //   if (contacts && JSON.parse(contacts).length) {
  //     this.setState({
  //       contacts: JSON.parse(contacts),
  //     });
  //   }
  // }

  // componentDidUpdate(prevProps, prevState) {
  //   if (prevState.contacts.length !== this.state.contacts.length) {
  //     localStorage.setItem(CONTACTS_KEY, JSON.stringify(this.state.contacts));
  //   }
  // }

  useEffect(() => {
    localStorage.setItem(CONTACTS_KEY, JSON.stringify(contacts));
  }, [contacts]);

  const handleChengeInput = str => setSearchStr(str);

  const handleDeleteUser = id => {
    setContacts(contacts.filter(contact => contact.id !== id));
  };

  const handleCreateUser = contact => {
    setContacts([contact, ...contacts]);
  };

  return (
    <PhonebookBox>
      <h1> Phonebook</h1>
      <ContactForm contacts={contacts} onUserCreate={handleCreateUser} />

      <h2> Contacts</h2>
      <Filter searchStr={searchStr} onChangeInput={handleChengeInput} />
      <ContactList
        onDeleteUser={handleDeleteUser}
        filter={searchStr}
        contacts={contacts}
      />
    </PhonebookBox>
  );
};

const PhonebookBox = styled.div`
  padding: 30px;
`;
