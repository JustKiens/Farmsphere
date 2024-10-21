import { useEffect, useState } from "react";
import { mapPathConstants } from "../../constants/PathConstants";
import LandingLayout from "../../layouts/LandingLayout";
import ComboBox from "../../components/common/ComboBox";
import PieChart, { PIE_COLORS } from "../../components/admin/charts/PieChart";
import PhilippinePesoIcon from "../../icons/linear/PhilippinePesoIcon";
import { provinceClasses } from "../../constants/ColorsConstants";
import { Crop } from "../../interfaces/AdminTypes";
import StarIcon from "../../icons/linear/StarIcon";

const mapData = [
  {
    province: "Pampanga",
    position: "left-[34rem] bottom-[14rem] "
  },
  {
    province: "Bulacan",
    position: "left-[44rem] bottom-[14rem] "
  },
  {
    province: "Nueva Ecija",
    position: "left-[40rem] bottom-[30rem] "
  },
  {
    province: "Tarlac",
    position: "left-[27rem] bottom-[22rem] "
  },
  {
    province: "Zambales",
    position: "left-[22rem] bottom-[28rem] "
  },
  {
    province: "Bataan",
    position: "left-[28rem] bottom-[8rem] "
  },
  {
    province: "Aurora",
    position: "left-[60rem] bottom-[40rem] "
  }
];

const StocksPage = () => {
  const [selectedProvince, setSelectedProvince] = useState<string>("Pampanga");
  const [selectedMonth, setSelectedMonth] = useState<string>("January");
  const [data, setData] = useState<Crop[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const fetchCropsMap = async (province: string, month: string) => {
    setIsLoading(true);
    try {
      const response = await fetch(`${import.meta.env.VITE_CANISTER_URL}/crops-map`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          province,
          month,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setData(data);
    } catch (error) {
      console.error('Error fetching crops:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCropsMap(selectedProvince, selectedMonth);
  }, [selectedProvince, selectedMonth]);

  const totalQuantity = data ? data.reduce((acc, item) => acc + item.quantity, 0) : 0;
  const topPricePerCrop = data ? data.sort((a, b) => b.price - a.price).slice(0, 5) : [];

  return (
    <LandingLayout>
      <main className="w-full h-full grid grid-cols-1 md:grid-cols-[30%_auto] border-t border-gray-200 ">
        <article className=" md:block border-r border-gray-200 p-6 overflow-y-scroll flex flex-col">
          <section className="flex items-center justify-between">
            <h1 className="text-3xl font-semibold text-gray-900 p-4 ">
              {selectedProvince}
            </h1>
            <ComboBox 
              options={[
                "January", "February", "March", "April", "May", "June",
                "July", "August", "September", "October", "November", "December",
              ]} 
              className="w-40"
              value={selectedMonth} 
              setValue={(item) => setSelectedMonth(item)}
              placeholder="month"
            />
          </section>
          <section className="w-full h-fit flex flex-col">
            {isLoading ? (
              <div>Loading...</div>
            ) : (
              <>
                <PieChart data={data ?? []}/>
                <div className="w-full h-full flex flex-col gap-3 px-4">
                  {data && data.map((item, index) => {
                    const percentage = ((item.quantity / totalQuantity) * 100).toFixed(2) + "%";
                    return (
                      <div key={index} className="items-center w-full grid grid-cols-[auto_15%]">
                        <div className="flex items-center gap-2">
                          <span
                            className="w-2 h-2 rounded-sm "
                            style={{ backgroundColor: PIE_COLORS[index % PIE_COLORS.length] }}
                          />
                          <h1 className="text-gray-900">{item.name}</h1>
                        </div>
                        <h1 className="text-end text-gray-900 font-medium">{percentage}</h1>
                      </div>
                    );
                  })}
                </div> 
              </>
            )}
          </section>
          <hr className="w-full border-t mt-6 border-gray-200" />
          <section className="w-full h-fit flex flex-col gap-4 p-4">
            <label className={`text-lg mt-2 font-medium text-gray-500 tracking-tight`}>Top Crops</label>
            <div className="w-full h-fit flex flex-col gap-4">
              {topPricePerCrop.length > 0 ? topPricePerCrop.map((item, index) => (
                <div key={index} className="w-full h-fit flex items-center justify-between p-2 ring-1 ring-gray-200 rounded-md px-4">
                  <div className="flex items-center w-fit gap-2">
                    <StarIcon className="w-4 h-4 stroke-2 fill-yellow-500 stroke-yellow-500" />
                    <h1 className="text-gray-900">{item.name}</h1>
                  </div>
                  <h1 className="text-gray-900 font-medium flex items-center gap-2">
                    <PhilippinePesoIcon className="w-4 h-4 stroke-2 stroke-gray-900" />
                    {(item.price).toLocaleString('en-US')}
                  </h1>
                </div>
              )) : (
                <div className="w-full h-full flex items-center justify-center">
                  <h1 className="text-gray-500">No data</h1>
                </div>
              )}
            </div>
          </section>
        </article>
        <article className="w-full h-full flex items-center justify-start bg-gray-100">
          <section className="w-full h-[45rem] flex items-center justify-center relative">
            {mapData.map((province, index) => {
              const { ring, dot } = provinceClasses[province.province] || { ring: "ring-gray-200", dot: "bg-gray-200" };
              return (
                <div
                  key={index}
                  className={`absolute ${province.position} flex items-center gap-2`}
                >
                  <span className={`w-4 h-4 ${dot} rounded-md border-4 border-white`} />
                  <div className={`ring-1 ${ring} rounded-full px-4 py-1 font-medium bg-white text-sm`}>
                    {province.province}
                  </div>
                </div>
              );
            })}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="100%"
              height="100%"
              viewBox="0 0 425 373"
              fill="none"
              className="p-4 md:p-8 stroke-gray-200"
              preserveAspectRatio="xMidYMid meet"
            >
              {mapPathConstants.map((province, index) => {
                const isSelected = selectedProvince === province.province;
                return !isSelected ? (
                  <path
                    key={index}
                    d={province.d}
                    className={`stroke-1 cursor-pointer 
                      ${isSelected ? "stroke-green-500 fill-lime-100" : "stroke-gray-300 fill-gray-200"}`}
                    onClick={() => setSelectedProvince(province.province)}
                  />
                ) : null;
              })}

              {mapPathConstants.map((province, index) => {
                const isSelected = selectedProvince === province.province;
                return isSelected ? (
                  <path
                    key={index}
                    d={province.d}
                    className={`stroke-1 cursor-pointer 
                      ${isSelected ? "stroke-emerald-500 fill-emerald-100" : "stroke-gray-300 fill-200"}`}
                    onClick={() => setSelectedProvince(province.province)}
                  />
                ) : null;
              })}
            </svg>
          </section>
        </article>
      </main>
    </LandingLayout>
  );
};

export default StocksPage;