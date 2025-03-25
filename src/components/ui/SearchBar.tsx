/* App Components */
import React, { useState, useRef, useEffect } from "react"

/* Atoms */
import { SearchInput } from "components/atoms/Input"

/* Store */
import useAirportStore from "store/airportStore"

/* Icons */
import { X, Trash } from "lucide-react"

const SearchBar: React.FC = () => {
  const { searchAirports, searchHistory, removeSearchHistoryItem } =
    useAirportStore()
  const [isHistoryOpen, setIsHistoryOpen] = useState(false)
  const [inputValue, setInputValue] = useState("")
  const [errorMessage, setErrorMessage] = useState("")
  const historyRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        historyRef.current &&
        !historyRef.current.contains(event.target as Node)
      ) {
        setIsHistoryOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value)
    if (e.target.value.trim().length >= 3) {
      setErrorMessage("")
    }
  }

  const handleSearchButtonClick = () => {
    if (inputValue.trim() !== "" && inputValue.trim().length < 3) {
      setErrorMessage("Ingrese al menos 3 caracteres")
      return
    }
    setErrorMessage("")
    searchAirports(inputValue)
    setIsHistoryOpen(false)
  }

  const handleClearSearch = () => {
    setInputValue("")
    searchAirports("")
    setErrorMessage("")
  }

  const handleHistoryItemClick = (term: string) => {
    setInputValue(term)
    searchAirports(term)
    setIsHistoryOpen(false)
  }

  const handleRemoveHistoryItem = (term: string, e: React.MouseEvent) => {
    e.stopPropagation()
    removeSearchHistoryItem(term)
  }

  return (
    <div className="relative" ref={historyRef}>
      <div className="relative w-full animate-fade-in flex items-center">
        <SearchInput
          fullWidth
          value={inputValue}
          onChange={handleInputChange}
          onFocus={() => searchHistory.length > 0 && setIsHistoryOpen(true)}
          placeholder="Search airports by name, code or city..."
          className="bg-white dark:bg-gray-900 shadow-sm"
        />
        {inputValue && (
          <button
            onClick={handleClearSearch}
            className="absolute right-20 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-500"
          >
            <X className="h-5 w-5" />
          </button>
        )}
        <button
          onClick={handleSearchButtonClick}
          className="ml-2 px-4 py-2 bg-blue-500 text-white rounded-md"
        >
          Search
        </button>
      </div>
      <div className="mt-1 text-xs text-gray-500">
        You can filter by the exact name of the towel.
      </div>
      {errorMessage && (
        <div className="mt-2 text-sm text-red-500">{errorMessage}</div>
      )}

      {/* Dropdown - History Search */}
      {isHistoryOpen && searchHistory.length > 0 && (
        <div className="absolute mt-1 w-full bg-white dark:bg-gray-900 rounded-md shadow-lg z-10 border border-gray-200 dark:border-gray-700 animate-scale-in">
          <div className="py-1 max-h-60 overflow-auto">
            <div className="px-4 py-2 text-xs text-gray-500 dark:text-gray-400 font-medium">
              Recent Searches
            </div>
            {searchHistory.map((term, index) => (
              <div key={index} className="flex items-center justify-between">
                <button
                  className="flex-grow text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800"
                  onClick={() => handleHistoryItemClick(term)}
                >
                  {term}
                </button>
                <button
                  onClick={(e) => handleRemoveHistoryItem(term, e)}
                  className="px-2 text-gray-400 hover:text-red-500"
                >
                  <Trash className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default SearchBar
