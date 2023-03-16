import React from 'react';
import styled from 'styled-components';
import { nanoid } from 'nanoid';
import PropTypes from 'prop-types';
import { useState } from 'react';

export const ContactForm = props => {
  const [id, setId] = useState(nanoid());
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const getNewId = () => {
    setId(nanoid());
  };

  const clearStste = () => {
    setName('');
    setNumber('');
  };

  // const clearStste = () => {
  //   this.setState(prevState => ({
  //     name: '',
  //     number: '',
  //   }));
  // };

  const isUserNameIncludesContacts = () => {
    return props.contacts.find(
      contact => contact.name.toLowerCase() === name.toLowerCase()
    );
  };

  const handleUserCreate = evt => {
    evt.preventDefault();
    getNewId();

    if (isUserNameIncludesContacts() === undefined) {
      props.onUserCreate({ id, name, number });
      clearStste();
    } else {
      alert(`${name} is already in contacts!`);
      clearStste();
    }
  };

  return (
    <ContactFormBox onSubmit={handleUserCreate}>
      <ContactLabel>
        Name
        <Contactinput
          onChange={event => setName(event.target.value)}
          value={name}
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
          onChange={event => setNumber(event.target.value)}
          value={number}
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
};

ContactForm.propTypes = {
  handleCreateUser: PropTypes.func,
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
