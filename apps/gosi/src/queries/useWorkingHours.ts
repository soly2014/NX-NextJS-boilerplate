import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const BASE_API_URL = process.env.NEXT_PUBLIC_BASE_API_URL;

// Function to fetch working hours status
const fetchWorkingHoursAll = async () => {
  const response = await axios.get(
    `${BASE_API_URL}api/customer-meeting/isWorkingHoursAll`,
  );
  return response.data;
};

// Custom Hook to fetch all data using React Query
export const useWorkingHoursAllQuery = () => {
  return useQuery({
    queryKey: ['workingHoursAll'],
    queryFn: fetchWorkingHoursAll,
    refetchInterval: 300000, // 5 minutes
  });
};
