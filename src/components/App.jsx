import { Component } from 'react';
import { nanoid } from 'nanoid';
import { Container, Title, ContcTitle, Section } from './Phonebook.styled';
import { ContactForm } from './contactForm/ContactForm';
import { Filter } from './filter/Filter';
import { ContactList } from './contactList/ContactList';

export class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

  handleSubmit = (values, { resetForm }) => {
    if (
      this.state.contacts.find(
        contact =>
          contact.name.toLowerCase().trim() === values.name.toLowerCase().trim()
      )
    ) {
      alert(`${values.name} is already in contacts`);
      return;
    }
    const newContact = {
      id: nanoid(5),
      name: values.name,
      number: values.number,
    };
    this.setState(prevState => ({
      contacts: [...prevState.contacts, newContact],
    }));
    resetForm();
  };

  onChangeFilter = evt => {
    this.setState({
      filter: evt.currentTarget.value,
    });
  };

  findContact = () => {
    const { filter, contacts } = this.state;
    return contacts.filter(contact =>
      contact.name.toLowerCase().trim().includes(filter.toLowerCase().trim())
    );
  };

  handleDeleteContact = id => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== id),
    }));
  };

  render() {
    const { filter } = this.state;
    const results = this.findContact();
    return (
      <Container>
        <Section>
          <Title>Phonebook</Title>
          <ContactForm onHandleSubmit={this.handleSubmit} />
          <ContcTitle>Contacts</ContcTitle>
          <Filter filter={filter} onChangeFilter={this.onChangeFilter} />
          <ContactList
            contacts={results}
            handleDeleteContact={this.handleDeleteContact}
          />
        </Section>
      </Container>
    );
  }
}
