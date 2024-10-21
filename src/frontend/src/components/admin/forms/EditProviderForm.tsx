import { Controller, FormProvider, useForm } from "react-hook-form"
import { provinceClasses, statusClasses } from "../../../constants/ColorsConstants"
import { ChangeAssignedProvince, ChangeEmail, ProviderAccount } from "../../../interfaces/AccountType"
import { useDrawerStore } from "../../../stores/DrawerStore"
import { formatDateWithSuffix } from "../../../utils/Formatters"
import { DrawerFooter, DrawerHeader } from "../../common/Drawer"
import { zodResolver } from "@hookform/resolvers/zod"
import { useQueryClient } from "@tanstack/react-query"
import { ChangeAssignedProvinceSchema } from "../../../schemas/AdminSchema"
import { changeAssignedProvince, changeEmail, resetPassword } from "../../../services/AdminServices"
import { provinces } from "../../../constants/InputConstant"
import { useState } from "react"
import Input from "../../common/Input"
import CalendarIcon from "../../../icons/linear/CalendarIcon"
import UserSquareIcon from "../../../icons/linear/UserSquareIcon"
import HeartIcon from "../../../icons/linear/HeartIcon"
import VerifiedIcon from "../../../icons/linear/VerifiedIcon"
import ErrorMessage from "../../common/ErrorMessage"
import ComboBox from "../../common/ComboBox"
import Button from "../../common/Button"


type EditProviderFormProps = {
  provider: ProviderAccount
}

