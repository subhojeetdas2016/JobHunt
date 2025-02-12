import { Bookmark } from "lucide-react";
import React from "react";
import { Button } from "./ui/button";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "./ui/badge";

const Job = ({ job }) => {
  const navigate = useNavigate();

  const daysAgoFunction = (mongodbTime) => {
    const createdAt = new Date(mongodbTime);
    const currentTime = new Date();
    const timeDifference = currentTime - createdAt;
    const daysAgo = Math.floor(timeDifference / (1000 * 24 * 60 * 60));
    console.log("Days ago function result:", daysAgo);
    return daysAgo;
  };

  console.log("Job Details:", job); // Logs the full job object to the console

  return (
    <div className="p-5 rounded-md shadow-2xl bg-white border border-gray-200 max-w-full sm:max-w-lg lg:max-w-2xl mx-auto">
      {/* Date and Bookmark */}
      <div className="flex justify-between items-center">
        <p className="text-base">
          {daysAgoFunction(job?.createdAt) === 0
            ? "Today"
            : `${daysAgoFunction(job?.createdAt)} days Ago`}
        </p>
        <Button
          variant="outline"
          className="rounded-full bg-[#e0dcdb] flex items-center justify-center h-10 w-10 p-0"
          size="icon"
        >
          <Bookmark />
        </Button>
      </div>

      {/* Company Info */}
      <div className="flex flex-col sm:flex-row items-center gap-4 my-4">
        <Button className="p-6" variant="outline">
          <Avatar className="w-10 h-10 rounded-full">
            <AvatarImage src={job?.company?.logo} alt="Company Logo" />
          </Avatar>
        </Button>
        <div className="text-center sm:text-left">
          <h1 className="font-medium text-lg">{job?.company?.name}</h1>
          <p className="text-sm text-black/100">India</p>
        </div>
      </div>

      {/* Job Title and Description */}
      <div>
        <h1 className="font-bold text-lg my-2">{job?.title || "Title"}</h1>
        <p className="text-sm sm:text-base">
          {job?.description || "Job description..."}
        </p>
      </div>

      {/* Job Details (Badges) */}
      <div className="flex flex-wrap items-center gap-2 mt-4">
        <Badge className="text-[#3b104d] font-bold" variant="ghost">
          {job?.position || "Positions"}
        </Badge>
        <Badge className="text-[#c31664] font-bold" variant="ghost">
          {job?.jobtype || "Job Type"}
        </Badge>
        <Badge className="text-pink-600/90 font-bold" variant="ghost">
          {job?.salary || "LPA"}
        </Badge>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row items-center gap-4 mt-4">
        <Button
          onClick={() => {
            console.log("Navigating to job description for ID:", job?._id);
            navigate(`/description/${job?._id}`);
          }}
          variant="outline"
          className="w-full sm:w-auto relative text-[#212121] z-10 bg-[#e8e8e8] overflow-hidden transition-all duration-500 before:absolute before:inset-0 before:w-0 before:bg-[#212121] before:z-[-1] before:transition-all before:duration-500 hover:before:w-full hover:text-[#e8e8e8]"
        >
          Details
        </Button>

        <Button
          variant="outline"
          className="w-full sm:w-auto relative text-[#e8e8e8] z-10 bg-[#c31664] overflow-hidden transition-all duration-500 before:absolute before:inset-0 before:w-0 before:bg-pink-600/100 before:z-[-1] before:transition-all before:duration-500 hover:before:w-full hover:text-[#e8e8e8]"
        >
          Save For Later
        </Button>
      </div>
    </div>
  );
};

export default Job;
