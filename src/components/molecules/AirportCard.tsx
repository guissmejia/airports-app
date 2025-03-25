/* App Components */
import React from "react"
import { useRouter } from "next/navigation"

/* ICons */
import { Plane } from "lucide-react"

/* Atoms */
import Card, { CardContent } from "components/atoms/Card"

/* Interfaces */
import { Airport } from "interfaces/airports"

interface AirportCardProps {
  airport: Airport
}

const AirportCard: React.FC<AirportCardProps> = ({ airport }) => {
  const router = useRouter()

  const handleClick = () => {
    router.push(`/airport/${airport?.flight?.iata}`)
  }

  return (
    <Card
      hoverable
      onClick={handleClick}
      className="h-full flex flex-col animate-fade-in"
    >
      <CardContent className="flex-grow">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="font-semibold text-lg text-gray-900 dark:text-white truncate">
              {airport.airline?.name}
            </h3>
          </div>
          <div className="bg-blue-100 dark:bg-blue-900 rounded-md px-2 py-1 text-blue-700 dark:text-blue-300 font-medium text-sm">
            {airport?.airline?.iata}
          </div>
        </div>

        <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-800 text-sm text-gray-600 dark:text-gray-300">
          <div className="flex items-center mb-1">
            <Plane className="h-4 w-4 mr-1" />
            <span className="font-medium">ICAO:</span>
            <span className="ml-1">{airport?.airline?.icao}</span>
          </div>
          <div className="flex items-center">
            <span className="font-medium">Timezone:</span>
            <span className="ml-1">{airport?.departure?.timezone}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default AirportCard
