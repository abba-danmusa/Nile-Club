import { useMutation } from "@tanstack/react-query";
import axios from "../../utils/axios";
import Toast from '../../utils/toast'
import { router } from "expo-router";
import { useAuthStore } from "../stores/useAuthStore";
import AsyncStorage from '@react-native-async-storage/async-storage'

export const useSignup = () => {
  return useMutation({
    mutationKey: ["signup"],
    mutationFn: async (data) => {
      return await axios.post("/authentication/signup", data)
    },
    onSuccess: (data) => {
      Toast(data.data?.message)
    },
    onError: (error) => {
      Toast(error.response?.data.message || error.message) // prioritize server error message, then client error message
    },
  })
}

export const useAbout = () => {
  const { setInitialState } = useAuthStore()
  return useMutation({
    mutationKey: ["about"],
    mutationFn: async (data) => {
      return await axios.post("/authentication/about", data)
    },
    onSuccess: (data) => {
      setInitialState()
      Toast(data.data?.message)
    },
    onError: (error) => {
      Toast(error.response?.data.message || error.message) // prioritize server error message, then client error message
    },
  })
}

export const useCreatePassword = () => {
  return useMutation({
    mutationKey: ["create-password"],
    mutationFn: async (data) => {
      return await axios.post("/authentication/password/create", data)
    },
    onSuccess: (data) => {
      Toast(data.data?.message)
    },
    onError: (error) => {
      Toast(error.response?.data.message || error.message) // prioritize server error message, then client error message
    },
  })
}

export const useSignin = () => {
  const { setInitialState } = useAuthStore()
  return useMutation({
    mutationKey: ["signin"],
    mutationFn: async (data) => {
      return await axios.post("/authentication/signin", data)
    },
    onSuccess: async data => {
      setInitialState()
      await AsyncStorage.setItem('token', data?.data?.token)
      await AsyncStorage.setItem('user', JSON.stringify(data?.data?.user))
      router.replace('/home')
    },
    onError: (error) => {
      Toast(error.response?.data.message || error.message) // prioritize server error message, then client error message
      if (error?.response?.status === 401) { // user did not signup
        router.push('/signup')
      }
      if (error?.response?.status === 402) { // user is yet to verify email
        router.push('/signup')
      }
      if (error?.response?.status === 405) { // user has not submitted their name yet
        router.push('/signup')
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
    },
    onError: error => {
      Toast(error.response?.data.message || error.message) // prioritize server error message, then client error message
    },
  })
}

export const useResend = () => {
  return useMutation({
    mutationKey: ["resend"],
    mutationFn: async data => {
      return await axios.post("/authentication/resend", data)
    },
    onSuccess: data => {
      Toast(data.data?.message)
    },
    onError: (error) => {
      Toast(error.response?.data.message || error.message) // prioritize server error message, then client error message
      if (error.response?.status === 400) { // email already verified
        router.push('/signin')
      }
    }
  })
}