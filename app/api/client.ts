import {QueryClient} from '@tanstack/react-query'

// Initialze the client
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 0,
      staleTime: Infinity,
      cacheTime: 1000 * 60 * 60 * 24, // 24 hours
      onError: error => console.log('error in QueryClient', error),
    },
  },
})
