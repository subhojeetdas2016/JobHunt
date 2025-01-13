import React from "react";
import Navbar from "./shared/navbar";
import { Avatar, AvatarImage } from "@radix-ui/react-avatar";
import { Contact, Mail, Pen } from "lucide-react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Label } from "./ui/label";
import AppliedJobTable from "./AppliedJobTable";
import UpdateProfileDialog from "./UpdateProfileDialog";
import { useState } from "react";
import { useSelector } from "react-redux";
import useGetAppliedJobs from "./hooks/useGetAppliedJob";

// const skills = ['React', 'JavaScript', 'Tailwind'];
const isResume = true; // Declare and initialize isResume variable


function Profile() {
  useGetAppliedJobs();
    const { user } = useSelector((store) => store.auth);
  const [open, setOpen] = useState(false);
  return (
    <div>
      <Navbar />
      <div className="max-w-7xl mx-auto bg-[#D3D3D3] border border-gray-200 rounded-2xl my-5 p-8">
        <div className="flex justify-between  my-5 ">
          <div className="flex items-center">
            <Avatar className="flex h-24 w-24">
              <AvatarImage
                className="rounded-full h-24 w-24"
                src="/bicycle.jpg"
                alt="Profile"
              />
            </Avatar>
            <div className="pl-5">
              <h1 className="font-bold ">{user?.fullname}</h1>
              <p>{user?.profile.bio}</p>
            </div>
          </div>
          <Button
            onClick={() => setOpen(true)}
            className="bg-white text-right"
            variant="outline"
          >
            <Pen />
          </Button>
        </div>
        <div className="my-5">
          <div className="flex items-center gap-3 my-2">
            <Mail />
            <span>{user?.email}</span>
          </div>
          <div className="flex items-center gap-3 my-2">
            <Contact />
            <span>
              (+91) <span>{user?.phoneNumber}</span>
            </span>
          </div>
        </div>
        <div className="my-5">
          <h1 className="font-bold">Skills</h1>
          <div className="flex items-center gap-1 ">
            {user?.profile?.skills?.length > 0 ? (
              user.profile.skills.map((item, index) => (
                <Badge
                  className="px-3 py-1 bg-pink-600 text-white rounded-full text-sm"
                  key={index}
                >
                  {item}
                </Badge>
              ))
            ) : (
              <span>NA</span>
            )}
          </div>
        </div>
        <Label className="text-md font-bold">Resume</Label>
        <div className="flex items-center gap-1">
        {user?.profile?.resumeOriginalName && (
  <a
    target="_blank"
    rel="noopener noreferrer"
    href={user?.profile?.resume}
    className="cursor-pointer px-3 py-1 bg-pink-600 text-white font-semibold rounded-full text-sm"
  >
    {user?.profile?.resumeOriginalName}
  </a>
)}


        </div>
      </div>
      <div className="max-w-7xl  mx-auto bg-white rounded-2xl">
        <h1 className="font-bold text-lg my-5">Applied Jobs</h1>
        <AppliedJobTable />
      </div>
      <UpdateProfileDialog open={open} setOpen={setOpen} />
    </div>
  );
}

export default Profile;
