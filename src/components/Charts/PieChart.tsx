import React from 'react'
import { ResponsiveContainer, Cell, Tooltip, Pie, PieChart as RechartsPieChart, Legend } from 'recharts'
import { COLORS } from '../../utils/constants';

interface PieChartProps {
  data: { name: string, value: number }[];
  title: string;
  showLegend?: boolean;
}

const PieChart: React.FC<PieChartProps> = ({ data, title}) => {  
  return (
    <div className="bg-white dark:bg-neutral-800 dark:text-white p-4 rounded-xl shadow-sm">
      <h2 className="text-xl font-semibold mb-4">{title}</h2>
      <div className="h-[300px]">
        <ResponsiveContainer>
          <RechartsPieChart>
              <Pie
                data={data}
                nameKey="name"
                dataKey="value"
                outerRadius={100}
                legendType="rect"
                >
                {data.map((_: { name: string, value: number }, index: number) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
            </Pie>
            <Legend />
            <Tooltip />
          </RechartsPieChart>
          </ResponsiveContainer>
        </div>
    </div>
  )
}

export default PieChart;
