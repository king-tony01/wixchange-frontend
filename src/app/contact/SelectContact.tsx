import React, { useEffect, useState } from "react";

function SelectContact({ action, setContact }) {
  const [contacts, setContacts] = useState([]);
  useEffect(() => {
    const getContacts = async () => {
      if (!("contacts" in navigator)) {
        console.log("Contacts API not supported");
        return;
      }
      try {
        const cont = await navigator.contacts.select(["name", "tel"], {
          multiple: true,
        });
        setContacts(cont);
      } catch (err) {
        console.log(err);
        alert(err);
      }
    };
    getContacts;
  }, []);
  return (
    <section className="select-contact-modal">
      <header className="card-market-header">
        <button onClick={() => action(false)}>
          <i className="fas fa-chevron-left"></i>
        </button>
        <h3>Select a contact</h3>
      </header>
      <section className="contacts-body">
        <section className="contacts-sections">
          <h4>A</h4>
          <div>
            {contacts.map((contact, index) => (
              <button key={index}>
                <p>Amuche Anthony</p>
                <small>09063213825</small>
              </button>
            ))}
          </div>
        </section>
      </section>
    </section>
  );
}

export default SelectContact;
