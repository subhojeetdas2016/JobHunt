import React, { useEffect, useState } from "react";
import Navbar from "../shared/navbar";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import AdminJobsTable from "./AdminJobsTable";
import useGetAllAdminJobs from "../hooks/useGetAllAdminJobs";
import { setSearchJobByText } from "@/redux/jobslice";

const AdminJobs = () => {
  console.log("AdminJobs component rendering...");

  useGetAllAdminJobs(); // Fetch all companies
  const [input, setInput] = useState(""); // State for the input field
  const navigate = useNavigate();
  const dispatch = useDispatch();

  console.log("Current input state:", input);

  // Dispatch the search text whenever input changes
  useEffect(() => {
    console.log("useEffect triggered. Dispatching input to Redux:", input);
    dispatch(setSearchJobByText(input));
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
              console.log("Input field value changed:", e.target.value);
              setInput(e.target.value); // Update state on input change
            }}
          />
          <Button
            onClick={() => {
              console.log("Navigating to create job page...");
              navigate("/admin/jobs/create"); // Use navigate here
            }}
            className="text-[#ffffff] bg-[#c31664] hover:bg-pink-600/100"
          >
            New Jobs
          </Button>
        </div>
        <AdminJobsTable />
      </div>
    </div>
  );
};

export default AdminJobs;
