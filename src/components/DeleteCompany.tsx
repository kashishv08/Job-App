"use client";
import { Button } from "@radix-ui/themes";
import React from "react";
//@ts-ignore
function DeleteCompany({ id }) {
  const handleDelete = async () => {
    const res = await fetch(`/api/company/${id}`, {
      method: "DELETE",
    });

    const response = await res.json();
    if (response.success) {
      alert("company delete");
    } else {
      alert("Not owner of company");
    }
  };

  return (
    <div>
      <Button onClick={handleDelete}>Delete </Button>
    </div>
  );
}

export default DeleteCompany;
