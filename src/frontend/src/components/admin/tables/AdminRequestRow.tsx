
import { TableData, TableRow } from '../../common/DataTable';
import { extractFullName } from '../../../utils/Extractors';
import { formatDateWithSuffix } from '../../../utils/Formatters';
import { provinceClasses, statusClasses } from '../../../constants/ColorsConstants';
import { RequestData } from '../../../interfaces/ProviderTypes';
import { useDrawerStore } from '../../../stores/DrawerStore';
import ViewRequestForm from '../forms/ViewRequestForm';
import UserIcon from '../../../icons/linear/UserIcon';

type AdminRequestRowProps = {
  request: RequestData
  index: number;
  gridTemplate: string;
}

const AdminRequestRow = ({
  request,
  index,
  gridTemplate,
}: AdminRequestRowProps ) => {

  const provider = request.stockAccountId

  const setOpen = useDrawerStore((state) => state.setOpen)
  const setMainSheet = useDrawerStore((state) => state.setMainSheet)

  const fullName = extractFullName(provider.accountFullName)
  const { text, bg, ring } = provinceClasses[provider.accountAssignedProvince] 
  const { text: statusText, bg: statusBg } = statusClasses[request.stockLevelStatus]
  || { text: "text-black", bg: "bg-gray-200" };

  const handleView = () => {
    setMainSheet({name: "MainSheet1", component: <ViewRequestForm request={request} />})
    setOpen(true)
  }

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
          className="text-green-500 underline underline-offset-2"
          onClick={handleView}
          type="button"
        >
          View
        </button>
      </TableData>
    </TableRow>
  )
}

export default AdminRequestRow