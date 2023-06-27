import React, { useState, useEffect } from "react";

import { ContactForm } from "../../components/contactForm/ContactForm";
import { TileList } from "../../components/tileList/TileList";

export const ContactsPage = ({contacts, addContact}) => {
  /* Define state variables for contact info and duplicate check */
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email , setEmail] = useState('');
  const [isDuplicate, setIsDuplicate] = useState(false)

  const handleNameChange = (e) => {
    const newName = e.target.value;
    setName(newName);
    setIsDuplicate(contacts.some(contact => contact.name === newName));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    /* Add contact info and clear data if the contact name is not a duplicate*/
    if (isDuplicate) {
      addContact(name, phone, email);
      setName('');
      setPhone('');
      setEmail('');
    }
  };

  /* Using hooks, check for contact name in the contacts array variable in props */
  useEffect(() => {
    const nameIsDuplicate = () => {
      const found = contacts.find((contact) => contact.name === name);
      if (found !== undefined) {
        return true;
      }
      return false;
    };

    if (nameIsDuplicate()) {
      setIsDuplicate(true);
    } else {
      setIsDuplicate(false);
    }
  }, [name, contacts, isDuplicate]);


  return (
    <div>
      <section>
        <h2>Add Contact</h2> 
        <ContactForm 
          name={name}
          phone={phone}
          email={email}
          handleNameChange={handleNameChange}
          handleSubmit={handleSubmit}
          setPhone={setPhone}
          setEmail={setEmail}
          isDuplicate={isDuplicate}
        />
      </section>
      <hr />
      <section>
        <h2>Contacts</h2>
        <TileList tiles={contacts}/>
      </section>
    </div>
  );
};
