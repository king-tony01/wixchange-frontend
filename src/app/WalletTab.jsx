import React from "react";
import "/src/css/wallettab.css";
import WalletCard from "./WalletCard";
import { Link } from "react-router-dom";

const transactions = [
  {
    id: 1,
    status: "Pending",
    globalType: "Airtime Top-up",
    amount: 2000,
    type: "withdrawal",
    dateCreated: new Date(),
  },
  {
    id: 2,
    status: "Pending",
    globalType: "Airtime Top-up",
    amount: 4000,
    type: "withdrawal",
    dateCreated: new Date(),
  },
  {
    id: 3,
    status: "Pending",
    globalType: "Airtime Top-up",
    amount: 4000,
    type: "deposit",
    dateCreated: new Date(),
  },
];

function WalletTab() {
  return (
    <section className="wallettab">
      <h1>Wallet</h1>
      <WalletCard />
      <div className="action-tab">
        <Link to={"/fund"} className="fund">
          <i className="fas fa-arrow-up"></i> Fund
        </Link>
        <Link to={"/withdraw"} className="withdraw">
          <i className="fas fa-arrow-down"></i> Withdraw
        </Link>
      </div>
      <h3>History</h3>
      {transactions.map((transaction, index) => (
        <div className="history-card">
          <div className="left">
            <i className="fas fa-arrow-up"></i>
            <div>
              <p>-N2000</p>
              <small className="small">{transaction.globalType}</small>
            </div>
          </div>
          <div className="right">
            <small className="status">{transaction.status}</small>
            <div className="history-time">
              <small className="small">
                {transaction.dateCreated.toDateString()}
              </small>
              <small className="small">
                {transaction.dateCreated.getHours()}:
                {transaction.dateCreated.getMinutes()}{" "}
                {transaction.dateCreated.getHours() >= 12 ? "PM" : "AM"}
              </small>
            </div>
          </div>
        </div>
      ))}
    </section>
  );
}

export default WalletTab;
