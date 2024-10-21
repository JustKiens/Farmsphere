import { Fragment } from 'react';
import { useQuery } from '@tanstack/react-query';
import { ProviderAccount } from '../../../interfaces/AccountType';
import { getDisabledProviders } from '../../../services/AdminServices';
import { DataTable } from '../../common/DataTable';
import AdminDisabledProviderRow from './AdminDisabledProviderRow';

const header = [
  {
    title: 'FULL NAME',
    sortable: true,
  },
  {
    title: 'CONTACT',
    sortable: false,
  },
  {
    title: 'ADDRESS',
    sortable: false,
  },
  {
    title: 'ASSIGNED PROVINCE',
    sortable: true,
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

const AdminDisabledProviderTable = () => {


  const { data, isLoading } = useQuery<ProviderAccount[]>(
    {
      queryKey: ['adminDisabledProviderTableData'],
      queryFn: getDisabledProviders,
    },
  );


  if (isLoading) {
    return <div>Loading...</div>
  }

  const gridTemplate = "20% 20% 25% 15% 15% 5%"



  return (
    <DataTable 
      header={header} 
      className=""
      gridTemplateColumns={gridTemplate} 
      currentPage={0}
      onPageChange={() => {}}
      totalPages={0}
    >
      {data?.map((provider, index) => (
        <Fragment key={index}>
          <AdminDisabledProviderRow 
            provider={provider}
            index={index}
            gridTemplate={gridTemplate}
            key={index}
          />
        </Fragment>
      ))}
    </DataTable>
  )
}

export default AdminDisabledProviderTable
