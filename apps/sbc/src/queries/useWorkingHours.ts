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

// Custom Hook to fetch working hours data (one-time fetch)
export const useWorkingHoursAllQuery = () => {
  return useQuery({
    queryKey: ['workingHoursAll'], // Optional for reference
    queryFn: fetchWorkingHoursAll,
    enabled: false, // Disable automatic fetching
  });
};
