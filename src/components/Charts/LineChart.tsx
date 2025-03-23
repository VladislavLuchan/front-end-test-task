import React from 'react'
import { CartesianGrid } from 'recharts'
import { Line, LineChart as RechartsLineChart, Tooltip, XAxis, YAxis } from 'recharts'
import { ResponsiveContainer } from 'recharts'

interface LineChartProps {
  data: { name: string, value: number }[];
  title: string;
}

const LineChart: React.FC<LineChartProps> = ({ data, title }) => {
  return (
    <div className="bg-white dark:bg-neutral-800 dark:text-white p-4 rounded-xl shadow-sm">
      <h2 className="text-xl font-semibold mb-4">
        {title}
      </h2>
      <div className="h-[300px]">
        <ResponsiveContainer>
          <RechartsLineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
          <Line type="monotone" dataKey="value" stroke="#8884d8" />
        </RechartsLineChart>
      </ResponsiveContainer>
      </div>
    </div>
  )
}

export default LineChart;
