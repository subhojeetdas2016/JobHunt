import React, { useEffect, useState } from "react";
import Navbar from "../shared/navbar";
import { Button } from "../ui/button";
import { ArrowLeft, Loader2 } from "lucide-react";
import { Label } from "@radix-ui/react-label";
import { Input } from "../ui/input";
import axios from "axios";
import { COMPANY_API_END_POINT } from "@/utils/constant";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import { useSelector } from "react-redux";
import useGetCompanyById from "../hooks/useGetCompanyById";

const CompanySetup = () => {
  const params = useParams();
  useGetCompanyById(params.id);

  const [input, setInput] = useState({
    name: "",
    description: "",
    website: "",
    location: "",
    file: null,
  });

  const { singleCompany } = useSelector((store) => store.company);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    console.log("Single Company State Updated:", singleCompany);
    if (singleCompany) {
      setInput({
        name: singleCompany.name || "",
        description: singleCompany.description || "",
        website: singleCompany.website || "",
        location: singleCompany.location || "",
        file: null, // Keep file input empty
      });
    }
  }, [singleCompany]);

  const changeEventHandler = (e) => {
    console.log(`Input field '${e.target.name}' changed to:`, e.target.value);
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const changeFileHandler = (e) => {
    const file = e.target.files?.[0];
    if (file && !file.type.startsWith("image/")) {
      toast.error("Only image files are allowed.");
      return;
    }
    console.log("Selected File:", file);
    setInput({ ...input, file });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    console.log("Form Submitted. Input Data:", input);

    if (!params.id) {
      toast.error("Invalid company ID.");
      console.error("Invalid company ID provided:", params.id);
      return;
    }

    const formData = new FormData();
    formData.append("name", input.name);
    formData.append("description", input.description);
    formData.append("website", input.website);
    formData.append("location", input.location);

    if (input.file) {
      formData.append("file", input.file);
    }

    try {
      console.log(
        "Sending update request to:",
        `${COMPANY_API_END_POINT}/update/${params.id}`
      );
      console.log("Form Data to Send:", Array.from(formData.entries()));

      setLoading(true);
      const res = await axios.put(
        `${COMPANY_API_END_POINT}/update/${params.id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );

      console.log("API Response:", res.data);
      if (res.data.success) {
        toast.success(res.data.message);
        console.log("Navigation to companies list.");
        navigate("/admin/companies");
      } else {
        console.error("Update failed. Server message:", res.data.message);
        toast.error(res.data.message || "Failed to update the company.");
      }
    } catch (error) {
      console.error(
        "Error during API request:",
        error.response?.data || error.message
      );
      toast.error(error.response?.data?.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="max-w-xl mx-auto my-10">
        <form onSubmit={submitHandler}>
          <div className="flex items-center gap-5 p-8">
            <Button
              onClick={() => {
                console.log("Back button clicked. Navigating back.");
                navigate("/admin/companies");
              }}
              variant="outline"
              className="hover:bg-gray-300 hover:text-white flex items-center gap-2 text-black font-semibold"
            >
              <ArrowLeft />
              <span>Back</span>
            </Button>
            <h1 className="font-bold text-xl">Company Setup</h1>
          </div>

          <div className="grid grid-cols-1 items-center gap-3">
            <div className="flex items-center gap-4">
              <Label className="whitespace-nowrap font-semibold w-1/3">
                Company Name
              </Label>
              <Input
                type="text"
                name="name"
                value={input.name}
                onChange={changeEventHandler}
                className="w-2/3"
                required
              />
            </div>
            <div className="flex items-center gap-4">
              <Label className="whitespace-nowrap font-semibold w-1/3">
                Description
              </Label>
              <Input
                type="text"
                name="description"
                value={input.description}
                onChange={changeEventHandler}
                className="w-2/3"
              />
            </div>
            <div className="flex items-center gap-4">
              <Label className="whitespace-nowrap font-semibold w-1/3">
                Website
              </Label>
              <Input
                type="text"
                name="website"
                value={input.website}
                onChange={changeEventHandler}
                className="w-2/3"
              />
            </div>
            <div className="flex items-center gap-4">
              <Label className="whitespace-nowrap font-semibold w-1/3">
                Location
              </Label>
              <Input
                type="text"
                name="location"
                value={input.location}
                onChange={changeEventHandler}
                className="w-2/3"
              />
            </div>
            <div className="flex items-center gap-4">
              <Label className="whitespace-nowrap font-semibold w-1/3">
                Logo
              </Label>
              <Input
                type="file"
                accept="image/*"
                onChange={changeFileHandler}
                className="w-2/3"
              />
            </div>
          </div>

          {loading ? (
            <Button>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please Wait
            </Button>
          ) : (
            <Button
              type="submit"
              className="w-full m-5 bg-black text-white hover:bg-[#3f3e3e]"
              variant="outline"
            >
              Update
            </Button>
          )}
        </form>
      </div>
    </div>
  );
};

export default CompanySetup;
