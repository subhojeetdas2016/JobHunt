import React, { useState } from "react";
import Navbar from "./../shared/navbar";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useSelector } from "react-redux";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectGroup,
} from "../ui/select";
import axios from "axios";
import { JOB_API_END_POINT } from "@/utils/constant";
import { application } from './../../../../Backend/models/application.model';
import { toast } from "sonner";
import { Navigate, useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";

const companyArray = [];

function PostJob() {
  const [input, setinput] = useState({
    title: "",
    description: "",
    requirements: "",
    salary: "",
    location: "",
    jobtype: "",
    experience: "",
    position: 0,
    companyId: "",
  });

  const [loading, setloading] = useState(false);
  const navigate = useNavigate();
  const { companies } = useSelector((store) => store.company);
  const changeEventHandler = (e) => {
    setinput({ ...input, [e.target.name]: e.target.value });
  };
  const selectChangeHandler = (value) => {
    const selectedCompany = companies.find(
      (company) => company.name.toLowerCase() === value
    );
    if (selectedCompany) {
      setinput({ ...input, companyId: selectedCompany._id });
    } else {
      console.error("Selected company not found.");
    }
  };
  const submitHandler = async (e) => {
    e.preventDefault();
    console.log(input);
    try{
      setloading(true);
      const res = await axios.post(`${JOB_API_END_POINT}/post`,input,{
      headers: {
          "Content-Type": "application/json",
        },
        withCredentials:true
      });
      if(res.data.success){
        toast.success(res.data.message);
        navigate("/admin/jobs");
      }
    }
    catch(error){
      toast.error(error.response.data.message)
      console.error(error);
    }
    finally{
      setloading(false);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="flex pt-8 items-center justify-center w-screen my-5">
        <form
          onSubmit={submitHandler}
          className="p-0 max-w-4xl border border-gray-200 shadow-lg rounded-md"
        >
          <div className="p-5 grid grid-cols-2">
            <div className="pr-10">
              <Label>Title</Label>
              <Input
                type="text"
                name="title"
                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
                value={input.title}
                onChange={changeEventHandler}
              />
            </div>
            <div>
              <Label>Description</Label>
              <Input
                type="text"
                name="description"
                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
                value={input.description}
                onChange={changeEventHandler}
              />
            </div>
            <div className="pr-10">
              <Label>Requirements</Label>
              <Input
                type="text"
                name="requirements"
                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
                value={input.requirements}
                onChange={changeEventHandler}
              />
            </div>
            <div>
              <Label>Salary</Label>
              <Input
                type="text"
                name="salary"
                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
                value={input.salary}
                onChange={changeEventHandler}
              />
            </div>
            <div className="pr-10">
              <Label>Location</Label>
              <Input
                type="text"
                name="location"
                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
                value={input.location}
                onChange={changeEventHandler}
              />
            </div>
            <div>
              <Label>Jobtype</Label>
              <Input
                type="text"
                name="jobtype"
                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
                value={input.jobtype}
                onChange={changeEventHandler}
              />
            </div>
            <div className="pr-10">
              <Label>Experience</Label>
              <Input
                type="text"
                name="experience"
                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
                value={input.experience}
                onChange={changeEventHandler}
              />
            </div>
            <div>
              <Label>No. of Position</Label>
              <Input
                type="number"
                name="position"
                min="0"
                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
                value={input.position}
                onChange={changeEventHandler}
              />
            </div>
          </div>

          {companies.length > 0 && (
            <Select onValueChange={selectChangeHandler} defaultValue="">
              <SelectTrigger>
                <SelectValue placeholder={"Select a Company"} />
              </SelectTrigger>
              <SelectContent className="bg-white border border-gray-300 rounded-md shadow-md">
                <SelectGroup>
                  {companies.map((company) => (
                    <SelectItem
                      value={company?.name?.toLowerCase()}
                      key={company.id}
                    >
                      {company.name}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          )}
          <div className=" flex flex-col items-center">
            
            {loading ? (
            <Button>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please Wait
            </Button>
          ) : (
            <Button
            type="submit"
            className="text-white hover:bg-pink-600/90 flex items-center justify-center mt-4 bg-pink-600 transform transition-transform duration-150 active:scale-95"
          >
            Submit New Job
          </Button>
          )}

            {companyArray.length === 0 && (
              <p className="underline text-xs text-red-600 font-semibold text-center my-3">
                ! Please register a company first before posting a job.
              </p>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}

export default PostJob;
