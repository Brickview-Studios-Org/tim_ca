import { fetcher_Company } from "@/libs/fetcher";
import useSWR from "swr";

const useCompany = (id) => {
  const { data, error, isLoading } = useSWR(id, fetcher_Company);

  return {
    company: data,
    isCompanyLoading: isLoading,
    isCompanyError: error,
  };
};

export default useCompany;
