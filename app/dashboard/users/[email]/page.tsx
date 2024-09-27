"use client";

import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useParams } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

type User = {
  name: string;
  email: string;
  phoneNumber: string;
  address: string;
  state: string;
  country: string;
  role: string;
};

const EditUserPage = () => {
  const params = useParams<{ email: string }>();
  const [data, setData] = useState<User>({
    name: "",
    email: "",
    phoneNumber: "",
    address: "",
    state: "",
    country: "",
    role: "",
  });
  const router = useRouter();

  useEffect(() => {
    axios.get(`/api/user?email=${params.email}`).then((res) => {
      // console.log(res.data?.data);
      // setData(res.data?.data);
      setData({
        name: res.data?.data?.name || "",
        email: res.data?.data?.email,
        phoneNumber: res.data?.data?.phoneNumber || "",
        address: res.data?.data?.address || "",
        state: res.data?.data?.state || "",
        country: res.data?.data?.country || "",
        role: res.data?.data?.role,
      });
    });
  }, [params.email]);

  const handleChange = (e: any) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    // console.log(data);
    // if()
    try {
      axios.put(`/api/user-private`, data).then((res) => {
        // console.log(res.data?.data);
       if(res.data.status === 200){
        toast.success("User updated successfully");
        router.refresh();
        router.push("/dashboard/users");
       }
      });
    } catch (error) {
      console.log(error);
      toast.error("Error updating user");
    }
  };

  const handleDelete = (email: string) => {
    if (!email) {
      toast.error("Email is required");
      return;
    }
    try {
      axios.delete(`/api/user?email=${email}`).then((res) => {
        console.log(res.data?.data);
        toast.success("User Deleted successfully");
        router.refresh();
        router.push("/dashboard/users");
      });
    } catch (error) {
      console.log(error);
      toast.error("Not able to delete user");
    }
  };

  return (
    <>
      <div>
        <div className="md:flex gap-5 w-fit items-end">
          <div className="text-zinc-900 3xl:text-5xl text-3xl max-md:text-xl font-medium grow whitespace-nowrap">
            Users
          </div>
          <div className="bordered-text 2xl:px-8 3xl:text-xl max-md:px-2 max-md:py-1 max-md:text-xs text-sm font-normal">
            {" "}
            People that use Production glue
          </div>
        </div>
        <div className="bg-[#B2C2D9] h-[1px] w-full max-md:my-6 my-10" />
        <div>
          <form>
            <div>
              {" "}
              <label htmlFor="name">Name</label>
              <Input
                type="text"
                name="name"
                id="name"
                value={data?.name}
                onChange={handleChange}
                placeholder="Enter the name"
                className="w-1/2 mt-2 2xl:mb-5 mb-3 max-md:w-full"
              />
            </div>
            <div>
              {" "}
              <label htmlFor="email">Email</label>
              <Input
                type="email"
                name="email"
                id="email"
                value={data?.email}
                onChange={handleChange}
                disabled
                placeholder="Enter the email"
                className="w-1/2 mt-2 2xl:mb-5 mb-3 max-md:w-full"
              />
            </div>
            <div>
              {" "}
              <label htmlFor="phoneNumber">Phone Number</label>
              <Input
                type="text"
                name="phoneNumber"
                id="phoneNumber"
                onChange={handleChange}
                value={data?.phoneNumber}
                placeholder="Enter  phone number"
                className="w-1/2 mt-2 2xl:mb-5 mb-3 max-md:w-full"
              />
            </div>
            <div>
              {" "}
              <label htmlFor="address">Address</label>
              <Textarea
                name="address"
                id="  address"
                onChange={handleChange}
                value={data?.address}
                placeholder="Enter  address"
                className="w-1/2 mt-2 2xl:mb-5 mb-3 max-md:w-full"
              />
            </div>

            <div>
              {" "}
              <label htmlFor="state">State</label>
              <Input
                type="text"
                name="state"
                id=" state"
                onChange={handleChange}
                value={data?.state}
                placeholder="Enter the state"
                className="w-1/2 mt-2 2xl:mb-5 mb-3 max-md:w-full"
              />
            </div>
            <div>
              {" "}
              <label htmlFor="country">Country</label>
              <Input
                type="text"
                name="country"
                id=" country"
                onChange={handleChange}
                value={data?.country}
                placeholder="Enter Country"
                className="w-1/2 mt-2 2xl:mb-5 mb-3 max-md:w-full"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label htmlFor="role">Access</label>
              <select
                name="role"
                id="role"
                onChange={handleChange}
                value={data?.role}
                // defaultValue="User Access"
                className="w-1/2 mt-2 2xl:mb-5 mb-3 max-md:w-full px-3 py-2 outline-none focus-visible:border-primary rounded-md border border-input"
              >
                <option value="admin">Admin Access</option>
                <option value="user">User Access</option>
                <option value="none">No Access</option>
              </select>
            </div>
          </form>
          <div className="2xl:mt-14 mt-6 md:flex max-md:text-sm gap-5 items-center max-md:w-full w-1/2">
            <button
              type="submit"
              onClick={handleSubmit}
              className="bg-[#2E6AB3] max-md:w-full w-1/2 hover:opacity-80 text-white px-5 py-2 rounded-lg"
            >
              Apply edits
            </button>
            <button
              onClick={() => handleDelete(data?.email)}
              className="bg-red-600 max-md:w-full max-md:mt-4 w-1/2 hover:opacity-80 text-white px-5 py-2 rounded-lg"
            >
              Delete Account
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditUserPage;
