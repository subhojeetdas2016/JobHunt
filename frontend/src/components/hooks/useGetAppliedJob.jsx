import { APPLICATION_API_END_POINT } from "@/utils/constant";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setAllAppliedJobs } from "@/redux/jobslice";

const useGetAppliedJobs = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchAppliedJobs = async () => {
            console.log("Fetching applied jobs...");
            try {
                const res = await axios.get(`${APPLICATION_API_END_POINT}/get`, { withCredentials: true });
                
                // Debugging API response
                console.log("API Response:", res.data);

                if (res.data.success) {
                    console.log("Applied jobs fetched successfully:", res.data.Application);
                    dispatch(setAllAppliedJobs(res.data.Application));
                } else {
                    console.warn("Failed to fetch applied jobs. Message:", res.data.message);
                }
            } catch (error) {
                console.error("Error fetching applied jobs:", error.message);
                console.error("Full error object:", error);
            }
        };
        
        fetchAppliedJobs();
    }, [dispatch]);
};

export default useGetAppliedJobs;
