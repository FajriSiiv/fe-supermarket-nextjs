import React from "react";
import AdminControls from "./components/AdminControls";
import SidebarAdmin from "./components/SidebarAdmin";
import QRScanner from "./components/QRScanner";

const Admin = () => {
  return (
    <div className="grid grid-cols-6 p-5 gap-5">
      <div className="col-span-1">
        <SidebarAdmin />
      </div>
      <div className="col-span-5">
        <AdminControls />
      </div>
    </div>
  );
};

export default Admin;
