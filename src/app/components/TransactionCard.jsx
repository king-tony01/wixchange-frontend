import React from "react";

function TransactionCard({ transaction }) {
  return (
    <div className="history-card">
      <div className="left">
        <i
          className={`fas fa-arrow-${
            transaction.type == "withdrawal" ? "up" : "down"
          }`}
        ></i>
        <div>
          <p>
            {parseInt(transaction.amount).toLocaleString("en-NG", {
              style: "currency",
              currency: "NGN",
            })}
          </p>
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
  );
}

export default TransactionCard;
