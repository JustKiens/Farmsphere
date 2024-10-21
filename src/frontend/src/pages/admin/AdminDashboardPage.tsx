import { useEffect, useState } from 'react';
import AreaChart from '../../components/admin/charts/AreaChart';
import BarChart from '../../components/admin/charts/BarChart';
import MapChart from '../../components/admin/charts/MapChart';
import TopChart from '../../components/admin/charts/TopChart';
import ComboBox from '../../components/common/ComboBox';
import { useAccount } from '../../hooks/useAccount'
import AdminLayout from '../../layouts/AdminLayout'
import { formatDateWithSuffixAndDay } from '../../utils/Formatters';

const AdminDashboardPage = () => {

  const { data: account } = useAccount()

  const [ selectedLineProvince, setSelectedLineProvince] = useState<string>("Pampanga");
  const [ pricesData, setPricesData ] = useState<any[]>([]);
  const [ isLineLoading, setLineLoading] = useState<boolean>(false);

  const [selectedBarProvince, setSelectedBarProvince] = useState<string>('Pampanga');
  const [stocksData, setStockData] = useState<any[]>([]);
  const [isBarLoading, setBarLoading] = useState<boolean>(false);
  
  const [ mapData, setMapData ] = useState<any[]>([]);
  const [ isMapLoading, setMapLoading ] = useState<boolean>(false);


  const fetchStocksData = async (province: string) => {
    setBarLoading(true);
    try {
      const response = await fetch(`${import.meta.env.VITE_CANISTER_URL}/crops/stock/${province}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setStockData(data);
    } catch (error) {
      console.error('Error fetching crops:', error);
    } finally {
      setBarLoading(false);
    }
  };

  useEffect(() => {
    fetchStocksData(selectedBarProvince);
  }, [selectedBarProvince]);

  const fetchPriceData = async (province: string) => {
    setLineLoading(true);
    try {
      const response = await fetch(`${import.meta.env.VITE_CANISTER_URL}/crops/price/${province}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setPricesData(data);
    } catch (error) {
      console.error('Error fetching crops:', error);
    } finally {
      setLineLoading(false);
    }
  };
  useEffect(() => {
    fetchPriceData(selectedLineProvince);
  }, [selectedLineProvince]); 
  

  const fetchMapData = async () => {
    setMapLoading(true);
    try {
      const response = await fetch(`${import.meta.env.VITE_CANISTER_URL}/crops/location`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setMapData(data);
    } catch (error) {
      console.error('Error fetching crops:', error);
    } finally {
      setMapLoading(false);
    }
  }

  useEffect(() => {
    fetchMapData();
  }, []);

  const getGreeting = () => {
    const currentHour = new Date().getHours();
    if (currentHour < 12) {
      return "Good morning";
    } else if (currentHour < 18) {
      return "Good afternoon";
    } else {
      return "Good evening";
    }
  };




  return (
    <AdminLayout>
      <main
        className="grid grid-rows-[9%_auto_50%] w-full h-full p-6 "
      >
        <div className="flex flex-col items-start gap-1 pb-4">
          <h1 className="text-xl font-medium text-gray-900 ">{`${getGreeting()},`}
            <span className="font-medium text-green-500">{" " + account?.accountFullName.firstName}</span>
          </h1>
          <p className="text-sm text-gray-500">{formatDateWithSuffixAndDay(new Date())}</p>
        </div>
        <article className=" grid grid-cols-[50%_auto] w-full h-full pb-6 gap-6">
          <div className="w-full h-full flex-col gap-4 items-center bg-white ring-1 rounded-3xl ring-gray-200 flex justify-start p-4 ">
            <div className="flex items-center justify-between w-full">
              <label className="font-bold text-gray-900 text-2xl">Stocks</label>
              <ComboBox 
                options={[
                  "Pampanga",
                  "Bulacan",
                  "Nueva Ecija",
                  "Tarlac",
                  "Zambales",
                  "Aurora",
                  "Bataan"
                ]}
                className="w-40"
                value={selectedBarProvince}
                placeholder='province'
                setValue={(item) => setSelectedBarProvince(item)}
              />
            </div>
            {isBarLoading ?(
              <div>Loading...</div>
            ) : (
              <BarChart data={stocksData} />
            )}
          </div>
          <div className="w-full h-full flex-col gap-4 items-center bg-white ring-1 rounded-3xl ring-gray-200 flex justify-start p-4 ">
            <div className="flex items-center justify-between w-full">
              <label className="font-bold text-gray-900 text-2xl">Price Summary</label>
              <ComboBox 
                options={[
                  "Pampanga",
                  "Bulacan",
                  "Nueva Ecija",
                  "Tarlac",
                  "Zambales",
                  "Aurora",
                  "Bataan"
                ]}
                className="w-40"
                value={selectedLineProvince}
                placeholder='province'
                setValue={(item) => setSelectedLineProvince(item)}
              />
            </div>
            {isLineLoading ?(
              <div>Loading...</div>
            ) : (
              <AreaChart data={pricesData}/>
            )}
          </div>
        </article>
        <article
          className="grid grid-cols-[auto_30%] w-full h-full"
        >
          {isMapLoading ? (
            <div>Loading...</div>
          ): (
            <MapChart data={mapData}/>
          )}
          <section className="w-full h-full pl-6">
            <div className="w-full h-full flex flex-col gap-4 items-center bg-white ring-1 rounded-3xl ring-gray-200 p-6">
              <label className="font-bold text-gray-900 text-2xl mb-6 w-full">Popular crops</label>
              <TopChart />
            </div>
          </section>

        </article>
      </main>
    </AdminLayout>  
    )
}

export default AdminDashboardPage