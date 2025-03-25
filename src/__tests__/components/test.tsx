import { render, screen, fireEvent, act } from "@testing-library/react"
import "@testing-library/jest-dom"
import AirportTable from "components/organisms/AirportTable"
import useAirportStore from "store/airportStore"
import { useRouter } from "next/navigation"

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}))

describe("AirportTable Component", () => {
  const pushMock = jest.fn()

  const initialState = {
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

    // Actions mock
    setCurrentPage: jest.fn(),
    fetchAirports: jest.fn(),
    fetchAirportDetails: jest.fn(),
    searchAirports: jest.fn(),
    selectAirport: jest.fn(),
    clearSelectedAirport: jest.fn(),
    toggleDarkMode: jest.fn(),
    removeSearchHistoryItem: jest.fn(),
  }

  beforeEach(() => {
    // Next Router push mock
    ;(useRouter as jest.Mock).mockReturnValue({ push: pushMock })

    // Restablecer la store a un estado limpio
    act(() => {
      useAirportStore.setState({ ...initialState })
    })
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it("Render rows when isLoading is false", () => {
    act(() => {
      useAirportStore.setState({
        ...initialState,
        filteredAirports: [
          {
            airline: { name: "Test Airline", iata: "TA", icao: "TST" },
            departure: { airport: "Test Departure" },
            arrival: { airport: "Test Arrival" },
            flight_date: "2025-01-01",
            flight: { number: "1234", iata: "TA1234" },
            flight_status: "scheduled",
          },
        ],
      })
    })

    render(<AirportTable />)
    expect(screen.getByText("Test Airline")).toBeInTheDocument()
    expect(screen.getByText("TA")).toBeInTheDocument()
    expect(screen.getByText("2025-01-01")).toBeInTheDocument()
  })

  it("Redirects when clicking on the row", () => {
    act(() => {
      useAirportStore.setState({
        ...initialState,
        filteredAirports: [
          {
            airline: { name: "Test Airline", iata: "TA", icao: "TST" },
            flight: { number: "1234", iata: "TA1234" },
          },
        ],
      })
    })

    render(<AirportTable />)
    fireEvent.click(screen.getByText("Test Airline"))
    expect(pushMock).toHaveBeenCalledWith("/airport/TA1234")
  })

  it("Shows “No airports found” when there are no airports and it is not loading", () => {
    act(() => {
      useAirportStore.setState({
        ...initialState,
        filteredAirports: [],
        isLoading: false,
      })
    })

    render(<AirportTable />)
    expect(screen.getByText(/No airports found/i)).toBeInTheDocument()
  })

  it("Displays loading placeholders when isLoading is true", () => {
    act(() => {
      useAirportStore.setState({
        ...initialState,
        filteredAirports: [],
        isLoading: true,
      })
    })

    render(<AirportTable />)
    const loadingRows = screen.getAllByRole("row")
    expect(loadingRows.length).toBeGreaterThan(1)
  })
})
