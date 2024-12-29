import React from "react";
import AdminControls from "./components/AdminControls";
import SidebarAdmin from "./components/SidebarAdmin";
import { Toaster } from "react-hot-toast";

const Admin = () => {
  return (
    <div className="grid grid-cols-6 p-5 gap-5">
      <div className="col-span-1">
        <SidebarAdmin />
      </div>
      <div className="col-span-5">
        <AdminControls />
      </div>
      <Toaster />
    </div>
  );
};

export default Admin;
