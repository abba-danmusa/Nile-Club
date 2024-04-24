import { useQuery } from '@tanstack/react-query'
import axios from '../../utils/axios'
import { router } from 'expo-router'

export const useChats = () => {
  return useQuery({
    queryKey: ['chats'],
    queryFn: async () => {
      return axios.get('/chat')
    },
    onError: (error) => {
      Toast(error.response?.data.message || error.message) // prioritize server error message, then client error message
      if (error?.response?.status === 401) { // user isn't logged in
        router.replace('/signin')
      }
    },
    retry: true,
  })
}