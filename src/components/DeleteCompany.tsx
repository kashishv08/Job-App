"use client";
import { Button } from "@radix-ui/themes";
import { Trash } from "lucide-react";
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
      <div className="hidden md:block">
        <Button onClick={handleDelete}>Delete</Button>
      </div>
      <Trash className="block md:hidden" onClick={handleDelete} size={17} />
    </div>
  );
}

export default DeleteCompany;
