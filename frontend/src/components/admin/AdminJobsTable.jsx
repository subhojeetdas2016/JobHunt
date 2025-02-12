import React from "react";
import { Table, TableBody, TableCell } from "../ui/table";
import { TableCaption, TableHead, TableHeader, TableRow } from "../ui/table";
import { Avatar, AvatarImage } from "@radix-ui/react-avatar";
import { Popover } from "@/components/ui/popover";
import { PopoverContent } from "@radix-ui/react-popover";
import { Edit2, Eye, MoreHorizontal } from "lucide-react";
import { PopoverTrigger } from "@/components/ui/popover";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";

const AdminJobsTable = () => {
  const { companies, searchCompanyByText } = useSelector(
    (store) => store.company
  );
  const { allAdminJobs = [] } = useSelector((store) => store.job); // Default value as empty array
  const searchJobByText = useSelector((store) => store.job.searchJobByText); // Job search filter
  const navigate = useNavigate();

  console.log("All companies from Redux store:", companies);
  console.log("Search text for companies:", searchCompanyByText);
  console.log("All jobs from Redux store:", allAdminJobs);
  console.log("Search text for jobs:", searchJobByText);

  // Filter jobs directly during rendering
  const filteredJobs =
    searchJobByText.trim() === ""
      ? allAdminJobs
      : allAdminJobs.filter((job) =>
          job?.company?.name
            ?.toLowerCase()
            ?.includes(searchJobByText.toLowerCase())
        );

  console.log("Filtered jobs based on search text:", filteredJobs);

  return (
    <Table>
      <TableCaption className="font-bold text-pink-600">
        A list of your recently posted jobs.
      </TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Company Name</TableHead>
          <TableHead>Role</TableHead>
          <TableHead>Date</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {filteredJobs.length > 0 ? (
          filteredJobs.map((job) => {
            console.log("Rendering job:", job);
            return (
              <TableRow key={job._id}>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Avatar className="w-10 h-10">
                      <AvatarImage
                        src={job?.company?.logo || "/default-logo.png"}
                        alt={job?.company?.name}
                      />
                    </Avatar>
                    <span>{job?.company?.name}</span>
                  </div>
                </TableCell>
                <TableCell>{job?.title || "No role specified"}</TableCell>
                <TableCell>
                  {new Date(job?.createdAt).toLocaleDateString()}
                </TableCell>
                <TableCell className="text-right pr-9">
                  <Popover>
                    <PopoverTrigger>
                      <Button variant="ghost" className="p-0">
                        <MoreHorizontal className="w-4 h-4" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="bg-white w-40 h-24 rounded-md shadow-md border border-gray-300">
                      <div
                        className="cursor-pointer flex items-center gap-2 text-black hover:bg-gray-200 p-2"
                        onClick={() => {
                          console.log(`Navigating to edit job: ${job._id}`);
                          navigate(`/admin/jobs/${job._id}`);
                        }}
                      >
                        <Edit2 className="w-4" />
                        Edit
                      </div>
                      <div
                        onClick={() => {
                          console.log(
                            `Navigating to applicants for job: ${job._id}`
                          );
                          navigate(`/admin/jobs/${job._id}/applicants`);
                        }}
                        className="cursor-pointer flex items-center gap-2 text-black hover:bg-gray-200 p-2"
                      >
                        <Eye />
                        <span>Applicants</span>
                      </div>
                    </PopoverContent>
                  </Popover>
                </TableCell>
              </TableRow>
            );
          })
        ) : (
          <TableRow>
            <TableCell colSpan={4} className="text-center">
              No jobs found.
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};

export default AdminJobsTable;
