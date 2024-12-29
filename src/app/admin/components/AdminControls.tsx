"use client";
import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import DropdownAction from "./DropdownAction";
import { useAlert } from "@/hooks/useAlert";
import Modal from "@/components/Alert/Modal";
import EditModal from "./EditModal";

const AdminControls = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [actionBtn, setActionBtn] = useState(null);
  const [onOpen, setOnOpen] = useState(false);
  const [isEditModal, setIsEditModal] = useState(false);
  const [selectProduct, setSelectProduct] = useState({});

  const { closeModal, isModalOpen, message, onNo, onYes, success } = useAlert();

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        "https://fakestoreapi.com/products?limit=10"
      ).then((res) => res.json());

      setProducts(response);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleEditProduct = async (id) => {
    if (isEditModal) {
      setIsEditModal(false);
    } else if (!isEditModal) {
      setSelectProduct(
        () => products.filter((product) => product.id === id)[0]
      );
      setIsEditModal(true);
    } else {
      console.log("error");
    }
  };

  const customStylesTable = {
    table: {
      style: {
        border: "1px solid #e6e6e6",
      },
    },
  };

  const columns: any = [
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
        <>
          <DropdownAction
            success={success}
            id={row.id}
            onOpen={onOpen}
            setOnOpen={setOnOpen}
            handleEditProduct={handleEditProduct}
          />
        </>
      ),
      center: "true" || true,
      width: "200px",
    },
  ];

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="w-full">
      {isModalOpen && (
        <Modal
          message={message}
          onYes={onYes}
          onNo={onNo}
          onClose={closeModal}
        />
      )}

      {isEditModal && (
        <EditModal
          closeModal={() => setIsEditModal(false)}
          product={selectProduct}
          setIsEditModal={setIsEditModal}
        />
      )}

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
