import { provinceClasses } from "../../../constants/ColorsConstants"
import { positionConstants } from "../../../constants/MapConstants"
import { mapPathConstants } from "../../../constants/PathConstants"

type MapData= {
  province: string
  total: number
}

type MapChartProps = {
  data: MapData[]
}

const MapChart = ({ data}: MapChartProps) => {


  const totalCrops = data.reduce((acc, curr) => acc + curr.total, 0)

  return (
    <section className="w-full h-full flex-shrink-0 ">
      <div className="w-full h-full items-center bg-white ring-1 rounded-3xl ring-gray-200 grid grid-cols-[30%_auto_auto]">
        <div className="flex flex-col p-8 h-full ">
          <label className="font-medium text-gray-500 text-lg">Most Crops Per Location</label>
          <label className="font-bold text-gray-900 text-2xl">{totalCrops.toLocaleString('en-US')}</label>
          <div
            className='w-full h-full flex flex-col gap-4 mt-8 '
          >
            {data.map((province, index) => {
              const {  dot } = provinceClasses[province.province] || { text: "text-black", bg: "bg-gray-200" };
              return (
                <div
                  key={index}
                  className="flex items-center justify-between "
                >
                  <div
                    className="flex items-center gap-4"
                  >
                    <span className={` ${dot} w-2 h-2 rounded-sm flex-shrink-0 `}/>
                    <span
                      className="font-medium text-gray-900"
                    >
                      {province.province}
                    </span>
                  </div>
                  <label className="text-sm text-gray-400 font-medium">{province.total.toLocaleString('en-US')}</label>
                </div>
              )
            })}
          </div>
        </div>
        <hr className="border-r w-[1px] h-[90%] border-gray-200" />
        <div className="w-full h-full relative p-8 px-48">

          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="100%"
            height="100%"
            viewBox="0 0 425 373"
            fill="none"
            className=" stroke-gray-200 "
            preserveAspectRatio="xMidYMid meet"
          >
            {mapPathConstants.map((province, index) => {
              return (
                <path
                  key={index}
                  d={province.d}
                  className="stroke-1 stroke-gray-200 fill-gray-300  "
                />
              )
            })}
          </svg>
          {positionConstants.map((province, index) => {
            const { ring, dot } = provinceClasses[province.province] || { ring: "ring-gray-200", dot: "bg-gray-200" };
            const crops = data.find((crop) => crop.province === province.province)
            return (
              <div
                key={index}
                className={`absolute ${province.position} flex items-center gap-2`}
              >
                <span className={`w-4 h-4 ${dot} rounded-md border-4 border-white`} />
                <div className={`ring-1 ${ring} rounded-full px-4 py-1 font-medium bg-white text-sm`}>
                  {crops ? crops.total.toLocaleString('en-US') : 0}
                </div>
              </div>
            )
          })}
          </div>
      </div>
    </section>  
  )
}

export default MapChart