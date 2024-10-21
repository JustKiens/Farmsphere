import { ReactNode } from "react";
import { motion } from "framer-motion";
import ChevronIcon from "../../icons/linear/ChevronIcon";

interface IHeader {
  title: string;
  sortable: boolean;
}

interface IDataTable {
  header: IHeader[];
  className?: string;
  gridTemplateColumns?: string;
  children: ReactNode;
  paginator?: boolean;
  currentPage?: number;
  totalPages?: number;
  onPageChange?: (page: number) => void;
}

interface ITableData {
  children: ReactNode;
  className?: string;
}

interface ITableRow {
  children: ReactNode;
  className?: string;
  gridTemplateColumns?: string;
  index: number;
  onRowClick?: () => void;
}

const DataTable = ({
  header,
  className,
  gridTemplateColumns,
  children,
  paginator = false,
  currentPage,
  onPageChange,
  totalPages,
}: IDataTable) => {

  const handlePrevPage = () => {
    if (currentPage && onPageChange && currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  }

  const handleNextPage = () => {
    if (currentPage && totalPages && onPageChange && currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  }

  return (
    <table 
      className={ className + ` h-full bg-white flex flex-col w-full`}
    >
      <thead className="w-full">
        <tr
          className="grid grid-flow-col h-fit w-full rounded-md"
          style={{gridTemplateColumns: gridTemplateColumns}}
        >
          {header.map((item, index) => (
            <th
              key={index}
              className="border-y border-gray-200 w-full flex items-center justify-start gap-2 py-4 px-4 uppercase text-left text-gray-500 text-sm font-normal"
            >
              {item.title}
            </th>
          ))}
        </tr>
      </thead>
      <tbody className="bg-white h-full flex-grow-0 overflow-y-auto w-full">
        {children}
      </tbody>
      {paginator && (
        <tfoot className="w-full">
          <tr className="w-full flex gap-4 h-12 border-t justify-center items-center">
            <td className="flex items-center">
              <button
                className="w-8 h-8 rounded-md ring-1 ring-gray-200 flex items-center justify-center"
                onClick={handlePrevPage}
              >
                <ChevronIcon className="rotate-90 stroke-2 stroke-gray-500" />
              </button>
            </td>
            <td>
              <p className="text-base text-gray-500">
                Page {currentPage} of {totalPages}
              </p>
            </td>
            <td className="flex items-center">
              <button
                className="w-8 h-8 rounded-md ring-1 ring-gray-200 flex items-center justify-center"
                onClick={handleNextPage}
              >
                <ChevronIcon className="-rotate-90 stroke-2 stroke-gray-500" />
              </button>
            </td>
          </tr>
        </tfoot>
      )}
    </table>
  )
}

const TableData = ({ 
  children,
  className
}: ITableData ) => {
  return (
    <td 
      className={className + " p-2 px-4 text-sm text-gray-700 font-normal flex items-center"}
    >
      {children}
    </td>
  )
}

const TableRow = ({ 
  children,
  className,
  gridTemplateColumns,
  index,
  onRowClick  
}: ITableRow ) => {
  const variants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 20 },
  };

  return (
    <motion.tr
      className={className + ` grid grid-flow-col py-2 w-full border-b border-gray-200 ${onRowClick && "cursor-pointer"} `}
      style={{ gridTemplateColumns: gridTemplateColumns }}
      initial="hidden"
      animate="visible"
      exit="exit"
      variants={variants}
      transition={{ duration: 0.5, delay: index * 0.05 }} 
      onClick={onRowClick}
    >
      {children}
    </motion.tr>
  )
}

export { DataTable, TableData, TableRow };