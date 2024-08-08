import axiosJWT from '../utils/axiosService';
import useSWR, { SWRConfiguration, mutate } from 'swr';

export const fetcher = async (url: string) => {
  try {
    const response = await axiosJWT.get(url);
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};

export const useFetchData = <T,>(url: string, options?: SWRConfiguration) => {
  const { data, error } = useSWR<T>(url, fetcher, options);

  return {
    data,
    isLoading: !error && !data,
    isError: error,
    mutate: () => mutate(url) 
  };
};
