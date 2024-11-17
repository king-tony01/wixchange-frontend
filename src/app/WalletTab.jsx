import React, { useEffect, useState } from "react";
import "/src/css/wallettab.css";
import WalletCard from "./WalletCard";
import { Link } from "react-router-dom";
import { baseUrl } from "../assets/urls";
import LoadingPage from "./components/LoadingPage";
import TransactionCard from "./components/TransactionCard";
import EmptyTransactions from "./components/EmptyTransactions";

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
  const user = JSON.parse(localStorage.getItem("wix_user"));
  const [wallet, setWallet] = useState(null);
  useEffect(() => {
    async function dashboard() {
      try {
        const response = await fetch(`${baseUrl}/api/user/${user.id}/wallet`, {
          mode: "cors",
        });
        if (response.ok) {
          const data = await response.json();
          console.log(data);
          setWallet(data.data);
        } else if (response.status == 403) {
          navigate("/login");
        } else {
          const data = await response.json();
          console.log(data);
        }
      } catch (err) {
        console.log(err);
      }
    }

    dashboard();
  }, []);

  if (!wallet) {
    return <LoadingPage />;
  }

  return (
    <section className='wallettab'>
      <h1>Wallet</h1>
      <WalletCard balance={wallet.accountBalance} />
      <div className='action-tab'>
        <Link to={"/fund"} className='fund'>
          <i className='fas fa-arrow-up'></i> Fund
        </Link>
        <Link to={"/withdraw"} className='withdraw'>
          <i className='fas fa-arrow-down'></i> Withdraw
        </Link>
      </div>
      <h3>History</h3>
      {(wallet.transactions.length > 0 &&
        wallet.transactions.map((transaction, index) => (
          <TransactionCard transaction={transaction} />
        ))) || <EmptyTransactions />}
    </section>
  );
}

export default WalletTab;
