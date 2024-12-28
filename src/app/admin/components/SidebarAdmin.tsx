import React from "react";

const SidebarAdmin = () => {
  return (
    <div className="flex flex-col gap-y-3 min-h-[500px] bg-[#f3f3f3] p-3 text-white rounded-md">
      <div className="py-3 w-full bg-rose-500 rounded-md flex justify-center items-center">
        Products
      </div>
      <div className="py-3 w-full bg-rose-500 rounded-md flex justify-center items-center">
        Transactions
      </div>
    </div>
  );
};

export default SidebarAdmin;
