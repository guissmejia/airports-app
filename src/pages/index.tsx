/* App Components */
import React, { useEffect } from "react"

/* UI Components */
import Layout from "components/layout/Layout"
import SearchBar from "components/ui/SearchBar"
import AirportTable from "components/organisms/AirportTable"
import AirportCard from "components/molecules/AirportCard"

/* Store */
import useAirportStore from "store/airportStore"

/* Icons - Assets */
import { Map, Plane } from "lucide-react"
import MainLogo from "assets/MainLogo"

const Index: React.FC = () => {
  const { fetchAirports, filteredAirports, isLoading } = useAirportStore()

  useEffect(() => {
    fetchAirports()
  }, [fetchAirports])

  return (
    <Layout>
      <div className="mt-16 space-y-8 animate-fade-in">
        <section className="text-center pt-8 pb-16">
          <div className="relative inline-block mb-6">
            <Plane className="h-14 w-14 text-blue-500" />
            <div className="absolute -inset-1 bg-blue-500/20 rounded-full blur-xl animate-pulse" />
          </div>
          <div className="w-full max-w-[80%] mx-auto">
          <MainLogo/>
          </div>
        </section>

        {/* Search Section */}
        <section className="max-w-2xl mx-auto">
          <SearchBar />
        </section>

        {/* Content Section */}
        <section>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center">
              <Map className="h-6 w-6 mr-2" />
              Airports
            </h2>
            <div className="text-sm text-gray-500 dark:text-gray-400">
              {filteredAirports.length}{" "}
              {filteredAirports.length === 1 ? "result" : "results"}
            </div>
          </div>

          {/* Table (Desktop) */}
          <div className="hidden sm:block">
            <AirportTable />
          </div>

          {/* Cards (Mobile) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8 sm:hidden">
            {isLoading
              ? Array(3)
                  .fill(0)
                  .map((_, index) => (
                    <div
                      key={index}
                      className="h-48 bg-gray-100 dark:bg-gray-800 rounded-xl animate-pulse"
                    ></div>
                  ))
              : filteredAirports
                  .slice(0, 6)
                  .map((airport) => (
                    <AirportCard key={airport.flight?.iata} airport={airport} />
                  ))}
          </div>
        </section>
      </div>
    </Layout>
  )
}

export default Index
