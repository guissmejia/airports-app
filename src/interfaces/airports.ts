export interface Airport {
  airport_id?: string
  airport_name?: string
  iata_code?: string
  icao_code?: string
  latitude?: number
  longitude?: number
  gmt?: string
  country_name?: string
  city_name?: string
  country_iso2?: string
  timezone?: string
}

export interface AirportsResponse<T> {
  data: T[]
  pagination: {
    offset: number
    limit: number
    count: number
    total: number
  }
}

export interface AirportParams {
  offset?: number
  limit?: number
  search?: string
}

export interface AirportInfo {
  airport: string
  timezone?: string
  iata?: string
  icao?: string
  terminal?: string | null
  gate?: string | null
  baggage?: string | null
  delay?: number | null
  scheduled?: string
  estimated?: string | null
  actual?: string | null
  estimated_runway?: string | null
  actual_runway?: string | null
}

export interface Airline {
  name: string
  iata: string
  icao: string
}

export interface FlightDetails {
  number?: string
  iata?: string
  icao?: string
  codeshared?: string | null
}

export interface Aircraft {
  registration: string
  iata: string
  icao: string
  icao24: string
}

export interface LiveData {
  updated: string
  latitude: number
  longitude: number
  altitude: number
  direction: number
  speed_horizontal: number
  speed_vertical: number
  is_ground: boolean
}

export interface Airport {
  flight_date?: string
  flight_status?:
    | "scheduled"
    | "active"
    | "landed"
    | "cancelled"
    | "incident"
    | "diverted"
  departure?: AirportInfo
  arrival?: AirportInfo
  airline?: Airline
  flight?: FlightDetails
  aircraft?: Aircraft
  live?: LiveData
}

export interface AirportState {
  airports: Airport[]
  filteredAirports: Airport[]
  selectedAirport: Airport | null
  currentPage: number
  totalPages: number
  itemsPerPage: number
  searchTerm: string
  searchHistory: string[]
  isLoading: boolean
  error: string | null
  isDarkMode: boolean

  fetchAirports: (page?: number) => Promise<void>
  fetchAirportDetails: (airportId: string) => Promise<void>
  searchAirports: (term: string) => void
  setCurrentPage: (page: number) => void
  selectAirport: (airport: Airport) => void
  clearSelectedAirport: () => void
  toggleDarkMode: () => void
  removeSearchHistoryItem: (term: string) => void
}