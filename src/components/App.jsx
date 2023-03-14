import { Component } from 'react';
import styled from 'styled-components';
import { ContactForm } from './ContactForm/ContactForm';
import { Filter } from './Filter/Filter';
import { ContactList } from './ContactList/ContactList';

const CONTACTS_KEY = 'contacts';
export class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
    ],
    filters: {
      searchStr: '',
    },
  };
  componentDidMount() {
    const contacts = localStorage.getItem(CONTACTS_KEY);
    if (contacts && JSON.parse(contacts).length) {
      this.setState({
        contacts: JSON.parse(contacts),
      });
    }
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevState.contacts.length !== this.state.contacts.length) {
      localStorage.setItem(CONTACTS_KEY, JSON.stringify(this.state.contacts));
    }
  }

  handleChengeInput = str => {
    this.setState(prevState => ({
      filters: {
        ...prevState.filters,
        searchStr: str,
      },
    }));
  };

  handleDeleteUser = id => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== id),
    }));
  };

  handleCreateUser = contact => {
    this.setState(prevState => ({
      contacts: [contact, ...prevState.contacts],
    }));
    console.log(this.state.contacts);
  };

  render() {
    return (
      <PhonebookBox>
        <h1> Phonebook</h1>
        <ContactForm
          contacts={this.state.contacts}
          onUserCreate={this.handleCreateUser}
        />

        <h2> Contacts</h2>
        <Filter
          searchStr={this.state.filters.searchStr}
          onChangeInput={this.handleChengeInput}
        />
        <ContactList
          onDeleteUser={this.handleDeleteUser}
          filter={this.state.filters.searchStr}
          contacts={this.state.contacts}
        />
      </PhonebookBox>
    );
  }
}

const PhonebookBox = styled.div`
  padding: 30px;
`;
