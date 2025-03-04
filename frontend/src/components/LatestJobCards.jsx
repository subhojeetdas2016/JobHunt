import React from 'react';
import { Badge } from './ui/badge';
import { useNavigate } from 'react-router-dom';

const LatestJobCards = ({ Job }) => {
  const navigate = useNavigate();

  // Debugging Logs
  console.log("Rendering Job Card for:", Job); // Logs the entire job object
  console.log("Job ID:", Job?._id); // Logs the job ID for navigation
  console.log("Company Name:", Job?.company?.name); // Logs the company name
  console.log("Job Title:", Job?.title); // Logs the job title

  return (
    <div
      onClick={() => {
        console.log("Navigating to job description for Job ID:", Job?._id); // Logs navigation action
        navigate(`/description/${Job?._id}`);
      }}
      className="m-5 p-10 rounded-md shadow-2xl bg-white border-[#817878] cursor-pointer"
    >
      <div>
        <h1 className="font-medium text-lg">{Job?.company?.name || 'Unknown Company'}</h1>
        <p className="text-sm text-gray-500">India</p>
      </div>
      <div>
        <h1 className="font-bold text-lg my-2">{Job?.title || 'Job Title Not Available'}</h1>
        <p className="text-sm text-gray-600">{Job?.description || 'No description provided.'}</p>
      </div>
      <div className="flex items-center gap-2 mt-4">
        <Badge className="text-[#FF6F61] font-bold" variant="ghost">{Job?.position || 'Position Unknown'}</Badge>
        <Badge className="text-[#c31664] font-bold" variant="ghost">{Job?.jobtype || 'Type Not Specified'}</Badge>
        <Badge className="text-pink-600/90 font-bold" variant="ghost">{Job?.salary || 'Salary Not Disclosed'}</Badge>
      </div>
    </div>
  );
};

export default LatestJobCards;
