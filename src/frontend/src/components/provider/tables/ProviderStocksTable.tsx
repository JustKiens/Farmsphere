import { Fragment } from 'react';
import { useQuery } from '@tanstack/react-query';
import { DataTable } from '../../common/DataTable';
import { RequestData } from '../../../interfaces/ProviderTypes';
import { getStocks } from '../../../services/ProviderServices';
import ProviderStocksRow from './ProviderStocksRow';

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

const ProviderStocksTable = () => {


  const { data, isLoading } = useQuery<RequestData[]>(
    {
      queryKey: ['providerStocksTableData'],
      queryFn: getStocks,
    },
  );


  if (isLoading) {
    return <div>Loading...</div>
  }

  const gridTemplate = "auto 15% 15% 15% 10% 15% 5%"

  return (
    <Fragment>

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
            <ProviderStocksRow
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

export default ProviderStocksTable
