"use client";
import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";

const AdminControls = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        "https://fakestoreapi.com/products?limit=10"
      ).then((res) => res.json());

      console.log(response);
      setProducts(response);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const customStylesTable = {
    table: {
      style: {
        border: "1px solid #e6e6e6",
      },
    },
  };

  const columns = [
    {
      name: "Title",
      selector: (row) => <>{row.title.slice(0, 20)}...</>,
      width: "240px",
    },
    {
      name: "Price",
      selector: (row) => <p className="text-center">${row.price}</p>,
      center: "true" || true,
      width: "200px",
    },
    {
      name: "Description",
      selector: (row) => <>{row.description.slice(0, 40)}...</>,
    },
    {
      name: "Action",
      selector: (row) => (
        <div className="py-2 px-3 bg-[#f3f3f3] rounded-md flex justify-center items-center font-bold">
          ...
        </div>
      ),
      center: "true" || true,
      width: "100px",
    },
  ];

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="w-full">
      <DataTable
        columns={columns}
        data={products}
        customStyles={customStylesTable}
        progressPending={loading}
      />
    </div>
  );
};

export default AdminControls;
