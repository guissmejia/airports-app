import { create } from "zustand"
import { persist } from "zustand/middleware"
import {
  fetchAirports,
  fetchAirportDetails,
  fetchAirportsBySearch,
} from "services/Airports.service"

import { AirportState, Airport } from "interfaces/airports"

const useAirportStore = create<AirportState>()(
  persist(
    (set, get) => ({
      airports: [],
      filteredAirports: [],
      selectedAirport: null,
      currentPage: 1,
      totalPages: 1,
      itemsPerPage: 10,
      searchTerm: "",
      searchHistory: [],
      isLoading: false,
      error: null,
      isDarkMode: false,

      fetchAirports: async (page = 1) => {
        set({ isLoading: true, error: null })
        try {
          const response = await fetchAirports(page, get().itemsPerPage)

          set({
            airports: response.data,
            filteredAirports: response.data,
            totalPages: Math.ceil(
              response.pagination.total / get().itemsPerPage
            ),
            currentPage: page,
            isLoading: false,
          })
        } catch (error) {
          set({
            error: error instanceof Error ? error.message : "An error occurred",
            isLoading: false,
          })
        }
      },

      fetchAirportDetails: async (airportId: string) => {
        set({ isLoading: true, error: null })
        try {
          const airport = await fetchAirportDetails(airportId)
          set({ selectedAirport: airport, isLoading: false })
        } catch (error) {
          set({
            error: error instanceof Error ? error.message : "An error occurred",
            isLoading: false,
          })
        }
      },

      searchAirports: async (term: string) => {
        if (term !== "" && term.trim().length < 3) return

        const { searchHistory, itemsPerPage } = get()
        // Actualiza el historial de búsqueda
        if (term && (searchHistory.length === 0 || searchHistory[0] !== term)) {
          set({ searchHistory: [term, ...searchHistory.slice(0, 9)] })
        }

        set({ searchTerm: term, isLoading: true })
        try {
          const response = await fetchAirportsBySearch(1, itemsPerPage, term)
          set({
            airports: response.data,
            filteredAirports: response.data,
            currentPage: 1,
            totalPages: Math.ceil(response.pagination.total / itemsPerPage),
            isLoading: false,
          })
        } catch (error) {
          set({
            error: error instanceof Error ? error.message : "An error occurred",
            isLoading: false,
          })
        }
      },

      setCurrentPage: (page: number) => {
        set({ currentPage: page })
        get().fetchAirports(page)
      },

      selectAirport: (airport: Airport) => {
        set({ selectedAirport: airport })
      },

      clearSelectedAirport: () => {
        set({ selectedAirport: null })
      },

      toggleDarkMode: () => {
        const newMode = !get().isDarkMode
        set({ isDarkMode: newMode })

        if (newMode) {
          document.documentElement.classList.add("dark")
        } else {
          document.documentElement.classList.remove("dark")
        }
      },

      removeSearchHistoryItem: (term: string) => {
        const { searchHistory } = get()
        set({
          searchHistory: searchHistory.filter((item: string) => item !== term),
        })
      },
    }),
    {
      name: "airport-storage",
      partialize: (state) => ({
        searchHistory: state.searchHistory,
        isDarkMode: state.isDarkMode,
      }),
    }
  )
)

export default useAirportStore
