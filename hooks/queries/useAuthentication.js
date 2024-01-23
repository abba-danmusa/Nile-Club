import { useMutation } from "@tanstack/react-query";
import axios from "../../utils/axios";
import Toast from '../../utils/toast'
import { router } from "expo-router";
import { useAuthStore } from "../stores/useAuthStore";

export const useSignup = () => {
  return useMutation({
    mutationKey: ["signup"],
    mutationFn: async (data) => {
      return await axios.post("/authentication/signup", data)
    },
    onSuccess: (data) => {
      Toast(data.data?.message)
      router.replace('/verification')
    },
    onError: (error) => {
      Toast(error.response?.data.message || error.message) // prioritize server error message, then client error message
    }
  })
}

export const useSignin = () => {
  const { setInitialState } = useAuthStore()
  return useMutation({
    mutationKey: ["signin"],
    mutationFn: async (data) => {
      return await axios.post("/authentication/signin", data)
    },
    onSuccess: data => {
      Toast(data.data?.message)
      router.replace('/home')
    },
    onError: (error) => {
      Toast(error.response?.data.message || error.message) // prioritize server error message, then client error message
      if (error?.response?.status === 401) { // user did not signup
        router.push('/signup')
      }
      if (error?.response?.status === 402) { // user is yet to verify email
        router.push('/verification')
      }
    }
  })
}

export const useVerification = () => {
  return useMutation({
    mutationKey: ['verification'],
    mutationFn: async data => {
      return await axios.post('/authentication/verification', data)
    },
    onSuccess: data => {
      Toast(data.data?.message)
      router.replace('/signin')
    },
    onError: error => {
      Toast(error.response?.data.message || error.message) // prioritize server error message, then client error message
      if (error?.response?.status === 401) { // verification code expires
        router.back()
      }
    }
  })
}

export const useResend = () => {
  return useMutation({
    mutationKey: ["resend"],
    mutationFn: async (data) => {
      return await axios.post("/authentication/resend", data)
    },
    onSuccess: data => {
      Toast(data.data?.message)
      router.push('/verification')
    },
    onError: (error) => {
      Toast(error.response?.data.message || error.message) // prioritize server error message, then client error message
      if (error.response?.status === 400) { // email already verified
        router.push('/signin')
      }
    }
  })
}