/* App Components */
import React, { forwardRef } from "react"
import { Search } from "lucide-react"

/* Interfaces */
import { InputProps } from "interfaces/components"

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    { className = "", label, error, icon, fullWidth = false, ...props },
    ref
  ) => {
    return (
      <div className={`${fullWidth ? "w-full" : ""}`}>
        {label && (
          <label
            htmlFor={props.id}
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
          >
            {label}
          </label>
        )}
        <div className="relative">
          {icon && (
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              {icon}
            </div>
          )}
          <input
            ref={ref}
            className={`
              appearance-none block px-4 py-2 
              ${icon ? "pl-10" : "pl-4"} 
              bg-white dark:bg-gray-900 
              border border-gray-300 dark:border-gray-700 
              rounded-md shadow-sm 
              placeholder-gray-400 dark:placeholder-gray-500
              focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
              transition-all duration-200
              disabled:opacity-50 disabled:cursor-not-allowed
              ${error ? "border-red-500 focus:ring-red-500" : ""}
              ${fullWidth ? "w-full" : ""}
              ${className}
            `}
            {...props}
          />
        </div>
        {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
      </div>
    )
  }
)

Input.displayName = "Input"

export const SearchInput: React.FC<Omit<InputProps, "icon">> = (props) => {
  return (
    <Input
      icon={<Search className="h-5 w-5 text-gray-400" />}
      placeholder="Search..."
      {...props}
    />
  )
}

export default Input
