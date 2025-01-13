import React, { useEffect, useState } from "react";
import Navbar from "../shared/navbar";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import CompanyTable from "./CompanyTable";
import { useNavigate } from "react-router-dom";
import useGetAllCompany from "../hooks/useGetAllCompany";
import { useDispatch } from "react-redux";
import { setSearchCompanyByText } from "@/redux/companySlice";


const Company = () => {
  useGetAllCompany(); // Fetch all companies
  const [input, setInput] = useState(""); // State for the input field
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Dispatch the search text whenever input changes
  useEffect(() => {
    dispatch(setSearchCompanyByText(input));
  }, [input, dispatch]);

  return (
    <div>
      <Navbar />
      <div className="max-w-4xl mx-auto my-10">
        <div className="flex items-center justify-between my-5">
          {/* Controlled input field for filtering */}
          <Input
            className="w-fit"
            placeholder="Filter by name"
            value={input} // Bind input state to the value
            onChange={(e) => setInput(e.target.value)} // Update state on input change
          />
          <Button
            onClick={() => navigate("/admin/companies/create")} // Use navigate here
            className="text-[#ffffff] bg-[#c31664] hover:bg-pink-600/100"
          >
            New Company
          </Button>
        </div>
        <CompanyTable />
      </div>
    </div>
  );
};

export default Company;
