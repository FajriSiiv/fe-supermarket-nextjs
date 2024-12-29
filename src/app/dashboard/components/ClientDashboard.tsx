"use client";

import Button from "@/components/Button/BasicButton";
import { ProductProps } from "@/interfaces";
import { useStore } from "@/lib/zustand/useStore";
import React, { useEffect, useState } from "react";

const ClientDashboard = () => {
  const [allProducts, setAllProducts] = useState<ProductProps[]>([]);
  const [loading, setLoading] = useState(false);

  const { transactions, addTransaction, updateTransaction } = useStore();

  const handleAddTransaction = (product: ProductProps) => {
    const checkTransaction: any = transactions.find(
      (transaction: any) => transaction.idProduct === product.id
    );

    if (checkTransaction) {
      updateTransaction(checkTransaction.id, {
        quantity: checkTransaction.quantity + product.quantity,
      });
    } else {
      const newTrasaction: any = {
        price: product.price,
        id: transactions.length + 1,
        title: product.title,
        quantity: product.quantity,
        idProduct: product.id,
      };

      addTransaction(newTrasaction);
    }
  };

  const fetchData = async () => {
    setLoading(true);

    try {
      const response = await fetch(
        "https://fakestoreapi.com/products?limit=10"
      ).then((res) => res.json());

      setAllProducts(
        response.map((product: ProductProps) => ({ ...product, quantity: 1 }))
      );
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const incrementQuantity = (id: number | string) => {
    setAllProducts((products) =>
      products.map((product) =>
        product.id === id
          ? { ...product, quantity: product.quantity + 1 }
          : product
      )
    );
  };

  const decreaseQuantity = (id: string | number) => {
    setAllProducts((products) =>
      products.map((product) =>
        product.id === id
          ? { ...product, quantity: Math.max(product.quantity - 1, 1) }
          : product
      )
    );
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="bg-[#f3f3f3] rounded-md h-fit p-5 grid md:grid-cols-3 lg:grid-cols-4 gap-5">
      {loading && <p>Loading..</p>}
      {allProducts.map((product, index) => {
        return (
          <div
            key={index}
            className="min-h-[200px] bg-slate-100 rounded-md p-2 flex flex-col justify-end"
          >
            <span>{product.title.slice(0, 20)}..</span>
            <span className="text-center font-semibold my-1">
              ${product.price}
            </span>

            <div className="grid grid-cols-4 items-center my-2">
              <Button
                text="-"
                onClick={() => decreaseQuantity(product.id)}
                disabled={product.quantity <= 1}
              />

              <span className="col-span-2 text-center">{product.quantity}</span>
              <Button text="+" onClick={() => incrementQuantity(product.id)} />
            </div>

            <Button
              text="Buy"
              bgC="bg-emerald-500 hover:bg-emerald-600/90"
              onClick={() => handleAddTransaction(product)}
              textColor="text-white"
            />
          </div>
        );
      })}
    </div>
  );
};

export default ClientDashboard;
