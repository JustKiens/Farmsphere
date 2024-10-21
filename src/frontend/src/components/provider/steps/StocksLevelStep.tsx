import { MapIcon } from "lucide-react"
import { useAccount } from "../../../hooks/useAccount"
import { formatDateWithSuffix } from "../../../utils/Formatters"
import { fruits, vegetables } from "../../../constants/InputConstant"

import FruitStockCard from "../cards/FruitStockCard"
import TextArea from "../../common/TextArea"
import { Controller } from "react-hook-form"
import VegetableStockCard from "../cards/VegtableStockCard"

const Header = () => {
  return(
    <div className="w-full h-10 rounded-md mb-2 grid grid-cols-[15%_25%_auto_auto] items-center gap-4 mt-6">
      <p className="text-sm text-gray-900 font-medium">Status</p>
      <p className="text-sm text-gray-900 font-medium">Name</p>
      <p className="text-sm text-gray-900 font-medium">Quantity</p>
      <p className="text-sm text-gray-900 font-medium">Price</p>
    </div>
  )
}

const StocksLevelStep = () => {

  const { data: account, isLoading, isError } = useAccount()

  if (isLoading) return <p>Loading...</p>
  if (isError) return <p>Error...</p>

  return (
    <section className="w-full h-full flex flex-col overflow-y-scroll overflow-x-hidden p-6">
      <div className=" ring-1 ring-gray-200 w-full rounded-md py-2 px-4 flex items-center justify-between gap-4">
        <div className=" flex items-center justify-center gap-4">
          <MapIcon className="w-6 h-6 stroke-1 stroke-gray-900"/>
          <div>
            <p className="text-sm text-gray-900 font-medium">{account?.accountAssignedProvince}</p>
            <p className="text-xs text-gray-500">Central Luzon 
              <span className="font-medium">{" "}
                Region 3
              </span>
            </p>
          </div>
        </div>
        <p className="text-sm text-gray-900 font-medium">{formatDateWithSuffix(new Date())}</p>
      </div> 

      <label className="text-lg font-medium text-gray-700 tracking-tigh mt-6 ">Vegetables</label>
      <Header />
      <div 
        className="flex flex-col  mt-2"
      >
        {vegetables.map((vegetable, index) => (
          <VegetableStockCard
            key={index}
            vegetable={vegetable} 
          />
        ))}
      </div>

      <label className="text-lg font-medium text-gray-700 tracking-tigh mt-6 ">Fruits</label>
      <Header />
 
      <div 
        className="flex flex-col  mt-2"
      >
        {fruits.map((fruit, index) => (
          <FruitStockCard
            key={index}
            fruit={fruit} 
          />
        ))}
      </div>
      <label className="text-lg font-medium text-gray-700 tracking-tigh mt-6 ">Extra Notes (Optional)</label>
      <Controller
        name="stockLevelNotes"
        render={({ field: { onChange, value} }) => (
          <TextArea 
            placeholder="Type a notes here..."
            className="mt-2"
            value={value}
            onChange={onChange}
          />
        )}
      />
    </section>
  )
}

export default StocksLevelStep