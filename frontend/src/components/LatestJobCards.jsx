import React from 'react';
import { Badge } from './ui/badge';
import { useNavigate } from 'react-router-dom';
import { motion } from "framer-motion";

const LatestJobCards = ({ Job }) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/description/${Job?._id}`)} // Use Job._id here
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
