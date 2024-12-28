import React from "react";
import ClientDashboard from "./components/ClientDashboard";
import SidebarTransactions from "./components/SidebarTransactions";

const Dashboard = () => {
  return (
    <div className="w-full flex  p-5 gap-5">
      <div className="flex-[1] w-full h-full">
        <SidebarTransactions />
      </div>
      <div className="flex flex-col gap-y-10 flex-[3] w-full h-full">
        <ClientDashboard />
      </div>
    </div>
  );
};

export default Dashboard;
