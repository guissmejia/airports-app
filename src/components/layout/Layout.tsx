/* App Components */
import React, { useEffect } from "react"
import Navbar from "./Navbar"
import Footer from "./Footer"

/* Store */
import useAirportStore from "store/airportStore"

/* Interfaces */
import { LayoutProps } from "interfaces/components"

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { isDarkMode } = useAirportStore()

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
  }, [isDarkMode])

  return (
    <div className="min-h-screen flex flex-col transition-colors duration-300">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 sm:px-6 py-8">
        {children}
      </main>
      <Footer />
    </div>
  )
}

export default Layout