const EditProviderForm = ({ provider }: EditProviderFormProps) => {


  const [ email, setEmail ] = useState<string>(provider.accountEmail)
  const [ error, setError ] = useState<string | null>(null)

  const queryClient = useQueryClient()
  const setOpen = useDrawerStore((state) => state.setOpen)
  const isLoading = useDrawerStore((state) => state.isLoading)
  const setIsLoading = useDrawerStore((state) => state.setIsLoading)

  const handleClose = () => {
    setOpen(false)
  }

  
  const methods = useForm<ChangeAssignedProvince>({
    defaultValues: {  
      _id: provider._id,
      accountAssignedProvince: provider.accountAssignedProvince
    },
    resolver: zodResolver(ChangeAssignedProvinceSchema)
  })

  const {
    handleSubmit, 
    reset,
    control, 
    clearErrors,
    formState: { errors },
   } = methods

  const onSubmit = async (data: ChangeAssignedProvince) => {
    setIsLoading(true)
    try {
      await changeAssignedProvince(data)
      queryClient.invalidateQueries({ queryKey: ["adminProviderTableData"]})
      setOpen(false)
      reset()
    } catch (error) {
      console.log(errors)
    } finally {
      setIsLoading(false)
    }
  }

  const { text, bg, ring } = provinceClasses[provider.accountAssignedProvince] || { text: "text-black", bg: "bg-gray-200" };
  const { text: text2, bg: bg2 } = statusClasses[provider.accountStatus] || { text: "text-black", bg: "bg-gray-200" };


  const handleChangeEmail = async (data: ChangeEmail) => {
    setIsLoading(true)
    try {
      await changeEmail(data)
      queryClient.invalidateQueries({ queryKey: ["adminProviderTableData"]})
      setOpen(false)
      reset()
    } catch (error) {
      setError("Email already exists")
    } finally {
      setIsLoading(false)
    }
  }

  const handleResetPassword = async () => {
    setIsLoading(true)
    try {
      await resetPassword(provider._id)
      setOpen(false)
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
          title="Edit Provider"
          handleClose={handleClose}
        />
        <section className="w-full h-full flex flex-col overflow-y-scroll overflow-x-hidden py-6">
          <div className="w-full px-6">
            <div className=" ring-1 ring-gray-200 w-full rounded-md py-2 px-4 flex items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <img src={provider.accountAvatar} alt={`${provider.accountFullName} avatar`} className="w-12 h-12 rounded-full ring-1 ring-gray-200" />
                <div className="flex flex-col items-start justify-center">
                  <label className="text-sm text-gray-700 font-medium">
                    {provider.accountFullName.firstName + " " + provider.accountFullName.lastName}
                  </label>
                  <label className="text-sm text-gray-500">
                  {
                    provider.accountAddress.street + ", " + 
                    provider.accountAddress.barangay + ", " +
                    provider.accountAddress.city + ", " + 
                    provider.accountAddress.province
                  }
                  </label>
                </div>
              </div>
              <span
                className={`px-2 py-1 rounded-md text-xs uppercase ring-1 ${text} ${bg} ${ring} mr-2`}
              >
                {provider.accountAssignedProvince}        
              </span>
            </div> 
          </div>
          <div className="flex flex-col w-full py-6 gap-6">
            <div className="grid grid-cols-2 px-6">
              <div className="flex items-center gap-2">
                <figure className="w-9 h-9 flex items-center justify-center rounded-md bg-gray-100">
                  <CalendarIcon className="w-5 h-5 stroke-2 stroke-gray-500" />
                </figure>
                <div className="flex flex-col justify-start">
                  <p className="text-sm font-medium text-gray-500 ">Date of Birth</p>
                  <p className="text-sm font-medium text-gray-900 ">{formatDateWithSuffix(provider.accountBirthDate)}</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <figure className="w-9 h-9 flex items-center justify-center rounded-md bg-gray-100">
                  <VerifiedIcon className="w-5 h-5 stroke-2 stroke-gray-500" />
                </figure>
                <div className="flex flex-col justify-start">
                  <p className="text-sm font-medium text-gray-500 ">Joined At</p>
                  <p className="text-sm font-medium text-gray-900 ">{formatDateWithSuffix(provider.createdAt  )}</p>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 px-6">
              <div className="flex items-center gap-2">
                <figure className="w-9 h-9 flex items-center justify-center rounded-md bg-gray-100">
                  <UserSquareIcon className="w-5 h-5 stroke-2 stroke-gray-500" />
                </figure>
                <div className="flex flex-col justify-start">
                  <p className="text-sm font-medium text-gray-500 ">Gender</p>
                  <p className="text-sm font-medium text-gray-900 ">{provider.accountGender}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <figure className="w-9 h-9 flex items-center justify-center rounded-md bg-gray-100">
                  <HeartIcon className="w-5 h-5 stroke-2 stroke-gray-500" />
                </figure>
                <div className="flex flex-col justify-start">
                  <p className="text-sm font-medium text-gray-500 ">Civil Status</p>
                  <p className="text-sm font-medium text-gray-900 ">{provider.accountCivilStatus}</p>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full p-6 flex items-center justify-between border-y border-gray-200">
            <div className="flex items-center justify-center gap-2">
              <label className="text-base font-medium text-gray-500">Client ID </label>
              <label className="text-base font-medium text-gray-900 ">{provider.accountClientID}</label>
            </div>
            <div className="flex w-fit items-center">
              <span className={`w-2 h-2 rounded-sm ${bg2}`}></span>
              <span
                className={`uppercase text-xs px-2 py-1 rounded-md ${text2} `}
              >
                {provider.accountStatus}
              </span>
            </div>
          </div>
          <div className="flex flex-col w-full px-6 mt-4">
            <label className="text-sm font-medium text-gray-500 tracking-tight">Phone Number</label>
            <label className="text-base font-medium text-gray-900 tracking-tight">{"(+63) " + provider.accountPhoneNumber}</label>
          </div>
          <div className="flex flex-col w-full px-6 mt-4">
            <div className="flex items-center justify-between">
              <label className={`text-sm font-medium text-gray-500 tracking-tight`}>Email</label>
            </div>
            <div className="flex items-center justify-start gap-4 mt-2 flex-shrink-0 w-full">
              <Input
                type="text"
                className="h-10 w-full " 
                placeholder="example@mail.com"
                didError={!!error}
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setError(null);
                }}
              />
              <Button 
                type="button"
                className="w-fit"
                onClick={() => handleChangeEmail({ _id: provider._id, accountEmail: email })}
                disabled={isLoading}
              >
                Change
              </Button>
                
            </div>
              <ErrorMessage message={error} />
            <div className="flex items-center gap-1 mt-2">
              <label className="text-sm text-gray-500 tracking-tight">Have access to the email?{" "}</label>
              <button
                className="text-sm text-green-500 underline-offset-2 underline"
                type="button"
                onClick={handleResetPassword}
              >
                Reset Password
              </button>
            </div>
          </div>
          <div className="flex flex-col w-full px-6 mt-4">
            <label className={`text-sm font-medium text-gray-500 tracking-tight`}>Assigned Province</label>
            <Controller
              name="accountAssignedProvince"
              control={control}
              render={({ field: { onChange, value }}) => (
                <ComboBox
                  options={provinces}
                  className="h-10 w-full mt-2 flex-shrink-0" 
                  placeholder="Choose a province"
                  didError={!!errors?.accountAssignedProvince?.message}
                  value={value}
                  setValue={(item) => {
                    onChange(item);
                    clearErrors('accountAssignedProvince');
                  }}
                />
              )}
            />
          </div>
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

export default EditProviderForm