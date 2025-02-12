import { setAllAdminJobs } from "@/redux/jobslice";
import { JOB_API_END_POINT } from "@/utils/constant";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

function useGetAllAdminJobs() {
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchAllAdminJobs = async () => {
            console.log("Fetching all admin jobs...");
            try {
                const res = await axios.get(`${JOB_API_END_POINT}/getadminjobs`, { withCredentials: true });
                console.log("Response from /getadminjobs endpoint:", res.data);
                if (res.data.success) {
                    console.log("Dispatching jobs data to Redux store...");
                    dispatch(setAllAdminJobs(res.data.jobs));
                } else {
                    console.warn("Failed to fetch jobs, success status is false.");
                }
            } catch (error) {
                console.error("Error fetching jobs:", error);
            }
        };

        fetchAllAdminJobs();
    }, [dispatch]);
}

export default useGetAllAdminJobs;
