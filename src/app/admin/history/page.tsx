import React from "react";
import { Toaster } from "react-hot-toast";
import SidebarAdmin from "../components/SidebarAdmin";
import HistoryClient from "./components/HistoryClient";

const Admin = () => {
  return (
    <div className="grid grid-cols-6 p-5 gap-5">
      <div className="col-span-1">
        <SidebarAdmin />
      </div>
      <div className="col-span-5">
        <HistoryClient />
      </div>
      <Toaster />
    </div>
  );
};

export default Admin;
