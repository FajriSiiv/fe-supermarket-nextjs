import Button from "@/components/Button/BasicButton";
import { Field, Input, Label } from "@headlessui/react";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

interface ProductProps {
  title: string;
  price: number | string;
  category: string;
  id: string;
}

const EditModal = ({
  closeModal,
  product,
  setIsEditModal,
}: {
  closeModal: () => void;
  product: ProductProps;
  setIsEditModal: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [title, setTitle] = useState<string>("");
  const [price, setPrice] = useState<number | string>(0);
  const [category, setCategory] = useState<string>("");

  useEffect(() => {
    if (product) {
      setTitle(product.title);
      setPrice(product.price);
      setCategory(product.category);
    }
  }, [product]);

  const handleUpdateProduct = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `https://fakestoreapi.com/products/${product.id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title: title,
            price: price,
            category: category,
          }),
        }
      );

      toast.success("Berhasil diupdate!");
      setIsEditModal(false);
      if (response.ok) {
        const data = await response.json();
        toast.success("Berhasil diupdate!");
        console.log(data);
      } else {
        console.log(response);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="fixed w-screen h-screen left-0 top-0 bg-black z-10">
      <form
        className="w-[400px] absolute left-1/2 top-5 -translate-x-1/2 h-fit pb-5 px-3 bg-slate-800 rounded-md"
        onSubmit={handleUpdateProduct}
      >
        <div className="flex justify-between items-center ">
          <p className="text-2xl font-bold uppercase text-white py-2">
            Edit Produk #{product.id}
          </p>
          <Button text="x" className="!py-1 !px-1.5" onClick={closeModal} />
        </div>

        <Field className="pb-5">
          <Label className="text-sm/6 font-medium text-white">
            Nama Produk
          </Label>
          <Input
            className={
              " block w-full rounded-lg border-none bg-white/5 py-1.5 px-3 text-sm/6 text-white"
            }
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </Field>
        <Field className="pb-5">
          <Label className="text-sm/6 font-medium text-white">Price</Label>
          <Input
            className={
              " block w-full rounded-lg border-none bg-white/5 py-1.5 px-3 text-sm/6 text-white"
            }
            value={price}
            onChange={(e) => {
              setPrice(e.target.value);
            }}
            type="number"
          />
        </Field>
        <Field className="pb-5">
          <Label className="text-sm/6 font-medium text-white">Category</Label>
          <Input
            className={
              " block w-full rounded-lg border-none bg-white/5 py-1.5 px-3 text-sm/6 text-white"
            }
            value={category}
            onChange={(e) => {
              setCategory(e.target.value);
            }}
          />
        </Field>
        <Button
          type="submit"
          text="Save Update"
          className="inline-block float-right border-none"
          bgC="bg-emerald-500 hover:bg-opacity-50"
          textColor="text-white"
        />
      </form>
    </div>
  );
};

export default EditModal;
