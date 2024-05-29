import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query'
import axios from '../../utils/axios'
import { router } from 'expo-router'
import Toast from '../../utils/toast'

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

export const useSetNotifications = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationKey: ["set-notifications"],
    mutationFn: async (data) => {
      return axios.post("/notification", data)
    },
    onError: (error, _request, context) => {
      Toast(error.response?.data.message || error.message) // prioritize server error message, then client error message
      if (error?.response?.status === 401) { // user isn't logged in
        return router.replace('/signin')
      }
    },
    onSuccess: (data) => {
      // Toast(data.data?.message)
    },
    onSettled: async () => {
      return await queryClient.invalidateQueries(['notifications'])
    }
  })
}