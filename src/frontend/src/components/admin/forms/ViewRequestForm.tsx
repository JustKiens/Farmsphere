import { Fragment, useState } from 'react'
import { provinceClasses, statusClasses, stockClasses } from '../../../constants/ColorsConstants'
import { RequestData } from '../../../interfaces/ProviderTypes'
import { useDrawerStore } from '../../../stores/DrawerStore'
import { formatDateWithSuffix } from '../../../utils/Formatters'
import { DrawerHeader } from '../../common/Drawer'
import { approveRequest, declineRequest } from '../../../services/AdminServices'
import { useQueryClient } from '@tanstack/react-query'
import CalendarIcon from '../../../icons/linear/CalendarIcon'
import CheckIcon from '../../../icons/linear/CheckIcon'
import PhilippinePesoIcon from '../../../icons/linear/PhilippinePesoIcon'
import Button from '../../common/Button'
import { UserIcon } from 'lucide-react'
import { extractFullAddress, extractFullName } from '../../../utils/Extractors'
import { addCrops } from '../../../services/BlockchainServices'
import { Crop } from '../../../interfaces/AdminTypes'

type ViewRequestFormProps = {
  request: RequestData
}

const ViewRequestForm = ({request}: ViewRequestFormProps ) => {

  const queryClient = useQueryClient();

  const [ isLoading, setLoading ] = useState<boolean>(false)

  const setMainSheet = useDrawerStore((state) => state.setMainSheet)
  const setOpen = useDrawerStore((state) => state.setOpen)

  const handleClose = () => {
    setOpen(false)
    setMainSheet({name: "", component: null})
  }

  const handleDecline = async () => {
    setLoading(true)
    try {
      const res = await declineRequest(request._id)
      console.log(res)
      queryClient.invalidateQueries({ queryKey: ['adminRequestTableData']})
      setOpen(false)
    } catch (error) {
      console.error(error)
    } finally{
      setLoading(false)
    }
  }

  const stocks = [...request.stockLevelVegetables, ...request.stockLevelFruits]
  const { text, bg, ring } = provinceClasses[request.stockAccountId.accountAssignedProvince] || { text: "text-black", bg: "bg-gray-200" };
  const { text: statusText, bg: statusBg } = statusClasses[request.stockLevelStatus]

  const isDisabled = request.stockAccountId.accountStatus === "deleted"
  const fullName = extractFullName(request.stockAccountId.accountFullName)
  const address = extractFullAddress(request.stockAccountId.accountAddress)

  const handleApprove = async () => {
    setLoading(true)

    const merged = [...request.stockLevelVegetables, ...request.stockLevelFruits]
    const crops = merged.map((crop) => {
      return {
        name: crop.name,
        quantity: crop.quantity,
        price: crop.price,
        province: request.stockAccountId.accountAssignedProvince,
        type: crop.type
      }
    }) as Crop[]
    try {
      await addCrops(crops)
      await approveRequest(request._id)
      setOpen(false)
      queryClient.invalidateQueries({ queryKey: ['adminRequestTableData']})
    } catch (error) {
      
    }
  }



  return (
    <section
      className="w-full h-full flex flex-col items-center justify-between"
    >
      <DrawerHeader 
        title={`Request #${request.stockAccountId.accountClientID}`}
        handleClose={handleClose}
      />
      <section className="w-full h-full flex flex-col overflow-y-scroll overflow-x-hidden p-6">
        <div className=" ring-1 ring-gray-200 w-full rounded-md py-2 px-4 flex items-center justify-between gap-4 mt-2">
          <div className="flex items-center gap-4">
          {isDisabled ? (
            <div className="w-12 h-12 rounded-full bg-gray-500 flex items-center justify-center" >
              <UserIcon className="w-8 h-8 stroke-white stroke-2" />
            </div>
          ) : (

            <img src={request.stockAccountId.accountAvatar} alt={`${request.stockAccountId.accountFullName} avatar`} className="w-12 h-12 rounded-full ring-1 ring-gray-200" />
          )}
            <div className="flex flex-col items-start justify-center">
              <label className="text-sm text-gray-700">
                {isDisabled ? "Deleted Provider":  fullName}
              </label>
              <label className="text-sm text-gray-500">
                {isDisabled ? "" : address}
              </label>
            </div>
          </div>
          <span
            className={`px-2 py-1 rounded-md text-xs uppercase ring-1 ${text} ${bg} ${ring} mr-2`}
          >
            {request.stockAccountId.accountAssignedProvince}        
          </span>
        </div> 
        <div className=" ring-1 ring-gray-200 w-full rounded-md py-2 px-4 flex items-center justify-between gap-4 my-4">
          <div className="flex items-center gap-4">
            <CalendarIcon className="w-4 h-4 stroke-2 stroke-gray-500" />
            <p className="text-sm text-gray-900 font-medium">{formatDateWithSuffix(request.stockLevelDate)}</p>
          </div>
          <div className="flex items-center">
            <span className={`w-2 h-2 rounded-sm ${statusBg}`} />
            <p className={`text-xs ${statusText} py-1 uppercase px-2 w-fit rounded-md `}>
              {request.stockLevelStatus}
            </p>          
          </div>
        </div>

        <label className="text-lg font-medium text-gray-700 tracking-tight">Stocks</label>
        { stocks.length > 0 &&
          <div className="flex flex-col">
            <div className="flex flex-col rounded-md ring-1 ring-gray-200 overflow-clip mt-2">
              <div className="grid grid-cols-[auto_20%_20%_25%] border-b border-gray-200 bg-gray-50 h-8 items-center">
                <p className="text-sm text-gray-700 font-medium px-4">Name</p>
                <p className="text-sm text-gray-700 font-medium px-4">Type</p>
                <p className="text-sm text-gray-700 font-medium px-4">Quantity</p>
                <p className="text-sm text-gray-700 font-medium px-4">Price</p>
              </div>
              {stocks.map((stock, index) => {
                const { bg, text } = stockClasses[stock.type] || { text: "text-black", bg: "bg-gray-200" };
                return (
                  <div key={index} className="grid grid-cols-[auto_20%_20%_25%] h-8 items-center">
                    <p className="text-sm text-gray-700 px-4">{stock.name}</p>
                    <div className="flex items-center w-fit px-4">
                      <span className={`w-2 h-2 rounded-sm ${bg}`} />
                      <p className={`text-xs ${text} py-1 uppercase px-2 w-fit rounded-md `}>
                        {stock.type.charAt(0).toUpperCase() + stock.type.slice(1)}
                      </p>                  
                    </div>
                    <p className="text-sm text-gray-700 px-4">{stock.quantity}</p>
                    <p className="text-sm text-gray-700 px-4 flex items-center font-medium">
                      <PhilippinePesoIcon className="w-4 h-4 stroke-2 stroke-gray-900" />
                      {(stock.price)?.toFixed(2)}
                    </p>
                  </div>
                )
              })}
            </div>
          </div>
        }
        {request.stockLevelNotes && (
          <Fragment>
            <label className="text-lg font-medium text-gray-700 tracking-tight mt-4">Extra Notes</label>
            <p className="text-sm text-gray-500 mt-2">{request.stockLevelNotes}</p>
          </Fragment>
        )}
      </section>
      { request.stockLevelStatus === "pending" &&
        <div
          className="w-full h-fit p-6 border-t border-gray-200 flex items-center justify-center flex-col gap-4"
        >
          <Button
            className="w-full"
            variant="danger"
            disabled={isLoading}
            onClick={handleDecline}
          >
            Decline
          </Button>
          <Button
            className="w-full"
            disabled={isLoading}
            onClick={handleApprove}
          >
            <CheckIcon className=" rounded-full w-4 h-4 stroke-[3px] stroke-white mr-2" />
            Approve
          </Button>

        </div>
      }
    </section>
  )
}

export default ViewRequestForm