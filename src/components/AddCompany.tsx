import { Button, Dialog, Flex, Text, TextField } from "@radix-ui/themes";
import React, { useState } from "react";

function AddCompany() {
  const [title, setTilte] = useState("");
  const [desc, setDesc] = useState("");
  const [logo, setLogo] = useState("");

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const userObj = {
      title,
      desc,
      logo,
    };
    const response = await fetch("http://localhost:3000/api/company", {
      method: "POST",
      body: JSON.stringify(userObj),
    });
    const res = await response.json();
    if (res.success) {
      alert("Company created");
    } else {
      alert(":/");
    }
    console.log(res.company);
  };

  return (
    <div>
      <Dialog.Root>
        <Dialog.Trigger>
          <Button>Add Company</Button>
        </Dialog.Trigger>

        <Dialog.Content maxWidth="450px">
          <Dialog.Title>Add Company</Dialog.Title>

          <Flex direction="column" gap="3">
            <label>
              <Text as="div" size="2" mb="1" weight="bold">
                Title
              </Text>
              <TextField.Root
                placeholder="Enter full title"
                onChange={(e) => setTilte(e.target.value)}
              />
            </label>
            <label>
              <Text as="div" size="2" mb="1" weight="bold">
                Description
              </Text>
              <TextField.Root
                placeholder="Enter Job desc.."
                onChange={(e) => setDesc(e.target.value)}
              />
            </label>

            <label>
              <Text as="div" size="2" mb="1" weight="bold">
                Logo Link
              </Text>
              <TextField.Root
                placeholder="Enter Logo link"
                onChange={(e) => setLogo(e.target.value)}
              />
            </label>
          </Flex>

          <Flex gap="3" mt="4" justify="end">
            <Dialog.Close>
              <Button variant="soft" color="gray">
                Cancel
              </Button>
            </Dialog.Close>
            <Dialog.Close>
              <Button onClick={handleSubmit}>Save</Button>
            </Dialog.Close>
          </Flex>
        </Dialog.Content>
      </Dialog.Root>
    </div>
  );
}

export default AddCompany;
