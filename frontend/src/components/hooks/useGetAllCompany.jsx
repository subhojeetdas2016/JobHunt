import { COMPANY_API_END_POINT } from '@/utils/constant';
import axios from 'axios';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setCompanies } from '@/redux/companySlice';


const useGetAllCompany = ()=> {
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchcompanies = async () => {
            try {
                const res = await axios.get(`${COMPANY_API_END_POINT}/get`, { withCredentials: true });
                if (res.data.success) {
                    dispatch(setCompanies(res.data.companies));
                }
            } catch (error) {
                console.log("Error fetching jobs:", error);
            }
        };

        fetchcompanies();
    }, [dispatch]);
}

export default useGetAllCompany;
