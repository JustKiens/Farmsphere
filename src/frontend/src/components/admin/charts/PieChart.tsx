import { 
  Pie, 
  PieChart as RechartPieChart,
  ResponsiveContainer,
  Cell,
  Tooltip // Import Tooltip from Recharts
} from 'recharts';

type DataCrops = {
  name: string,
  quantity: number
  price: number
}

type PieChartProps = {
  data: DataCrops[]
}

export const PIE_COLORS = ['#9ae66e', '#9667f6', '#34b3f1', '#fcb900', '#ff3d74', '#2ed1d1', '#ff5f00', '#8dce97',  '#15cccc',  '#f10086'];

const PieChart = ({ data } : PieChartProps ) => {

  const totalQuantity = data.reduce((acc, item) => acc + item.quantity, 0) ?? 0;

  return (
    <div className='w-full relative h-[200px]'>
      <ResponsiveContainer>
        <RechartPieChart>
          <Pie 
            data={data} 
            dataKey="quantity" 
            cx="50%" 
            cy="50%" 
            innerRadius={70}  
            outerRadius={90}  
            fill="#82ca9d"
            cornerRadius={20}  
            paddingAngle={-20}  
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index} ${entry}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />
            ))}
          </Pie>

          {/* Add Tooltip */}
          <Tooltip 
            formatter={(value, name) => [`${value} ${name}`]} // Optional: customize tooltip text
            wrapperStyle={{  zIndex: 99 }}
            labelStyle={{ fontWeight: 'bold' }}
            contentStyle={{ color: '#333' }}
          />
        </RechartPieChart>
      </ResponsiveContainer>
      
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          textAlign: 'center',
          pointerEvents: 'none', // Ensure this text doesn't interfere with chart interactivity
        }}
      >
        <p className="text-sm text-gray-500 font-medium">Total Crops</p>
        <h1 className="text-2xl text-gray-900 font-semibold">{totalQuantity}</h1>
      </div>
    </div>
  );
}

export default PieChart;
