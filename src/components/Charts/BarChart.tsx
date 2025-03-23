import React from 'react'
import { CartesianGrid, Bar, XAxis, YAxis, Tooltip, BarChart as RechartsBarChart } from 'recharts'
import { ResponsiveContainer } from 'recharts'

interface BarChartProps {
  data: { name: string, value: number }[];
  title: string;
}

const BarChart: React.FC<BarChartProps> = ({ data, title }) => {
  return (
    <div className="bg-white dark:bg-neutral-800 dark:text-white p-4 rounded-xl shadow-sm">
      <h2 className="text-xl font-semibold mb-4">
        {title}
      </h2>
      <div className="h-[300px]">
        <ResponsiveContainer>
          <RechartsBarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip  />
          <Bar dataKey="value" fill="#0088FE" />
        </RechartsBarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

export default BarChart;
