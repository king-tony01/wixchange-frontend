import React from "react";

function EmptyTransactions() {
  return (
    <section className='empty-transactions'>
      <i className='fas fa-inbox'></i>
      <h2>No Transactions</h2>
      <p>
        No transactions yet. <br /> But this place will update as soon as you
        perform any transaction.
      </p>
    </section>
  );
}

export default EmptyTransactions;
