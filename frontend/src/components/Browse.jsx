import React, { useEffect } from 'react';
import Navbar from './shared/navbar';
import Job from './Job';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchedQuery } from '@/redux/jobslice';
import useGetAllJob from './hooks/useGetAllJob';
import { motion } from 'framer-motion';

const Browse = () => {
  useGetAllJob();
  const { allJobs } = useSelector((store) => store.job);
  const dispatch = useDispatch();

  console.log("Rendering Browse page...");
  console.log("Fetched jobs:", allJobs);

  useEffect(() => {
    return () => {
      console.log("Cleaning up: Resetting searched query.");
      dispatch(setSearchedQuery(''));
    };
  }, [dispatch]);

  return (
    <div className="overflow-hidden">
      <Navbar />
      <div className="max-w-7xl m-auto my-10">
        <h1 className="pb-5 font-bold text-xl my-10">
          Search Result <span className="text-red-600">({allJobs.length})</span>
        </h1>
        <div className="grid grid-cols-3 gap-4">
          {allJobs.map((job) => {
            console.log("Rendering job:", job);
            return (
              <motion.div
                key={job?._id}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.3 }}
              >
                <Job job={job} />
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Browse;
