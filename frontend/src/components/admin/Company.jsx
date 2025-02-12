import React, { useEffect, useState } from "react";
import Navbar from "../shared/navbar";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import CompanyTable from "./CompanyTable";
import { useNavigate } from "react-router-dom";
import useGetAllCompany from "../hooks/useGetAllCompany";
import { useDispatch, useSelector } from "react-redux";
import { setSearchCompanyByText } from "@/redux/companySlice";

const Company = () => {
  // Fetch all companies
  useGetAllCompany();

  const [input, setInput] = useState(""); // State for the input field
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Access Redux state for debugging
  const companies = useSelector((store) => store.company.companies); // List of companies
  const searchCompanyByText = useSelector((store) => store.company.searchCompanyByText); // Search text

  // Log companies and search input for debugging
  console.log("Redux State - Companies:", companies);
  console.log("Redux State - Search Text:", searchCompanyByText);

  // Dispatch the search text whenever input changes
  useEffect(() => {
    console.log("Search Input Changed:", input);
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
            onChange={(e) => {
              console.log("Input value updated:", e.target.value);
              setInput(e.target.value);
            }} // Update state on input change
          />
          <Button
            onClick={() => {
              console.log("Navigating to create new company");
              navigate("/admin/companies/create"); // Use navigate here
            }}
            className="text-[#ffffff] bg-[#c31664] hover:bg-pink-600/100"
          >
            New Company
          </Button>
        </div>
        {/* Log filtered companies just before rendering the table */}
        <CompanyTable />
        {console.log("Rendering CompanyTable with current state.")}
      </div>
    </div>
  );
};

export default Company;
