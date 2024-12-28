"use client";
import DropdownAction from "@/app/admin/components/DropdownAction";
import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";

const TransactionsControl = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [actionBtn, setActionBtn] = useState(null);

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

  // Hapus action nya jika mengklik di luar parentnya
  const removeAction = (e, idParent, setAction) => {
    if (!e.target.closest(`${idParent}`)) {
      setAction(null);
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
      name: "ID Transaction",
      selector: (row) => <>{row.id}</>,
      center: "true",
      width: "300px",
    },

    {
      name: "Product",
      selector: (row) => {
        const array = [{ name: "name" }, { name: "name2" }];
        return <div></div>;
      },
      center: "true" || true,
      width: "200px",
    },
    {
      name: "Total",
      selector: (row) => <p className="text-center">${row.price}</p>,
      center: "true" || true,
      width: "200px",
    },
    {
      name: "Action",
      selector: (row) => <DropdownAction id={row.id} />,
      center: "true" || true,
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

export default TransactionsControl;
