import { Fragment } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getRequests } from '../../../services/AdminServices';
import { DataTable } from '../../common/DataTable';
import { RequestData } from '../../../interfaces/ProviderTypes';
import AdminRequestRow from './AdminRequestRow';
import { Drawer } from '../../common/Drawer';
import { useDrawerStore } from '../../../stores/DrawerStore';

const header = [
  {
    title: 'PROVIDER',
    sortable: true,
  },
  {
    title: 'ASSIGNED PROVINCE',
    sortable: true,
  },
  {
    title: 'FRUITS',
    sortable: false,
  },
  {
    title: 'VEGETABLES',
    sortable: false,
  },
  {
    title: 'STATUS',
    sortable: false,
  },
  {
    title: 'JOINED AT',
    sortable: false,
  },
  {
    title: '',
    sortable: false,
  },
]

const AdminRequestTable = () => {

  const mainSheet = useDrawerStore((state) => state.mainSheet)
  const isOpen = useDrawerStore((state) => state.isOpen)
  const activeSheets = useDrawerStore((state) => state.activeSheets)


  const { data, isLoading } = useQuery<RequestData[]>(
    {
      queryKey: ['adminRequestTableData'],
      queryFn: getRequests,
    },
  );


  if (isLoading) {
    return <div>Loading...</div>
  }

  const gridTemplate = "auto 15% 15% 15% 10% 15% 5%"

  return (
    <Fragment>
      <Drawer 
        mainSheet={mainSheet}
        isOpen={isOpen}
        activeSheets={activeSheets}
      />
      <DataTable 
        header={header} 
        className=""
        gridTemplateColumns={gridTemplate} 
        currentPage={0}
        onPageChange={() => {}}
        totalPages={0}
      >
        {data?.map((request, index) => (
          <Fragment key={index}>
            <AdminRequestRow
              request={request}
              index={index}
              gridTemplate={gridTemplate}
              key={index}
            />
          </Fragment>
        ))}
      </DataTable>
    </Fragment>
  )
}

export default AdminRequestTable
