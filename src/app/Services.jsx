import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../auth/AuthContext";
import { ServicesIcons } from "../assets/icons/servicesIcons";
function Services() {
  const { billsAPI, PK } = useContext(AuthContext);
  const services = [
    {
      title: "VTU Services",
      intro:
        "Recharge airtime and data instantly with our seamless VTU service!",
      icon: ServicesIcons.vtuServices,
      path: "/services/vtu",
    },
    {
      title: "Bills Payment",
      intro: "Pay your bills quickly and securely, all in one place!",
      icon: ServicesIcons.billsServices,
      path: "/services/bills",
    },
    {
      title: "Gift Card Services",
      intro: "Buy, sell, and trade gift cards with ease and instant payouts!",
      icon: ServicesIcons.giftcards,
      path: "/services/gift-card",
    },
    {
      title: "My Rewards",
      intro:
        "Unlock exclusive rewards and track your points for exciting benefits!",
      icon: ServicesIcons.rewards,
      path: "/services/rewards",
    },
  ];

  useEffect(() => {
    const bouquets = async () => {
      try {
        const response = await fetch(
          "https://sandbox.payscribe.ng/api/v1/bouquets/?service=dstv",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${PK}`,
              "Content-Type": "application/json", // Adjust as necessary
            },
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();
        setData(result);
      } catch (err) {
        console.log(err.message);
      }
    };
    bouquets();
  }, []);

  return (
    <section className="services">
      <h1>Services</h1>
      {services.map((service, index) => (
        <Link to={service.path} className="service-card">
          <div>
            {service.icon}
            <b>{service.title}</b>
          </div>
          <small>{service.intro}</small>
        </Link>
      ))}
    </section>
  );
}

export default Services;
