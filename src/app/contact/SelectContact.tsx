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
      }
    };
    getContacts();
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
              <button
                key={`${contact?.name?.[0] ?? "contact"}-${index}`}
                onClick={() => {
                  const phone = contact?.tel?.[0] ?? "";
                  if (setContact && phone) setContact(phone.replace(/\D/g, ""));
                  action(false);
                }}
              >
                <p>{contact?.name?.[0] ?? "Unknown Contact"}</p>
                <small>{contact?.tel?.[0] ?? "No number"}</small>
              </button>
            ))}
          </div>
        </section>
      </section>
    </section>
  );
}

export default SelectContact;
