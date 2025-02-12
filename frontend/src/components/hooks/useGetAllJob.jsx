import { setAllJobs } from '@/redux/jobslice';
import axios from 'axios';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { JOB_API_END_POINT } from '@/utils/constant';

const useGetAllJob = () => {
    const dispatch = useDispatch();
    const { searchedQuery } = useSelector((store) => store.job);

    useEffect(() => {
        const fetchAllJobs = async () => {
            console.log("Starting job fetch...");
            console.log("Searched query:", searchedQuery);

            try {
                const res = await axios.get(`${JOB_API_END_POINT}/get?keyword=${searchedQuery}`, { withCredentials: true });

                // Debugging API response
                console.log("API Response:", res.data);

                if (res.data.success) {
                    if (Array.isArray(res.data.jobs)) {
                        console.log("Jobs fetched successfully:", res.data.jobs);
                        dispatch(setAllJobs(res.data.jobs));
                    } else {
                        console.error("Jobs data is not an array:", res.data.jobs);
                    }
                } else {
                    console.warn("Failed to fetch jobs. Message:", res.data.message);
                }
            } catch (error) {
                console.error("Error fetching jobs:", error.message);
                console.error("Full error object:", error);
                console.error("Server response:", error.response?.data || "No response data");
            }
        };

        fetchAllJobs();
    }, [dispatch, searchedQuery]);
};

export default useGetAllJob;
