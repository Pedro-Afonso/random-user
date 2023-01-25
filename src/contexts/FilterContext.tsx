import { createContext, useCallback, useContext, useState } from 'react'

interface FilterContextData {
  isFilterOpen: boolean
  toggleFilter: () => void
}

interface IAppFilterProviderProps {
  children: React.ReactNode
}

const FilterContext = createContext({} as FilterContextData)

export const useFilterContext = () => {
  return useContext(FilterContext)
}

export const AppFilterProvider: React.FC<IAppFilterProviderProps> = ({
  children
}) => {
  const [isFilterOpen, setIsFilterOpen] = useState(false)

  const toggleFilter = useCallback(() => {
    setIsFilterOpen(old => !old)
  }, [])

  return (
    <FilterContext.Provider value={{ isFilterOpen, toggleFilter }}>
      {children}
    </FilterContext.Provider>
  )
}
