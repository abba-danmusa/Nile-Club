import { useQuery } from '@tanstack/react-query'

export const useFeeds = () => {
  return useQuery({
    queryKey: ['feeds'],
    queryFn: async () => {
      return axios.get('/feed')
    },
    retry: 2
  })
}

// export const useAuthorizeRequest = () => {
//   const queryClient = useQueryClient()
//   return useMutation({
//     mutationKey: ['authorize-request'],
//     mutationFn: async data => {
//       return axios.post('/authorization/request', data)
//     },
//     onMutate: async (newRequest) => {
//       await queryClient.cancelQueries(['pending-authorization'])
//       await queryClient.cancelQueries(['authorization-request'])
//       await queryClient.cancelQueries(['pending-authorization-count'])
//       const previousRequest = queryClient.getQueryData(['pending-authorization'])

//       queryClient.setQueryData(['pending-authorization'], (oldQueryData) => {
//         if (!previousRequest) return null
//         return {
//           ...oldQueryData,
//           data: [...oldQueryData.data.requests, newRequest]
//         }
//       })
//       return { previousRequest }
//     },
//     onSuccess: (data) => {
//       socket.emit('approval notification',
//         data.data.request.from,
//         data.data.request._id,
//         data.data.request.requestStatus.authorization
//       )
//     },
//     onError: (_error, _request, context) => {
//       queryClient.setQueryData(['pending-authorization'], context.previousRequest)
//     },
//     onSettled: () => {
//       queryClient.invalidateQueries(['authorization-request'])
//       queryClient.invalidateQueries(['pending-authorization'])
//       queryClient.invalidateQueries(['pending-authorization-count'])
//     }
//   })
// }