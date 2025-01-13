import { Table, TableBody, TableCell } from "../ui/table";
import React, { useEffect, useState } from "react";
import { TableCaption, TableHead, TableHeader, TableRow } from "../ui/table";
import { Avatar, AvatarImage } from "@radix-ui/react-avatar";
import { Popover } from "@/components/ui/popover";
import { PopoverContent } from "@radix-ui/react-popover";
import { Edit2, MoreHorizontal } from "lucide-react";
import { PopoverTrigger } from "@/components/ui/popover";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";

const CompanyTable = () => {
  const { companies = [] } = useSelector((store) => store.company); // Default value as empty array
  const searchCompanyByText = useSelector(
    (store) => store.company.searchCompanyByText
  ); // Get search text
  const [filterCompany, setFilterCompany] = useState(companies);
  const navigate = useNavigate();

  // Update filtered companies when `companies` or `searchCompanyByText` changes
  useEffect(() => {
    if (searchCompanyByText.trim() === "") {
      setFilterCompany(companies); // No filter if search text is empty
    } else {
      const filtered = companies.filter((company) =>
        company.name.toLowerCase().includes(searchCompanyByText.toLowerCase())
      );
      setFilterCompany(filtered);
    }
  }, [companies, searchCompanyByText]);

  return (
    <Table>
      <TableCaption className="font-bold text-pink-600">
        A list of registered companies
      </TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Company Name</TableHead>
          <TableHead>Description</TableHead>
          <TableHead>Date</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {filterCompany.length > 0 ? (
          filterCompany.map((company) => (
            <TableRow key={company._id}>
              <TableCell>
                <div className="flex items-center gap-2">
                  <Avatar className="w-10 h-10">
                    <AvatarImage
                      src={company.logo || "/default-logo.png"}
                      alt={company.name}
                    />
                  </Avatar>
                  <span>{company.name}</span>
                </div>
              </TableCell>
              <TableCell>
                {company.description || "No description provided"}
              </TableCell>
              <TableCell>{/* Add Date if applicable */}</TableCell>
              <TableCell className="text-right pr-9">
                <Popover>
                  <PopoverTrigger>
                    <Button variant="ghost" className="p-0">
                      <MoreHorizontal className="w-4 h-4" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent>
                    <Button
                      className="flex items-center gap-2 text-black hover:bg-gray-200 p-2"
                      onClick={() => navigate(`/admin/companies/${company._id}`)}
                    >
                      <Edit2 className="w-4 h-4" />
                      Edit
                    </Button>
                  </PopoverContent>
                </Popover>
              </TableCell>
            </TableRow>
          ))
        ) : (
          <TableRow>
            <TableCell colSpan={4} className="text-center">
              No companies found.
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};

export default CompanyTable;
