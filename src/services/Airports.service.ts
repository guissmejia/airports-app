/* Axios instance */
import { AxiosError } from "axios"
import { AviationStackAPI } from "./api"
import { AirportsResponse, Airport } from "interfaces/airports"

const mapAirport = (apiData: any): any => {
  const {
    flight_date,
    flight_status,
    departure,
    arrival,
    airline,
    flight,
    live,
  } = apiData

  return {
    flight_date,
    ...(flight_date && { flight_date }),
    ...(flight_status && { flight_status }),
    ...(departure && {
      departure,
    }),
    ...(arrival && {
      arrival,
    }),
    ...(airline && {
      airline,
    }),
    ...(flight && {
      flight,
    }),
    ...(live && {
      live,
    }),
  }
}

/**
 * Get Airports list with pagination
 * @param page number page (default 1)
 * @param limit results per page (default 10)
 */
export const fetchAirports = async (
  page = 1,
  limit = 10
): Promise<AirportsResponse<Airport>> => {
  const offset = (page - 1) * limit

  try {
    const response = await AviationStackAPI.get("", {
      params: { limit, offset },
    })

    const result = response.data
    const airports: Airport[] = result.data.map(mapAirport)

    return {
      data: airports,
      pagination: {
        offset: result.pagination.offset,
        limit: result.pagination.limit,
        count: result.pagination.count,
        total: result.pagination.total,
      },
    }
  } catch (error) {
    const errorMessage =
      error instanceof AxiosError ? error.message : "Error fetching airports"
    throw new Error(errorMessage)
  }
}

/**
 * Get Airport Detail By Iata code
 * @param id IATA code
 */
export const fetchAirportDetails = async (id: string): Promise<Airport> => {
  try {
    const response = await AviationStackAPI.get("", {
      params: { flight_iata: id },
    })
    const result = response.data

    if (!result.data || result.data.length === 0) {
      throw new Error("Airport not found")
    }

    return mapAirport(result.data[0])
  } catch (error) {
    const errorMessage =
      error instanceof AxiosError
        ? error.message
        : "Error fetching airport details"
    throw new Error(errorMessage)
  }
}

/**
 * Get Airports by name
 * @param page number page (default 1)
 * @param limit results per page (default 10)
 * @param searchTerm search term
 */
export const fetchAirportsBySearch = async (
  page = 1,
  limit = 10,
  searchTerm: string
): Promise<AirportsResponse<Airport>> => {
  const offset = (page - 1) * limit

  try {
    const response = await AviationStackAPI.get("", {
      params: {
        limit,
        offset,
        airline_name: searchTerm,
      },
    })
    const result = response.data
    const airports: Airport[] = result.data.map(mapAirport)

    return {
      data: airports,
      pagination: {
        offset: result.pagination.offset,
        limit: result.pagination.limit,
        count: result.pagination.count,
        total: result.pagination.total,
      },
    }
  } catch (error) {
    const errorMessage =
      error instanceof AxiosError
        ? error.message
        : "Error fetching airports data by search"
    throw new Error(errorMessage)
  }
}
