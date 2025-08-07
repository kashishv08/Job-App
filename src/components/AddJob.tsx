"use client";
import { UserContext } from "@/app/(group)/layout";
import {
  Button,
  Dialog,
  Flex,
  Text,
  TextField,
  TextArea,
} from "@radix-ui/themes";
import React, { useContext, useState } from "react";

function AddJob() {
  const { user } = useContext(UserContext);
  const [form, setForm] = useState({
    title: "",
    employment_type: "fulltime",
    job_type: "remote",
    location: "",
    desc: "",
    salary: "",
    apply_link: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    setLoading(true);

    const req = await fetch("http://localhost:3000/api/jobs", {
      method: "POST",
      body: JSON.stringify({
        ...form,
        salary: Number.parseInt(form.salary),
      }),
    });
    const res = await req.json();
    if (res.success) {
      alert("Job Created :)");
    } else {
      alert("not created");
    }
    setLoading(false);
  };

  return (
    <div>
      <Dialog.Root>
        <Dialog.Trigger>
          <button className="w-full text-left px-2 py-2 hover:bg-blue-600 hover:text-white rounded text-sm">
            Post Job
          </button>
        </Dialog.Trigger>

        <Dialog.Content maxWidth="600px">
          <Dialog.Title>Post Job</Dialog.Title>
          <Flex direction="column" gap="3" mt="3">
            <label>
              <Text size="2" weight="bold">
                Job Title
              </Text>
              <TextField.Root
                name="title"
                value={form.title}
                onChange={handleChange}
                placeholder="e.g. Frontend Developer"
              />
            </label>

            <label>
              <Text size="2" weight="bold">
                Employment Type
              </Text>
              <select
                name="employment_type"
                value={form.employment_type}
                onChange={handleChange}
                className="w-full p-2 rounded-md border"
              >
                <option value="fulltime">Full-time</option>
                <option value="parttime">Part-time</option>
                <option value="contractor">Contractor</option>
              </select>
            </label>

            <label>
              <Text size="2" weight="bold">
                Job Type
              </Text>
              <select
                name="job_type"
                value={form.job_type}
                onChange={handleChange}
                className="w-full p-2 rounded-md border"
              >
                <option value="remote">Remote</option>
                <option value="onsite">Onsite</option>
              </select>
            </label>

            <label>
              <Text size="2" weight="bold">
                Location
              </Text>
              <TextField.Root
                name="location"
                value={form.location}
                onChange={handleChange}
                placeholder="e.g. UP, India"
              />
            </label>

            <label>
              <Text size="2" weight="bold">
                Job Description
              </Text>
              <TextArea
                name="desc"
                value={form.desc}
                onChange={handleChange}
                placeholder="Describe the job role..."
                rows={4}
              />
            </label>

            <label>
              <Text size="2" weight="bold">
                Salary
              </Text>
              <TextField.Root
                name="salary"
                value={form.salary}
                onChange={handleChange}
                placeholder="e.g. ₹10-15 LPA"
              />
            </label>

            <label>
              <Text size="2" weight="bold">
                Apply Link
              </Text>
              <TextField.Root
                name="apply_link"
                value={form.apply_link}
                onChange={handleChange}
                placeholder="https://apply.link"
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
              <Button disabled={loading} onClick={handleSubmit}>
                Save
              </Button>
            </Dialog.Close>
          </Flex>
        </Dialog.Content>
      </Dialog.Root>
    </div>
  );
}

export default AddJob;
