import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "../../utils/axios";
import Toast from '../../utils/toast'
import { router } from "expo-router";
import { useAuthStore } from "../stores/useAuthStore";
import AsyncStorage from '@react-native-async-storage/async-storage'

export const useCreateClub = () => {
  return useMutation({
    mutationKey: ["create-club"],
    mutationFn: async (data) => {
      return await axios.post("/club", data)
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

export const useClub = clubId => {
  return useQuery({
    queryKey: ['club', clubId],
    queryFn: async () => {
      return axios.get(`/club?clubId=${clubId}`)
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

export const useClubFeeds = clubId => {
  return useQuery({
    queryKey: ['club-feeds', clubId],
    queryFn: async () => {
      return axios.get(`/club/feed?clubId=${clubId}`)
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

export const useFeaturedClubs = () => {
  return useQuery({
    queryKey: ['featured-clubs'],
    queryFn: async () => {
      return axios.get(`/club/feature`)
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

export const useSetFollowClub = () => {
  return useMutation({
    mutationKey: ["follow-club"],
    mutationFn: async (data) => {
      return await axios.post("/club/follow", data)
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