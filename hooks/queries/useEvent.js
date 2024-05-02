import { useMutation, useQueryClient } from "@tanstack/react-query"
import axios from "../../utils/axios"
import Cloudinary from "../../utils/cloudinary"
import Toast from '../../utils/toast'
import { router } from "expo-router"
import { useAnimatedStyle } from "react-native-reanimated"

export const useCreateEvent = () => {
  
  const queryClient = useQueryClient()

  return useMutation({
    mutationKey: ["create-event"],
    mutationFn: async (data) => {
      return axios.post("/event", data)
    },
    onError: (error, _request, context) => {
      Toast(error.response?.data.message || error.message) // prioritize server error message, then client error message
      if (error?.response?.status === 401) { // user isn't logged in
        return router.replace('/signin')
      }
      // queryClient.setQueryData(['feeds'], context.previousRequest)
    },
    // onMutate: async (newRequest) => {
    //   await queryClient.cancelQueries(['feeds'])
    //   const previousRequest = queryClient.getQueryData(['feeds'])

    //   queryClient.setQueryData(['feeds'], (oldQueryData) => {
    //     if (!previousRequest) return null
    //     return {
    //       ...oldQueryData,
    //       data: [...oldQueryData.data.feeds, newRequest]
    //     }
    //   })
    //   return { previousRequest }
    // },
    onSuccess: (data) => {
      Toast(data.data?.message)
    },
    onSettled: async () => {
      return await queryClient.invalidateQueries(['feeds'])
    }
  })
}

export const useSetLike = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationKey: ["like-event"],
    mutationFn: async (data) => {
      return axios.post("/event/like", data)
    },
    onError: (error, _request, context) => {
      Toast(error.response?.data.message || error.message) // prioritize server error message, then client error message
      if (error?.response?.status === 401) { // user isn't logged in
        return router.replace('/signin')
      }
    },
    onSuccess: (data) => {
      Toast(data.data?.message)
    },
    onSettled: async () => {
      return await queryClient.invalidateQueries(['feeds'])
    }
  })
}

export const useUploadEventAssets = () => {
  return useMutation({
    mutationKey: ["upload-event-assets"],
    mutationFn: async (data) => {
      return Cloudinary.post(
        '/auto/upload',
        data,
        { 
          headers: { 'Content-Type': 'multipart/form-data' },
          onUploadProgress: (progressEvent) => {
            const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total)
            setUploadProgress(percentCompleted)
          }
        }
      )
    },
    onSuccess: (data) => {
      Toast(data.data?.message)
    },
    onError: (error) => {
      Toast(error.response?.data.message || error.message) // prioritize server error message, then client error message
    },
  })
}