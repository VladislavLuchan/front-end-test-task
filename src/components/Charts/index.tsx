import React from 'react'
import BarChart from './BarChart'
import { countOrigin } from '../../utils'
import PieChart from './PieChart'
import LineChart from './LineChart'
import { CatModel } from '../../services/catsService'

interface ChartsProps {
  cats: CatModel[]
}

const Charts: React.FC<ChartsProps> = ({ cats }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <BarChart 
					data={cats.map((cat: CatModel) => ({ name: cat.name, value: cat.adaptability }))} 
					title="Adaptability Distribution" 
				/>

				<BarChart 
					data={cats.map((cat: CatModel) => ({ name: cat.name, value: cat.affection_level }))} 
					title="Affection Levels" 
				/>

				<PieChart data={countOrigin(cats)} title="Top Origins" showLegend={false} />

				<PieChart data={[
					{ name: "Indoor", value: cats.filter((cat: CatModel) => cat.indoor === 1).length || 0 },
					{ name: "Outdoor", value: cats.filter((cat: CatModel) => cat.indoor === 0).length || 0 },
				]} title="Indoor vs Outdoor" />

				<PieChart data={[
					{ name: "Lap Cat", value: cats.filter((cat: CatModel) => cat.lap === 1).length || 0 },
					{ name: "Not Lap Cat", value: cats.filter((cat: CatModel) => cat.lap === 0).length || 0 },
				]} title="Lap Cat Distribution" />

				<LineChart data={cats.map((cat: CatModel) => ({
					name: cat.name,
					// Convert life span to avarage age
					value: (parseInt(cat.life_span.split(" - ")[0]) + parseInt(cat.life_span.split(" - ")[1])) / 2,
				}))} title="Life Span Distribution" />
    </div>
  )
}

export default Charts;
