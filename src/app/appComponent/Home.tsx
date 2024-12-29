"use client";
import Button from "@/components/Button/BasicButton";
import React from "react";

const HomeComponent = () => {
  return (
    <div className="h-screen w-screen relative flex flex-col justify-center items-center">
      <h1 className="font-semibold text-5xl mb-10 absolute top-10 left-1/2 -translate-x-1/2 w-full text-center">
        Selamat Datang di Supermort
      </h1>
      <Button
        text="Buat Pesanan Baru"
        className="text-xl px-10 py-5"
        onClick={() => {
          window.location.href = "/dashboard";
        }}
      />

      <div className="absolute right-5 bottom-5">
        <Button
          text="Admin"
          className="text-sm px-5 py-2"
          onClick={() => {
            window.location.href = "/admin";
          }}
        />
      </div>
    </div>
  );
};

export default HomeComponent;
