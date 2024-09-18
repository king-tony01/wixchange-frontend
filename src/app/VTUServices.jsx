import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import signal from "/src/assets/signal.png";
import data from "/src/assets/data.png";
import { dataBundles } from "../../test";
function VTUServices() {
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
  const navigate = useNavigate();
  const [active, setActive] = useState(0);
  const [hTab, setHtab] = useState(0);
  const [network, setNetwork] = useState(networks[0]);
  const [open, setOpen] = useState(false);
  const [back, setBack] = useState(false);
  const tabs = [
    { text: "Data", icon: data },
    { text: "Airtime", icon: signal },
  ];
  const updateNetwork = () => {
    setOpen(false);
  };

  useEffect(() => {
    if (back) {
      navigate(-1);
    }
  }, [navigate, back]);
  return (
    <section className="vtu-services">
      <header className="vtu-services-header">
        <button className="back" onClick={() => setBack(true)}>
          <i className="fas fa-chevron-left"></i>
        </button>
        <h3>VTU Services</h3>
      </header>
      <section className="inner-vtu">
        <div className="main-button">
          {tabs.map((tab, index) => (
            <button
              key={index}
              className={active == index ? "active" : ""}
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
              {networks.map((network, index) => (
                <button key={index} onClick={updateNetwork}>
                  <img src={network.icon} alt="" />
                  {network.name}
                </button>
              ))}
            </div>
          </div>
          <input type="tel" name="phone" id="phone" value={"09063213825"} />
          <button className="open-contact">
            <i className="fas fa-address-book"></i>
          </button>
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
        {active == 0 ? (
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
              {dataBundles.map((data) => (
                <div className="data-card">
                  <b>{data.bundle}</b>
                  <small>{data.period}</small>
                  <small>
                    {data.price.toLocaleString("en-NG", {
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
              {dataBundles.slice(0, 3).map((data) => (
                <div className="data-card">
                  <b>{data.bundle}</b>
                  <small>{data.period}</small>
                  <small>
                    {data.price.toLocaleString("en-NG", {
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
