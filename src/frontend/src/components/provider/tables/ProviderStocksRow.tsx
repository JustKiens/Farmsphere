import { Fragment, useRef, useState } from 'react';
import { TableData, TableRow } from '../../common/DataTable';
import { extractFullName } from '../../../utils/Extractors';
import { formatDateWithSuffix } from '../../../utils/Formatters';
import { provinceClasses, statusClasses } from '../../../constants/ColorsConstants';
import { RequestData } from '../../../interfaces/ProviderTypes';
import { useDrawerStore } from '../../../stores/DrawerStore';
import { EditIcon } from 'lucide-react';
import PopOver from '../../common/PopOver';
import UserIcon from '../../../icons/linear/UserIcon';
import DeleteIcon from '../../../icons/linear/DeleteIcon';
import ThreeDotsIcon from '../../../icons/linear/ThreeDotsIcon';
import EyeIcon from '../../../icons/linear/EyeIcon';
import EditRequestForm from '../forms/EditRequestForm';
import ViewRequestForm from '../forms/ViewRequestForm';
import { useModalStore } from '../../../stores/ModalStore';

type ProviderStocksRowProps = {
  request: RequestData
  index: number;
  gridTemplate: string;
}

const ProviderStocksRow = ({
  request,
  index,
  gridTemplate,
}: ProviderStocksRowProps ) => {

  const provider = request.stockAccountId

  const setOpen = useDrawerStore((state) => state.setOpen)
  const [isPopoverOpen, setIsPopoverOpen] = useState(false)
  const setMainSheet = useDrawerStore((state) => state.setMainSheet)
  const anchorRef = useRef<HTMLButtonElement | null>(null)
  const setOpenModal = useModalStore((state) => state.setOpen)
  const setConfirmation = useModalStore((state) => state.setConfirmation)


  const setId = useModalStore((state) => state.setId)



  const handleEditRequest = () => {
    setMainSheet({name: "MainSheet1", component: <EditRequestForm request={request} />})
    setOpen(true)
  }
  
  const handleOpenCancelModal = () => {
    setOpenModal(true);
    setConfirmation("Data Request");
    setId(request._id)  
  }


  const handleViewRequest = () => {
    setMainSheet({name: "MainSheet1", component: <ViewRequestForm request={request} />})
    setOpen(true)
  }



  const fullName = extractFullName(provider.accountFullName)
  const { text, bg, ring } = provinceClasses[provider.accountAssignedProvince] 
  const { text: statusText, bg: statusBg } = statusClasses[request.stockLevelStatus]
  || { text: "text-black", bg: "bg-gray-200" };



  const fruits = request.stockLevelFruits
    .map((stock) => stock.name)
    .slice(0, 4)
    .join(", ");
  const vegetables = request.stockLevelVegetables
    .map((stock) => stock.name)
    .slice(0, 4)
    .join(", ");

  const isDisabled = request.stockAccountId.accountStatus === "deleted"

  return (
    <TableRow 
      index={index}
      gridTemplateColumns={gridTemplate}   
    >

      <TableData
        className="flex items-start gap-4 "
      >
        {isDisabled ? (
          <div className="w-9 h-9 rounded-full bg-gray-500 flex items-center justify-center" >
            <UserIcon className="w-5 h-5 stroke-white stroke-2" />
          </div>
        ) : (

          <img src={provider.accountAvatar} alt={`${fullName} avatar`} className="w-9 h-9 rounded-full ring-1 ring-gray-200" />
        )}

        <div className="flex flex-col items-start justify-center">
          <label className="text-sm text-gray-700">
            {isDisabled ? "Deleted Provider" : fullName}
          </label>
          <label className="text-sm text-gray-500">
            {provider.accountClientID}
          </label>
        </div>

      </TableData>
      <TableData
        className=" flex items-center justify-start "
      >
        <span
          className={`px-2 py-1 rounded-md text-xs uppercase ring-1 ${text} ${bg} ${ring}`}
        >
          {provider.accountAssignedProvince}
        </span>
      </TableData>
      <TableData
        className=" flex flex-col items-start justify-center "
      >
        <p className="text-sm text-gray-700 w-full">
          {fruits}
        </p>
      </TableData>
      <TableData className="flex items-start justify-start gap-2">
        <p className="text-sm text-gray-700 w-full ">
          {vegetables}
        </p>
      </TableData>
      <TableData
        className=" flex items-center justify-start "
      >
        <span className={`w-2 h-2 rounded-sm ${statusBg}`} />
        <p className={`text-xs ${statusText} py-1 uppercase px-2 w-fit rounded-md `}>
          {request.stockLevelStatus}
        </p>          
      </TableData>
      <TableData
        className=" flex items-center justify-start w-full"
      >
        <label className="text-sm text-gray-700 w-full ">
          {formatDateWithSuffix(provider.createdAt)}
        </label>
      </TableData>
      <TableData
        className="flex items-start gap-4 relative "
      >
        <button 
          ref={anchorRef}
          onClick={()=>setIsPopoverOpen(!isPopoverOpen)}
        >
          <ThreeDotsIcon className="w-5 h-5 stroke-2 stroke-gray-500 fill-gray-500 -rotate-90 z-0" />
        </button>
        <PopOver 
          anchorRef={anchorRef}
          isOpen={isPopoverOpen}
          onClose={() =>  setIsPopoverOpen(false)}     
          className=" top-0 right-20  py-2 flex flex-col h z-50"
          position='left'

        >
          {
            request.stockLevelStatus === "pending"  && (
              <Fragment>
                <div 
                  className="px-4 cursor-pointer hover:bg-gray-50 w-full py-1 text-base text-start text-gray-700 flex items-center gap-2"
                  onClick={handleEditRequest}
                >
                  <EditIcon className="stroke-2 stroke-gray-500 w-4 h-4 " />
                  Edit
                </div>
                <hr className="border-gray-200 my-1" />
                <div 
                  className="px-4 cursor-pointer hover:bg-gray-50 w-full py-1 text-base text-start text-rose-500 flex items-center gap-2"
                  onClick={handleOpenCancelModal}
                >
                  <DeleteIcon className="stroke-2 stroke-rose-500 w-4 h-4 " />
                  Cancel
                </div>
              </Fragment>
            )
          }
          {
            (request.stockLevelStatus === "approved" || request.stockLevelStatus === "cancelled" || request.stockLevelStatus === "declined") && (  
              <div 
                className="px-4 cursor-pointer hover:bg-gray-50 w-full py-1 text-base text-start text-gray-700 flex items-center gap-2"
                onClick={handleViewRequest}
              >
                <EyeIcon className="stroke-2 stroke-gray-500 w-4 h-4 " />
                View
              </div>
            )
          }
        </PopOver>
      </TableData>
    </TableRow>
  )
}

export default ProviderStocksRow