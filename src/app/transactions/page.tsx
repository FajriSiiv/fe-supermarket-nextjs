import React from "react";
import TransactionsControl from "./components/TransactionsControl";

const Transactions = () => {
  return (
    <div className="grid grid-cols-6 p-5 gap-5">
      <div className="col-span-1">{/* <SidebarAdmin /> */}1</div>
      <div className="col-span-5">
        <TransactionsControl />
      </div>
    </div>
  );
};

export default Transactions;
