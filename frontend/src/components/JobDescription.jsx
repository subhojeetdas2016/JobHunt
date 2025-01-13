import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { APPLICATION_API_END_POINT, JOB_API_END_POINT } from "@/utils/constant";
import { setSingleJob } from "@/redux/jobslice";
import { toast } from "sonner";
import { application } from "./../../../Backend/models/application.model";
import Job from "./Job";
import Navbar from "./shared/navbar";

const JobDescription = () => {
  const params = useParams();
  const jobId = params.id;

  const dispatch = useDispatch();
  const { singleJob = {} } = useSelector((store) => store.job);
  const { user } = useSelector((store) => store.auth);

  // Local state for isApplied
  const [isApplied, setIsApplied] = useState(false);

  const applyJobHandler = async () => {
    try {
      const res = await axios.get(
        `${APPLICATION_API_END_POINT}/apply/${jobId}`,
        { withCredentials: true }
      );
      console.log("Application Response:", res.data);
      if (res.data.success) {
        // Update local state
        setIsApplied(true);
        const updatedSingleJob = {
          ...singleJob,
          applications: [...singleJob.applications, { applicant: user?._id }],
        };
        dispatch(setSingleJob(updatedSingleJob));
        setIsApplied(true);

        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  useEffect(() => {
    const fetchSingleJob = async () => {
      try {
        const res = await axios.get(`${JOB_API_END_POINT}/get/${jobId}`, {
          withCredentials: true,
        });
        console.log("Fetched Job Data:", res.data);
        if (res.data.success) {
          dispatch(setSingleJob(res.data.job));
          // Set isApplied based on fetched job data
          setIsApplied(
            res.data.job.applications.some(
              (application) => application.applicant === user?._id
            )
          );
        }
      } catch (error) {
        console.error(
          "Error fetching single job:",
          error.response?.data || error.message
        );
      }
    };
    fetchSingleJob();
  }, [jobId, dispatch, user?._id]);

  return (
    <div>
    <Navbar/>
    <div className="max-w-7xl mx-auto my-10 ">
      
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-bold text-xl">
            {singleJob?.title || "Loading..."}
          </h1>
          <div className="flex items-center gap-2 mt-4">
            <Badge className="text-[#FF6F61] font-bold" variant="ghost">
              {singleJob?.position || "N/A"}
            </Badge>
            <Badge className="text-[#c31664] font-bold" variant="ghost">
              {singleJob?.jobtype || "N/A"}
            </Badge>
            <Badge className="text-pink-600/90 font-bold" variant="ghost">
              {singleJob?.salary || "Not Specified"}
            </Badge>
          </div>
        </div>

        <Button
          onClick={isApplied ? null : applyJobHandler}
          disabled={isApplied}
          className={`relative transition-all duration-500 ${
            isApplied ? "bg-gray-500 cursor-not-allowed" : "bg-pink-600/90"
          } font-bold text-white active:transform active:scale-95`}
          variant="outline"
        >
          {isApplied ? "Already Applied" : "Apply Now"}
        </Button>
      </div>
      <h1 className="font-medium pt-12 underline">Job Description-</h1>
      <div className="pt-2">
        <h1 className="font-bold my-2">
          Role:{" "}
          <span className="pl-4 font-normal text-gray-800 font-serif">
            {singleJob?.title || "N/A"}
          </span>
        </h1>
        <h1 className="font-bold my-1">
          Location:{" "}
          <span className="pl-4 font-normal text-gray-800 font-serif">
            {singleJob?.location || "N/A"}
          </span>
        </h1>
        <h1 className="font-bold my-1">
          Description:{" "}
          <span className="pl-4 font-normal text-gray-800 font-serif">
            {singleJob?.description || "N/A"}
          </span>
        </h1>
        <h1 className="font-bold my-1">
          Experience:{" "}
          <span className="pl-4 font-normal text-gray-800 font-serif">
            {singleJob?.experience || "N/A"} Year
          </span>
        </h1>
        <h1 className="font-bold my-1">
          Salary:{" "}
          <span className="pl-4 font-normal text-gray-800 font-serif">
            {singleJob?.salary ? `${singleJob.salary} LPA` : "Not Specified"}
          </span>
        </h1>
        <h1 className="font-bold my-1">
          Total Applicants:{" "}
          <span className="pl-4 font-normal text-gray-800 font-serif">
            {singleJob?.applications?.length || "0"}
          </span>
        </h1>
        <h1 className="font-bold my-1">
          Posted Date:{" "}
          <span className="pl-4 font-normal text-gray-800 font-serif">
            {singleJob?.createdAt ? singleJob.createdAt.split("T")[0] : "N/A"}
          </span>
        </h1>
      </div>
    </div>
    </div>
  );
};

export default JobDescription;
