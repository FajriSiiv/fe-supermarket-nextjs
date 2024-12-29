"use client";
import Button from "@/components/Button/BasicButton";
import React from "react";

const SidebarAdmin = () => {
  return (
    <div className="flex flex-col gap-y-3 min-h-[500px] bg-[#f3f3f3] p-3 text-white rounded-md">
      <Button
        className="py-3 w-full rounded-md flex justify-center items-center"
        text="Product"
        bgC="bg-[#f3f3f3] hover:bg-slate-800"
        textColor="hover:text-white text-slate-800"
        onClick={() => {
          if (window.location.pathname !== "/admin") {
            window.location.href = "/admin";
          }
        }}
      />
      <Button
        className="py-3 w-full rounded-md flex justify-center items-center"
        text="History"
        bgC="bg-[#f3f3f3] hover:bg-slate-800"
        textColor="hover:text-white text-slate-800"
        onClick={() => {
          if (window.location.pathname !== "/admin/history") {
            window.location.href = "/admin/history";
          }
        }}
      />
    </div>
  );
};

export default SidebarAdmin;
