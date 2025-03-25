/* App Components */
import type { AppProps } from "next/app"
import { useEffect } from "react"

/* Styles */
import "styles/globals.css"

/* Store */
import useAirportStore from "store/airportStore"

export default function App({ Component, pageProps }: AppProps) {
  const { isDarkMode } = useAirportStore()

  // Initialize dark mode from store on app load
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
  }, [isDarkMode])

  return <Component {...pageProps} />
}
