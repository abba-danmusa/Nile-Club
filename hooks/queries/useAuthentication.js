import { useMutation } from "@tanstack/react-query";
import axios from "../../utils/axios";
import Toast from '../../utils/toast'
import { router } from "expo-router";

export const useSignup = () => {
  return useMutation({
    mutationKey: ["signup"],
    mutationFn: async (data) => {
      return axios.post("/authentication/signup", data)
    },
    onSuccess: (data) => {
      Toast(data.data?.message)
      router.replace('/verification')
    },
    onError: (error) => {
      console.log(error)
      Toast(error.response?.message || error.message) // prioritize server error message, then client error message
    }
  })
}

export const useSignin = () => {
  return useMutation({
    mutationKey: ["signin"],
    mutationFn: async (data) => {
      return axios.post("/authentication/signin", data)
    }
  })
}