import { 
  AreaChart as RechartAreaChart, 
  CartesianGrid, 
  XAxis, 
  Tooltip, 
  YAxis, 
  Area
} from 'recharts'

type Price = {
  name: string
  price: number
}

type AreaChartProps = {
  data: Price[]
}

const AreaChart = ({ data }: AreaChartProps) => {

  return (

    <RechartAreaChart 
      width={730} 
      height={230} 
      data={data}
    >
      <defs>
        <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
          <stop offset="5%" stopColor="#86efac" stopOpacity={0.4}/>
          <stop offset="95%" stopColor="#86efac" stopOpacity={0}/>
        </linearGradient>
      </defs>
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
        tickMargin={40}
      />
      <Tooltip 
        cursor={{ fill: 'none' }} // Disable hover background
      />
      <Area type="linear" dataKey="price" stroke="#22c55e" fillOpacity={1} fill="url(#colorPrice)" />
    </RechartAreaChart>
  )
}

export default AreaChart