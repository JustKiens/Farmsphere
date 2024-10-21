import { 
  Bar, 
  BarChart as RechartBarChart, 
  CartesianGrid, 
  Tooltip, 
  XAxis, 
  YAxis 
} from 'recharts'


type Stock = {
  name: string
  quantity: number
}

type BarChartProps = {
  data: Stock[]
}

const BarChart = ({ data }:BarChartProps) => {



  return (
    <RechartBarChart 
      width={730} 
      height={230} 
      data={data} 
      barGap={5} 
    >
      <CartesianGrid 
        strokeDasharray="2 4" 
        vertical={false} 
      />
      <XAxis 
        dataKey="name" 
        tickLine={false}
        tick={{ 
          transform: "translate(-3, 0)", 
          fontSize: 12,
          fontWeight: 600,
          fill: "#9ca3af"
        }}
        tickMargin={15}
        tickSize={2}
      />
      <YAxis 
        axisLine={false} 
        tickLine={false}
        tickFormatter={(value) => value === 0 ? '0' : Math.floor(value / 1000) + 'K'}
        tick={{ 
          fill: "#9ca3af",
          fontSize: 16,
        }}  
        tickMargin={0}
      />
      <Tooltip 
        cursor={{ fill: 'none' }} // Disable hover background
      />
      <Bar 
        dataKey="quantity" 
        fill="#f59e0b" 
        radius={[4, 4, 0, 0]} 
        barSize={20}
      />


    </RechartBarChart>
  )
}

export default BarChart