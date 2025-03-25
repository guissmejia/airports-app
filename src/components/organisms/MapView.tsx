/* App Components */
import React, { useEffect, useRef } from "react"

/* Styles */
import "leaflet/dist/leaflet.css"

/* Interfaces */
import { Airport } from "interfaces/airports"

interface MapViewProps {
  airport: Airport
}

const MapView: React.FC<MapViewProps> = ({ airport }) => {
  const mapRef = useRef<HTMLDivElement>(null)
  const mapInstanceRef = useRef<any>(null)
  const latitude: any = airport?.live?.latitude || null
  const longitude: any = airport?.live?.longitude || null

  useEffect(() => {
    if (typeof window === "undefined" || !mapRef.current) return

    import("leaflet").then((L) => {
      if (!mapInstanceRef.current) {
        //@ts-ignore
        mapInstanceRef.current = L.map(mapRef.current).setView(
          [latitude, longitude],
          10
        )

        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
          attribution:
            '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        }).addTo(mapInstanceRef.current)
      } else {
        mapInstanceRef.current.setView(
          [airport?.live?.latitude, airport?.live?.longitude],
          10
        )
      }

      mapInstanceRef.current.eachLayer((layer: any) => {
        if (layer instanceof L.Marker) {
          mapInstanceRef.current.removeLayer(layer)
        }
      })

      // Custom Icon
      const customIcon = L.divIcon({
        className: "custom-marker",
        html: `
          <div class="relative">
            <div class="absolute flex items-center justify-center w-12 h-12 bg-blue-500 rounded-full shadow-lg transform -translate-x-1/2 -translate-y-1/2 border-2 border-white">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
              </svg>
            </div>
            <div class="absolute w-16 h-16 bg-blue-500 rounded-full opacity-20 animate-ping transform -translate-x-1/2 -translate-y-1/2"></div>
          </div>
        `,
        iconSize: [24, 24],
        iconAnchor: [12, 12],
      })

      L.marker([latitude, longitude], {
        icon: customIcon,
      })
        .addTo(mapInstanceRef.current)
        .bindPopup(
          `
          <div class="text-center">
            <div class="font-bold">${airport.airline?.name}</div>
            <div class="font-semibold text-blue-600">${airport?.departure?.iata}</div>
          </div>
        `
        )
        .openPopup()
    })

    return () => {
      if (mapInstanceRef.current && !mapRef.current) {
        mapInstanceRef.current.remove()
        mapInstanceRef.current = null
      }
    }
  }, [airport])

  return (
    <div
      ref={mapRef}
      className="h-[400px] w-full rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden"
      style={{ zIndex: 0 }}
    />
  )
}

export default MapView
