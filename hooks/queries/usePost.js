import { useMutation, useQueryClient } from "@tanstack/react-query"
import axios from "../../utils/axios"
import Toast from '../../utils/toast'
import { router } from "expo-router"

export const useCreatePost = () => {

  const queryClient = useQueryClient()

  return useMutation({
    mutationKey: ["create-post"],
    mutationFn: async (data) => {
      return axios.post("/post", data)
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

export const useUpdatePost = () => {

  const queryClient = useQueryClient()

  return useMutation({
    mutationKey: ["update-post"],
    mutationFn: async (data) => {
      return axios.put("/post", data)
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
      return await queryClient.invalidateQueries(['posts'])
    }
  })
}