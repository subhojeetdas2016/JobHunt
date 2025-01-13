import React from 'react';
import Job from './Job';
import { useSelector } from 'react-redux';
import { motion } from "framer-motion";

const LatestJob = () => {
  const { allJobs = [] } = useSelector((store) => store.job || {});

  console.log("All Jobs:", allJobs); // Debugging

  return (
    <div className='max-w-7xl mx-auto my-20'>
      <h1 className='pl-5 text-4xl font-bold'>
        <span className='text-[#c31664]'>Get Latest </span>Jobs
      </h1>
      <motion.div 
initial={{ opacity: 0, x: 100 }}
animate={{ opacity: 1, x: 0 }}
exit={{ opacity: 0, x: -100 }}
transition={{ duration: 0.3 }}
      className='pl-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 my-5'>  
        {allJobs.length <= 0 ? (
          <span>No Jobs Found</span>
        ) : (
          allJobs.slice(0, 6).map((job) => <Job key={job._id} job={job} />)
        )}
      </motion.div>
    </div>
  );
};

export default LatestJob;
