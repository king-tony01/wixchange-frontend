import React, { useEffect, useState } from "react";

function ErrorModal({ className, title, message, icon, state, action }) {
  const [active, setActive] = useState(false);
  useEffect(() => {
    if (state) {
      setActive(true); // Show the modal when state is true
      const timer = setTimeout(() => {
        setActive(false); // Hide after 5 seconds
        action({
          className: "",
          title: "",
          message: "",
          icon: "",
          active: false,
        });
      }, 5000);

      // Cleanup function to clear the timer
      return () => clearTimeout(timer);
    } else {
      setActive(false);
    }
  }, [state]);

  return (
    <section className={`error-modal ${active ? className : ""}`}>
      <div>
        <i className={`fas fa-${icon}`}></i>
        <h4>{title}</h4>
      </div>
      <small>{message}</small>
    </section>
  );
}

export default ErrorModal;
