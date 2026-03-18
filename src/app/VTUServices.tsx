import React, { useEffect, useState } from "react";
import signal from "../assets/signal.png";
import data from "../assets/data.png";
import { dataBundles } from "../../test";
import { fetchFromMobileVTU } from "../../utils/fetchAPI";
import { useBackNavigation } from "../hooks/useBackNavigation";
function VTUServices() {
  const [contact, setContact] = useState("");
  const networks = [
    {
      icon: "https://en.wikipedia.org/wiki/MTN_Group#/media/File:New-mtn-logo.jpg",
      name: "MTN",
    },
    {
      icon: "https://upload.wikimedia.org/wikipedia/commons/3/3a/Airtel_logo-01.png",
      name: "Airtel",
    },
    {
      icon: "https://en.wikipedia.org/wiki/MTN_Group#/media/File:New-mtn-logo.jpg",
      name: "GLO",
    },
    {
      icon: "https://en.wikipedia.org/wiki/MTN_Group#/media/File:New-mtn-logo.jpg",
      name: "9Mobile",
    },
  ];
  const dataHeader = [
    "Daily",
    "Weekly",
    "Monthly",
    "2-Months",
    "3-Months",
    "6-Months",
    "1-Year",
  ];
  const goBack = useBackNavigation();
  const [active, setActive] = useState(0);
  const [hTab, setHtab] = useState(0);
  const [network, setNetwork] = useState(networks[0]);
  const [open, setOpen] = useState(false);
  const tabs = [
    { text: "Data", icon: data },
    { text: "Airtime", icon: signal },
  ];
  const updateNetwork = (selectedNetwork) => {
    setNetwork(selectedNetwork);
    setOpen(false);
  };

  const updateContact = (input) => {
    if (input.length >= 12) return;
    setContact(input.replace(/[^0-9]/g, ""));
  };

  useEffect(() => {
    if (contact.length === 11) {
      const getOperator = async () => {
        try {
          const response = await fetchFromMobileVTU(
            { phone: contact },
            "number_operator",
          );
          if (response.status) {
            console.log(response);
          }
        } catch (err) {
          console.log(err);
        }
      };
      getOperator();
    }
  }, [contact]);

  return (
    <section className="vtu-services">
      <header className="vtu-services-header">
        <button className="back" onClick={goBack}>
          <i className="fas fa-chevron-left"></i>
        </button>
        <h3>VTU Services</h3>
      </header>
      <section className="inner-vtu">
        <div className="main-button">
          {tabs.map((tab, index) => (
            <button
              key={index}
              className={active === index ? "active" : ""}
              onClick={() => setActive(index)}
            >
              <img src={tab.icon} alt="" /> {tab.text}
            </button>
          ))}
        </div>
        <div className="number">
          <div className="network-wrapper">
            <div className="change-network" onClick={() => setOpen(true)}>
              <img src={network.icon} alt="" />
              <i className="fas fa-chevron-down"></i>
            </div>
            <div className={`networks ${open ? "active" : ""}`}>
              {networks.map((item) => (
                <button key={item.name} onClick={() => updateNetwork(item)}>
                  <img src={item.icon} alt="" />
                  {item.name}
                </button>
              ))}
            </div>
          </div>
          <input
            type="tel"
            name="phone"
            id="phone"
            value={contact}
            onChange={(e) => updateContact(e.target.value)}
            pattern="[0-9]*"
            inputMode="numeric"
            placeholder="Enter phone number"
          />
          {/*<button
            className="open-contact"
            onClick={() => setContactsModal(true)}
          >
            <i className="fas fa-address-book"></i>
          </button>*/}
        </div>
        <div className="loan-container">
          <p>VTU Loan</p>
          <small>
            Out of balance but need to top up your phone? worry no more, you can
            borrow airtime or data and pay back later when you top up your
            account balance.
          </small>
          <button>Borrow Now</button>
        </div>
        {active === 0 ? (
          <section className="data">
            <div className="data-header">
              {dataHeader.map((header, index) => (
                <span
                  key={index}
                  className={hTab === index ? "active" : ""}
                  onClick={() => setHtab(index)}
                >
                  {header}
                </span>
              ))}
            </div>
            <div className="data-wrapper">
              {dataBundles.map((bundle) => (
                <div
                  className="data-card"
                  key={`${bundle.bundle}-${bundle.period}-${bundle.price}`}
                >
                  <b>{bundle.bundle}</b>
                  <small>{bundle.period}</small>
                  <small>
                    {bundle.price.toLocaleString("en-NG", {
                      style: "currency",
                      currency: "NGN",
                    })}
                  </small>
                </div>
              ))}
            </div>
          </section>
        ) : (
          <section className="airtime">
            <h3>Top-Up</h3>
            <input
              type="number"
              name="amount"
              id="amount"
              className="top-up-input"
              placeholder="Min: 50   Max: 10000"
            />
            <div className="data-wrapper">
              {dataBundles.slice(0, 3).map((bundle) => (
                <div
                  className="data-card"
                  key={`airtime-${bundle.bundle}-${bundle.period}-${bundle.price}`}
                >
                  <b>{bundle.bundle}</b>
                  <small>{bundle.period}</small>
                  <small>
                    {bundle.price.toLocaleString("en-NG", {
                      style: "currency",
                      currency: "NGN",
                    })}
                  </small>
                </div>
              ))}
            </div>
            <button className="continue-btn">Continue</button>
          </section>
        )}
      </section>
    </section>
  );
}

export default VTUServices;
