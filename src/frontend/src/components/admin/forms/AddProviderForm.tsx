import { FormProvider, useForm } from 'react-hook-form'
import { useDrawerStore } from '../../../stores/DrawerStore'
import { DrawerFooter, DrawerHeader } from '../../common/Drawer'
import { ProviderAccount } from "../../../interfaces/AccountType"
import { zodResolver } from "@hookform/resolvers/zod"
import { AccountSchema } from "../../../schemas/AdminSchema"
import { uploadAvatar } from "../../../services/FileServices"
import { createProvider } from "../../../services/AdminServices"
import { useQueryClient } from '@tanstack/react-query'
import AddProviderStep from '../steps/AddProviderStep'

const AddProviderForm = () => {

  const queryClient = useQueryClient()
  const setIsLoading = useDrawerStore((state) => state.setIsLoading)
  const isLoading = useDrawerStore((state) => state.isLoading)
  const setMainSheet = useDrawerStore((state) => state.setMainSheet)
  const setOpen = useDrawerStore((state) => state.setOpen)

  const handleClose = () => {
    setOpen(false)
    setMainSheet({name: "", component: null})
  }

  const methods = useForm<ProviderAccount>({
    defaultValues: {  
      accountAvatarFile: null,
      accountAvatar: "",
      accountClientID: "",
      accountFullName: {
        firstName: "",
        middleName: "",
        lastName: "",
        suffixName: "N/A",
      },
      accountAddress: {
        street: "",
        barangay: "",
        city: "",
        province: "",
      },
      accountGender: "",
      accountBirthDate: undefined,
      accountNationality: "",
      accountCivilStatus: "",
      accountEmail: "",
      accountPhoneNumber: "",
      accountRole: "",
      accountAssignedProvince: "",

    },
    resolver: zodResolver(AccountSchema)
  })

  const { handleSubmit, reset } = methods

  const onSubmit = async (data: ProviderAccount) => {
    if (!data.accountAvatarFile) return null
    setIsLoading(true)
    try {
      const formData = new FormData()
      formData.append('avatar_picture', data.accountAvatarFile)
      const url = await uploadAvatar(formData)
      data.accountAvatar = url
      await createProvider(data)
      queryClient.invalidateQueries({ queryKey: ["adminProviderTableData"]})
      setOpen(false)
      reset()
    } catch (error) {
      console.log(error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full h-full flex flex-col items-center justify-between"
      >        
        <DrawerHeader 
          title="Add Provider"
          handleClose={handleClose}
        />
        <section className="overflow-y-scroll h-full overflow-x-hidden outline-none w-full">
          <AddProviderStep />
        </section>
        <DrawerFooter 
          handleClose={handleClose}
          handleSubmit={() => {}}
          isLoading={isLoading}
          isFinal={true}
          type="form"
        />
      </form>
    </FormProvider>
  )
}

export default AddProviderForm