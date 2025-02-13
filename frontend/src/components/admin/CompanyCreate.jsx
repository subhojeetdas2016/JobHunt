import React, { useState } from "react";
import Navbar from "../shared/navbar";
import { Label } from "@radix-ui/react-label";
import { Input } from "../ui/input";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { COMPANY_API_END_POINT } from "@/utils/constant";
import { toast } from "../ui/sonner";
import { useDispatch } from "react-redux";
import { setSingleCompany } from "@/redux/companySlice";

const CompanyCreate = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [companyName, setCompanyName] = useState();

  const registerNewCompany = async () => {
    try {
      console.log("Sending request to:", `${COMPANY_API_END_POINT}/register`);
      console.log("Request payload:", { companyName });

      const res = await axios.post(
        `${COMPANY_API_END_POINT}/register`,
        { companyName },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      console.log("API response:", res.data);
      if (res?.data?.success) {
        dispatch(setSingleCompany(res.data.company));
        toast.success(res.data.message);
        const companyId = res?.data?.company?._id;
        console.log("Navigating to:", `/admin/companies/${companyId}`);
        navigate(`/admin/companies/${companyId}`);
      } else {
        toast.error(res.data.message || "Failed to create company");
      }
    } catch (error) {
      console.error(
        "Error creating company:",
        error.response?.data || error.message
      );
      toast.error(error.response?.data?.message || "An error occurred");
    }
  };

  return (
    <div>
      <Navbar />
      <div className="max-w-4xl mx-auto">
        <div className="my-10">
          <h1 className="font-bold text-2xl">Your Company Name</h1>
          <p className="text-gray-500">
            What would you like to give your Company Name? You can change this
            later.
          </p>
        </div>
        <Label>Company Name</Label>
        <Input
          type="text"
          className="my-2"
          placeholder="jobhunt, Microsoft etc."
          onChange={(e) => {
            console.log("Company name input updated:", e.target.value);
            setCompanyName(e.target.value);
          }}
        />

        <div className="flex items-center gap-2 my-10">
          <Button
            onClick={() => {
              console.log("Cancel button clicked. Navigating back.");
              navigate("/admin/Companies");
            }}
            variant="outline"
          >
            Cancel
          </Button>
          <Button
            className="text-white bg-pink-600 hover:bg-pink-500/100"
            onClick={registerNewCompany}
          >
            Continue
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CompanyCreate;
