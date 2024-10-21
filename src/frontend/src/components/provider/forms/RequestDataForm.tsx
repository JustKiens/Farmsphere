import { useDrawerStore } from '../../../stores/DrawerStore'
import { DrawerFooter, DrawerHeader } from '../../common/Drawer'
import { RequestData } from "../../../interfaces/ProviderTypes"
import { zodResolver } from "@hookform/resolvers/zod"
import { requestData } from "../../../services/ProviderServices"
import { StockLevelSchema } from "../../../schemas/ProviderSchema"
import { useQueryClient } from "@tanstack/react-query"
import { FormProvider, useForm } from "react-hook-form"
import StocksLevelStep from '../steps/StocksLevelStep'

const RequestDataForm = () => {

  const queryClient = useQueryClient()
  const isLoading = useDrawerStore((state) => state.isLoading)
  const setMainSheet = useDrawerStore((state) => state.setMainSheet)
  const setOpen = useDrawerStore((state) => state.setOpen)
  const setIsLoading = useDrawerStore((state) => state.setIsLoading)

  const methods = useForm<RequestData>({
    defaultValues:{
      stockLevelDate: new Date(),
      stockLevelVegetables: [],
      stockLevelFruits: [],
      stockLevelNotes: "",
    },
    resolver: zodResolver(StockLevelSchema)
  })

  const { 
    handleSubmit, 
    reset, 
  } = methods


  const onSubmit = async (data: RequestData) => {
    setIsLoading(true)
    try {
      await requestData(data)
      queryClient.invalidateQueries({ queryKey: ["providerStocksTableData"]})
      setOpen(false)
      reset()
    } catch (error) {
      console.log(error)
    }finally{
      setIsLoading(false)
    }
  }

  const handleClose = () => {
    setOpen(false)
    setMainSheet({name: "", component: null})
  }

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full h-full flex flex-col items-center justify-between"
      >
        <DrawerHeader 
          title="Request Data"
          handleClose={handleClose}
        />
        <section className="overflow-y-scroll h-full overflow-x-hidden outline-none w-full">
          <StocksLevelStep />
        </section>
        <DrawerFooter 
          handleClose={handleClose}
          handleSubmit={() => {}}
          isLoading={isLoading}
          isFinal={true}
          type="form"
        />
      </form>
    </FormProvider >
  )
}

export default RequestDataForm