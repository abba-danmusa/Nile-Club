import { useQuery } from '@tanstack/react-query'
import axios from '../../utils/axios'
import { router } from 'expo-router'

export const useNotifications = () => {
  return useQuery({
    queryKey: ['notifications'],
    queryFn: async () => {
      return axios.get('/notification')
    },
    onError: (error) => {
      Toast(error.response?.data.message || error.message) // prioritize server error message, then client error message
      if (error?.response?.status === 401) { // user isn't logged in
        router.replace('/signin')
      }
    },
    retry: true,
    refetchInterval: 5000 // refetch every after 5 secs
  })
}