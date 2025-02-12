import { setSingleCompany } from "@/redux/companySlice";
import { COMPANY_API_END_POINT } from "@/utils/constant";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

const useGetCompanyById = (companyId) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchSingleCompany = async () => {
      if (!companyId) {
        console.warn("Company ID is not provided.");
        return;
      }

      try {
        console.log(`Fetching company with ID: ${companyId}...`);
        const res = await axios.get(
          `${COMPANY_API_END_POINT}/get/${companyId}`,
          { withCredentials: true }
        );

        // Debugging API response
        console.log("API Response for single company:", res.data);

        if (res.data.success) {
          console.log("Company fetched successfully:", res.data.company);
          dispatch(setSingleCompany(res.data.company));
        } else {
          console.error("Failed to fetch company:", res.data.message);
        }
      } catch (error) {
        console.error("Error fetching company by ID:", error.message);
        console.error("Full error object:", error);
      }
    };

    fetchSingleCompany();
  }, [companyId, dispatch]);
};

export default useGetCompanyById;
