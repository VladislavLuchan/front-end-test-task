import React, { useEffect, useState } from 'react'
import { CatModel } from '../../services/catsService'
import CatsGrid from './CatsGrid'


type SortOption = {
  label: string
  value: keyof CatModel | ''
  direction: 'asc' | 'desc'
}

interface CatsGridWithFiltrationProps {
  cats: CatModel[]
}

const CatsGridWithFiltration: React.FC<CatsGridWithFiltrationProps> = ({ cats }) => {
  const [filteredCats, setFilteredCats] = useState<CatModel[]>(cats)
  const [sortOption, setSortOption] = useState<SortOption>({ 
    label: 'No sorting', 
    value: '', 
    direction: 'asc' 
    })
    const [originFilter, setOriginFilter] = useState<string>('')
    const [adaptabilityFilter, setAdaptabilityFilter] = useState<number | null>(null)
    
    const sortOptions: SortOption[] = [
      { label: 'No sorting', value: '', direction: 'asc' },
      { label: 'Name (A-Z)', value: 'name', direction: 'asc' },
      { label: 'Name (Z-A)', value: 'name', direction: 'desc' },
      { label: 'Adaptability (↑)', value: 'adaptability', direction: 'asc' },
      { label: 'Adaptability (↓)', value: 'adaptability', direction: 'desc' },
      { label: 'Affection Level (↑)', value: 'affection_level', direction: 'asc' },
      { label: 'Affection Level (↓)', value: 'affection_level', direction: 'desc' },
    ]
    
    // Get unique values for countries of origin
    const uniqueOrigins = [...new Set(cats.map(cat => cat.origin).filter(Boolean))]
    
    useEffect(() => {
      let result = [...cats]
      
      // Apply filters
      if (originFilter) {
        result = result.filter(cat => cat.origin === originFilter)
      }
      
      if (adaptabilityFilter !== null) {
        result = result.filter(cat => cat.adaptability === adaptabilityFilter)
      }
      
      // Apply sorting
      if (sortOption.value) {
        result = result.sort((a, b) => {
          const aValue = a[sortOption.value as keyof CatModel]
          const bValue = b[sortOption.value as keyof CatModel]
          
          if (typeof aValue === 'string' && typeof bValue === 'string') {
            return sortOption.direction === 'asc' 
              ? aValue.localeCompare(bValue) 
              : bValue.localeCompare(aValue)
          }
          
          if (typeof aValue === 'number' && typeof bValue === 'number') {
            return sortOption.direction === 'asc' 
              ? aValue - bValue 
              : bValue - aValue
          }
          
          return 0
        })
      }
      
      setFilteredCats(result)
    }, [cats, sortOption, originFilter, adaptabilityFilter])
  return (
    <div className="mt-8">
      <div className="mb-8 p-4 dark:bg-neutral-800 dark:border-neutral-800 dark:text-white bg-white border border-gray-200 shadow-sm rounded-xl">
        <h2 className="text-lg font-semibold mb-4">Filtering and Sorting</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Sorting */}
          <div>
            <label htmlFor="sort" className="block text-sm font-medium mb-2">Sort by</label>
            <select 
              id="sort"
              className="py-3 px-4 pe-9 block border-1 w-full dark:border-neutral-600 border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none"
              value={sortOptions.findIndex(opt => opt.label === sortOption.label).toString()}
              onChange={(e) => setSortOption(sortOptions[parseInt(e.target.value)])}
            >
              {sortOptions.map((option, index) => (
                <option key={index} value={index}>{option.label}</option>
              ))}
            </select>
          </div>
          
          {/* Country filter */}
          <div>
            <label htmlFor="origin" className="block text-sm font-medium mb-2">Country of Origin</label>
            <select 
              id="origin"
              className="py-3 px-4 pe-9 block w-full border-1 dark:border-neutral-600 border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none"
              value={originFilter}
              onChange={(e) => setOriginFilter(e.target.value)}
            >
              <option value="">All countries</option>
              {uniqueOrigins.map((origin) => (
                <option key={origin} value={origin}>{origin}</option>
              ))}
            </select>
          </div>
          
          {/* Adaptability filter */}
          <div>
            <label htmlFor="adaptability" className="block text-sm font-medium mb-2">Adaptability</label>
            <select 
              id="adaptability"
              className="py-3 px-4 pe-9 block w-full border-gray-200 dark:border-neutral-600 border-1 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none"
              value={adaptabilityFilter === null ? '' : adaptabilityFilter.toString()}
              onChange={(e) => setAdaptabilityFilter(e.target.value ? parseInt(e.target.value) : null)}
            >
              <option value="">All levels</option>
              {[1, 2, 3, 4, 5].map((level) => (
                <option key={level} value={level}>{level}</option>
              ))}
            </select>
          </div>
        </div>
        
        {/* Filter results info */}
        <div className="mt-4 text-sm text-gray-500">
          Found {filteredCats.length} cat breeds
          {(originFilter || adaptabilityFilter !== null) && (
            <button 
              className="ml-2 text-blue-600 hover:text-blue-800"
              onClick={() => {
                setOriginFilter('')
                setAdaptabilityFilter(null)
              }}
            >
              Reset filters
            </button>
          )}
        </div>
      </div>
      <CatsGrid cats={filteredCats} />
    </div>
  )
}

export default CatsGridWithFiltration;