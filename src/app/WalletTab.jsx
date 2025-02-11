import React, { useContext } from "react";
import "/src/css/wallettab.css";
import WalletCard from "./WalletCard";
import { Link } from "react-router-dom";
import LoadingPage from "./components/LoadingPage";
import TransactionCard from "./components/TransactionCard";
import EmptyTransactions from "./components/EmptyTransactions";
import { HomeContext } from "../contexts/HomeContext";

/*const transactions = [
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
];*/

function WalletTab() {
  const { transactions, userInfo } = useContext(HomeContext);

  if (!transactions && !userInfo) {
    return <LoadingPage />;
  }

  return (
    <section className="wallettab">
      <h1>Wallet</h1>
      <WalletCard balance={parseFloat(userInfo.accountBalance)} />
      <div className="action-tab">
        <Link to={"/fund"} className="fund">
          <i className="fas fa-arrow-up"></i> Fund
        </Link>
        <Link to={"/withdraw"} className="withdraw">
          <i className="fas fa-arrow-down"></i> Withdraw
        </Link>
      </div>
      <h3>History</h3>
      {(transactions.length > 0 &&
        transactions.map((transaction, index) => (
          <TransactionCard transaction={transaction} />
        ))) || <EmptyTransactions />}
    </section>
  );
}

export default WalletTab;
