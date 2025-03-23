import React from 'react'
import { CatModel } from '../../services/catsService'

interface CatsGridProps {
  cats: CatModel[]
}

const CatsGrid: React.FC<CatsGridProps> = ({ cats }) => {
  return (  
    <div className="mt-6 grid  sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {cats?.map((cat: CatModel) => (
        <div
        key={cat.id}
        className="group flex flex-col h-full bg-white dark:bg-neutral-800 dark:text-whiteborder border-gray-200 shadow-sm rounded-xl">
        <div className="p-4 md:p-6">
          <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
            {cat.name}
          </h3>
          <span className="block mb-1 text-xs font-semibold uppercase text-blue-600 dark:text-blue-400">
            Origin: {cat.origin || "Unknown"}
          </span>
          <p className="mt-3 text-gray-500 dark:text-white line-clamp-3">
            {cat.description || "No description available"}
          </p>
          <div className="mt-4 space-y-2">
            <div className="flex justify-between">
              <span>Adaptability:</span>
              <span>{cat.adaptability}/5</span>
            </div>
            <div className="flex justify-between">
              <span>Affection Level:</span>
              <span>{cat.affection_level}/5</span>
            </div>
            <div className="flex justify-between">
              <span>Life Span:</span>
              <span>{cat.life_span} years</span>
            </div>
          </div>
        </div>
      </div>
      ))}
    </div>
  )
}

export default CatsGrid;