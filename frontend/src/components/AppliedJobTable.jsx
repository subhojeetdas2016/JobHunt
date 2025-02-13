import React from "react";
import {
  Table,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  TableBody,
} from "./ui/table";
import { Badge } from "./ui/badge";
import { useSelector } from "react-redux";

function AppliedJobTable() {
  const { allAppliedJobs } = useSelector((store) => store.job);

  console.log("Rendering AppliedJobTable...");
  console.log("Fetched Applied Jobs:", allAppliedJobs);

  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Job Role</TableHead>
            <TableHead>Company</TableHead>
            <TableHead className="text-center">Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {allAppliedJobs && allAppliedJobs.length > 0 ? (
            allAppliedJobs.map((appliedJob) => {
              console.log("Rendering row for applied job:", appliedJob);
              return (
                <TableRow key={appliedJob._id}>
                  <TableCell>
                    {appliedJob?.createdAt?.split("T")[0] || "N/A"}
                  </TableCell>
                  <TableCell>{appliedJob?.job?.title || "N/A"}</TableCell>
                  <TableCell>
                    {appliedJob?.job?.company?.name || "N/A"}
                  </TableCell>
                  <TableCell className="text-center">
                    <Badge
                      className={`cursor-pointer text-white font-semibold rounded-full text-sm ${
                        appliedJob.status === "Selected"
                          ? "bg-[#73b887]"
                          : "bg-red-500"
                      }`}
                    >
                      {appliedJob.status || "Pending"}
                    </Badge>
                  </TableCell>
                </TableRow>
              );
            })
          ) : (
            <TableRow>
              <TableCell colSpan={4} className="text-center">
                You haven't applied for any jobs yet.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}

export default AppliedJobTable;
