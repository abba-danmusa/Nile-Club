import { useMutation } from "@tanstack/react-query"
import axios from "../../utils/axios"
import Cloudinary from "../../utils/cloudinary"
import Toast from '../../utils/toast'
import { router } from "expo-router"

export const useCreateEvent = () => {
  return useMutation({
    mutationKey: ["create-event"],
    mutationFn: async (data) => {
      return axios.post("/event", data)
    },
    onSuccess: (data) => {
      Toast(data.data?.message)
    },
    onError: (error) => {
      Toast(error.response?.data.message || error.message) // prioritize server error message, then client error message
      if (error?.response?.status === 401) { // user isn't logged in
        router.replace('/signin')
      }
    },
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