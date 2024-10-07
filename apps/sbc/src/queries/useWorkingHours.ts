import { useQueries } from '@tanstack/react-query';
import axios from 'axios';

const BASE_API_URL = process.env.NEXT_PUBLIC_BASE_API_URL;

// Functions to fetch each working hours status
const fetchGosiPublic = async () => {
  const response = await axios.get(
    `${BASE_API_URL}api/customer-meeting/isWorkingHours/gosi-public`,
  );
  return response.data;
};

const fetchGosiSignLanguage = async () => {
  const response = await axios.get(
    `${BASE_API_URL}api/customer-meeting/isWorkingHours/gosi-signlanguage`,
  );
  return response.data;
};

const fetchNewGosi = async () => {
  const response = await axios.get(
    `${BASE_API_URL}api/customer-meeting/isWorkingHours/new-gosi`,
  );
  return response.data;
};

// Custom Hook to fetch all data using React Query
export const useWorkingHoursQueries = () => {
  return useQueries({
    queries: [
      {
        queryKey: ['gosiPublic'],
        queryFn: fetchGosiPublic,
        refetchInterval: 300000, // 60 seconds revalidation
      },
      {
        queryKey: ['gosiSignLanguage'],
        queryFn: fetchGosiSignLanguage,
        refetchInterval: 300000,
      },
      {
        queryKey: ['newGosi'],
        queryFn: fetchNewGosi,
        refetchInterval: 300000,
      },
    ],
  });
};
