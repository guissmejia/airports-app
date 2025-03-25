/* App Components */
import React, { useEffect } from "react"
import { useParams, useRouter } from "next/navigation"

/* Icons */
import { Plane, MapPin, Clock, ArrowLeft, Compass } from "lucide-react"

/* Atoms - Organisms */
import Layout from "components/layout/Layout"
import Button from "components/atoms/Button"
import Card, { CardContent } from "components/atoms/Card"
import MapView from "components/organisms/MapView"

/* Store */
import useAirportStore from "store/airportStore"

const AirportDetail: React.FC = () => {
  const params = useParams<{ airportId: string }>()
  const id = params?.airportId
  const router = useRouter()
  const { fetchAirportDetails, selectedAirport, isLoading, error } =
    useAirportStore()

  useEffect(() => {
    if (id) {
      fetchAirportDetails(id)
    }

    return () => {
      useAirportStore.getState().clearSelectedAirport()
    }
  }, [id, fetchAirportDetails])

  if (error) {
    return (
      <Layout>
        <div className="flex flex-col items-center justify-center min-h-[60vh] animate-fade-in">
          <div className="text-red-500 text-xl mb-4">Error: {error}</div>
          <Button onClick={() => router.push("/")}>Return to Home</Button>
        </div>
      </Layout>
    )
  }

  return (
    <Layout>
      <div className="mt-16 animate-fade-in">
        <Button
          variant="ghost"
          size="sm"
          className="mb-6 flex items-center"
          onClick={() => router.push("/")}
        >
          <ArrowLeft className="h-4 w-4 mr-1" />
          Back to all airports
        </Button>

        {isLoading || !selectedAirport ? (
          <div className="space-y-4">
            <div className="h-12 bg-gray-200 dark:bg-gray-700 rounded-md animate-pulse w-3/4"></div>
            <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded-md animate-pulse w-2/4"></div>
            <div className="h-64 bg-gray-200 dark:bg-gray-700 rounded-xl animate-pulse mt-6"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              <div className="h-48 bg-gray-200 dark:bg-gray-700 rounded-xl animate-pulse"></div>
              <div className="h-48 bg-gray-200 dark:bg-gray-700 rounded-xl animate-pulse"></div>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white">
                {selectedAirport.airline?.name}
              </h1>
              <div className="flex flex-wrap items-center mt-2 text-lg text-gray-600 dark:text-gray-300">
                <div className="flex items-center">
                  <Clock className="h-5 w-5 mr-1 text-blue-500" />
                  {selectedAirport.departure?.timezone}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="md:col-span-1">
                <CardContent>
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                    <Plane className="h-5 w-5 mr-2 text-blue-500" />
                    Airport Codes
                  </h2>
                  <div className="space-y-4">
                    <div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        IATA Code
                      </div>
                      <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                        {selectedAirport?.airline?.iata}
                      </div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        ICAO Code
                      </div>
                      <div className="text-2xl font-bold">
                        {selectedAirport?.airline?.icao}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="md:col-span-1">
                <CardContent>
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                    <Compass className="h-5 w-5 mr-2 text-blue-500" />
                    Coordinates
                  </h2>
                  <div className="space-y-4">
                    <div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        Latitude
                      </div>
                      <div className="text-lg font-medium">
                        {selectedAirport?.live?.latitude.toFixed(4)}°
                      </div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        Longitude
                      </div>
                      <div className="text-lg font-medium">
                        {selectedAirport?.live?.longitude.toFixed(4)}°
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {selectedAirport?.live && (
              <div>
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                  <MapPin className="h-5 w-5 mr-2 text-blue-500" />
                  Map Location
                </h2>
                <MapView airport={selectedAirport} />
              </div>
            )}
          </div>
        )}
      </div>
    </Layout>
  )
}

export default AirportDetail
