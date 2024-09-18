import React from "react";
import { Link } from "react-router-dom";
import vtu from "/src/assets/vtu-main.png";
import bills from "/src/assets/bills-main.png";
import cards from "/src/assets/cards-main.png";
import rewards from "/src/assets/rewards-main.png";
function Services() {
  const services = [
    {
      title: "VTU Services",
      intro:
        "Recharge airtime and data instantly with our seamless VTU service!",
      icon: vtu,
      path: "/services/vtu",
    },
    {
      title: "Bills Payment",
      intro: "Pay your bills quickly and securely, all in one place!",
      icon: bills,
      path: "/services/bills",
    },
    {
      title: "Gift Card Services",
      intro: "Buy, sell, and trade gift cards with ease and instant payouts!",
      icon: cards,
      path: "/services/gift-card",
    },
    {
      title: "My Rewards",
      intro:
        "Unlock exclusive rewards and track your points for exciting benefits!",
      icon: rewards,
      path: "/services/rewards",
    },
  ];
  return (
    <section className="services">
      <h1>Services</h1>
      {services.map((service, index) => (
        <Link to={service.path} className="service-card">
          <div>
            <img
              src={service.icon}
              alt={`${service.title} icon`}
              className="service-icon"
            />
            <b>{service.title}</b>
          </div>
          <small>{service.intro}</small>
        </Link>
      ))}
    </section>
  );
}

export default Services;
