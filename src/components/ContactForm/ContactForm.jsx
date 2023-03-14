import React, { Component } from 'react';
import styled from 'styled-components';
import { nanoid } from 'nanoid';
import PropTypes from 'prop-types';

export class ContactForm extends Component {
  state = {
    id: nanoid(),
    name: '',
    number: '',
  };

  getNewId = () => {
    this.setState(prevState => ({
      ...prevState,
      id: nanoid(),
    }));
  };

  clearStste = () => {
    this.setState(prevState => ({
      name: '',
      number: '',
    }));
  };

  isUserNameIncludesContacts = () => {
    return this.props.contacts.find(
      contact => contact.name.toLowerCase() === this.state.name.toLowerCase()
    );
  };

  handleUserCreate = evt => {
    evt.preventDefault();
    this.getNewId();

    if (this.isUserNameIncludesContacts() === undefined) {
      this.props.onUserCreate(this.state);
      this.clearStste();
    } else {
      alert(`${this.state.name} is already in contacts!`);
      this.clearStste();
    }
  };

  render() {
    return (
      <ContactFormBox onSubmit={this.handleUserCreate}>
        <ContactLabel>
          Name
          <Contactinput
            onChange={event => this.setState({ name: event.target.value })}
            value={this.state.name}
            type="text"
            name="name"
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я
          ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters,
          apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles
          de Batz de Castelmore d'Artagnan"
            required
          />
        </ContactLabel>
        <ContactLabel>
          Number
          <Contactinput
            onChange={event => this.setState({ number: event.target.value })}
            value={this.state.number}
            type="tel"
            name="number"
            pattern="\+?\d{(1, 4)}?[-.\s]?\(?\d{(1, 3)}
          ?\)?[-.\s]?\d{(1, 4)}[-.\s]?\d{(1, 4)}[-.\s]?\d{(1, 9)}"
            title="Phone
          number must be digits and can contain spaces, dashes, parentheses and
          can start with +"
            required
          />
        </ContactLabel>
        <ContactButton>Add contact</ContactButton>
      </ContactFormBox>
    );
  }
}

ContactForm.propTypes = {
  handleCreateUser: PropTypes.func.isRequired,
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string,
      number: PropTypes.string,
    }).isRequired
  ),
};

const ContactFormBox = styled.form`
  width: 400px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  border: 1px solid black;
`;

const ContactLabel = styled.label`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

const Contactinput = styled.input`
  height: 25px;
`;

const ContactButton = styled.button`
  display: block;
  width: 120px;
  border-radius: 3px;
  cursor: pointer;
  padding: 5px;
  box-shadow: 3px 5px 5px -2px rgba(6, 6, 6, 0.316);
  &:hover {
    box-shadow: 3px 5px 5px -2px rgba(94, 84, 182, 0.7);
  }
  &:focus {
    scale: 0.95;
  }
`;
