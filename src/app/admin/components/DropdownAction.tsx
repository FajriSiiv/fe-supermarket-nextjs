"use client";
import Button from "@/components/Button/BasicButton";
import {
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Transition,
} from "@headlessui/react";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { motion } from "motion/react";

const DropdownAction = ({
  id,
  success,
  onOpen,
  setOnOpen,
  handleEditProduct,
}: {
  id: string;
  success: (message, onNo, onYes) => void;
  onOpen: boolean;
  setOnOpen: React.Dispatch<React.SetStateAction<boolean>>;
  handleEditProduct: (id: string) => void;
}) => {
  const handleDeleteProduct = async (id: string) => {
    console.log("Delete Product", id);

    try {
      const response = await fetch(
        `https://fakestoreapi.com/products/${id}`
      ).then((res) => res.json());

      if (response.ok) {
        toast.success("Berhasil di hapus");
      } else {
        console.log("Error response");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Menu>
      <MenuButton
        className="py-2 px-3 bg-[#f3f3f3] rounded-md flex justify-center items-center font-bold cursor-pointer"
        onClick={() => {
          setOnOpen((open) => !open);
          console.log(onOpen);
        }}
        as="div"
      >
        ...
      </MenuButton>
      {/* <Transition show={onOpen}> */}
      <MenuItems
        anchor="left"
        className="origin-top-right rounded-md bg-black p-2 text-xs flex flex-col gap-2 "
      >
        <MenuItem>
          <Button
            text="Edit"
            // onClick={() => {
            //   success(
            //     "Ingin dihapus?",
            //     () => {
            //       handleDeleteProduct(id);
            //       console.log(id);

            //       toast.success("Berhasil dihapus");
            //     },
            //     () => console.log("No", id)
            //   );
            // }}
            onClick={() => handleEditProduct(id)}
            className="!text-xs rounded-md"
          />
        </MenuItem>
        <MenuItem>
          <Button
            text="Hapus"
            onClick={() => {
              success(
                "Ingin dihapus?",
                () => {
                  handleDeleteProduct(id);
                  console.log(id);

                  toast.success("Berhasil dihapus");
                },
                () => console.log("No", id)
              );
            }}
            className="!text-xs rounded-md"
          />
        </MenuItem>
      </MenuItems>
      {/* </Transition> */}
    </Menu>
  );
};

export default DropdownAction;
