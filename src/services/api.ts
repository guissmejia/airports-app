import axios, { AxiosError } from "axios"

const API_URL = process.env.REACT_APP_AVIATION_STACK_API_URL
const API_KEY = process.env.REACT_APP_AVIATION_STACK_API_KEY

export const AviationStackAPI = axios.create({
  baseURL: API_URL,
  timeout: 10000,
  params: {
    access_key: API_KEY,
  },
})

AviationStackAPI.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    if (error.response) {
      const message =
        (error.response.data as any)?.error?.message ?? "Unknown error"
      return Promise.reject(new Error(message))
    }
    return Promise.reject(error)
  }
)
