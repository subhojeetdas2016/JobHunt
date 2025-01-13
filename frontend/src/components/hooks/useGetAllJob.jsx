import { setAllJobs, setSearchedQuery } from '@/redux/jobslice';
import axios from 'axios';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const JOB_API_END_POINT = "http://localhost:3000/api/v1/job";

const useGetAllJob=()=> {
    const dispatch = useDispatch();
    const {searchedQuery} = useSelector(store=>store.job);

    useEffect(() => {
        const fetchAllJobs = async () => {
            try {
                const res = await axios.get(`${JOB_API_END_POINT}/get?keyword=${searchedQuery}`, { withCredentials: true });
                if (res.data.success) {
                    dispatch(setAllJobs(res.data.jobs));
                }
            } catch (error) {
                console.log("Error fetching jobs:", error);
            }
        };

        fetchAllJobs();
    }, [dispatch]);
}

export default useGetAllJob;
