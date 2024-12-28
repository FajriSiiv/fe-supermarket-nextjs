"use client";
import { useAlert } from "@/hooks/useAlert";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import React from "react";

const DropdownAction = ({ id }: { id: string }) => {
  const handleDeleteProduct = async (id) => {
    console.log("Delete Product", id);

    // try {
    //   const response = await fetch("api/id").then((res) => res.json());

    //   if (response.ok) {
    //     console.log(response);
    //   } else {
    //     console.log("Error response");
    //   }
    // } catch (error) {
    //   console.log(error);
    // }
  };

  const handleEditProduct = async (id) => {
    console.log("Edit Product", id);

    // try {
    //   const response = await fetch("api/id", {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },

    //     body: JSON.stringify({
    //       title: "name product",
    //       price: "price product",
    //     }),
    //   }).then((res) => res.json());

    //   if (response.ok) {
    //     console.log(response);
    //   } else {
    //     console.log("Error response");
    //   }
    // } catch (error) {
    //   console.log(error);
    // }
  };

  return (
    <Menu>
      <MenuButton className="px-1">
        <div className="py-2 px-3 bg-[#f3f3f3] rounded-md flex justify-center items-center font-bold cursor-pointer">
          ...
        </div>
      </MenuButton>
      <MenuItems
        anchor="left"
        className="origin-top-right rounded-sm bg-black/20 p-2 text-xs flex flex-col gap-2"
      >
        <MenuItem>
          <p
            className="block data-[focus]:bg-blue-100 py-0.5 px-2 text-center bg-white rounded-sm"
            onClick={() => handleEditProduct(id)}
          >
            Edit
          </p>
        </MenuItem>
        <MenuItem>
          <p
            className="block data-[focus]:bg-blue-100 py-0.5 px-2 text-center bg-white rounded-sm"
            onClick={() => handleDeleteProduct(id)}
          >
            Hapus
          </p>
        </MenuItem>
      </MenuItems>
    </Menu>
  );
};

export default DropdownAction;
