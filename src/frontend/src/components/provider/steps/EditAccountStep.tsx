import { useState } from "react"
import { Account, ChangePassword } from "../../../interfaces/AccountType"
import { useQueryClient } from "@tanstack/react-query"
import { useNavigate } from "react-router-dom"
import { changePassword, editEmail, logout } from "../../../services/AccountServices"
import Input from "../../common/Input"
import Button from "../../common/Button"
import CheckIcon from "../../../icons/linear/CheckIcon"
import ErrorMessage from "../../common/ErrorMessage"
import PasswordInput from "../../common/PasswordInput"
import { Controller, useForm } from "react-hook-form"
import { ChangePasswordSchema } from "../../../schemas/AccountSchema"
import { zodResolver } from "@hookform/resolvers/zod"

type EditSecurityStepProps = {
  account: Account
}

const EditSecurityStep = ({
  account
}: EditSecurityStepProps ) => {
  
  const queryClient = useQueryClient()
  const navigate = useNavigate()
  const [ isLoading, setIsLoading ] = useState<boolean>(false)
  const [ email, setEmail ] = useState<string>(account.accountEmail)
  const [ error, setError ] = useState<string>("")

  const [ toggle, setToggle ] = useState<boolean>(true)
  const [ toggleNew, setToggleNew ] = useState<boolean>(true)


  const handleEditEmail = async () => {
    setIsLoading(true)
    try {
      await editEmail(account._id, email)
      queryClient.invalidateQueries({ queryKey: ["userAccount"]})
      navigate('/home')
    } catch (error) {
      setError("Email already exists");
    } finally {
      setIsLoading(false)
    }
  }

  const methods = useForm<ChangePassword>({
    defaultValues: {  
      password: "",
      newPassword: "",
      confirmPassword: ""
    },
    resolver: zodResolver(ChangePasswordSchema)
  })

  const { 
    handleSubmit, 
    reset, 
    control, 
    formState: { errors},
    clearErrors,
    setError: setErrors
  } = methods



  const onSubmit = async ( data: ChangePassword) => {
    setIsLoading(true)
    try {
      await changePassword(data)
      queryClient.invalidateQueries({ queryKey: ["userAccount"]})
      await logout()
      navigate('/login')
      reset()
    } catch (error) {
      setErrors("password",{ type: "manual", message: "Password is incorrect"})
    } finally {
      setIsLoading(false)
    }
  }


  return (
    <section 
      className="w-full h-full flex flex-col overflow-y-scroll overflow-x-hidden p-6"
    >
      <label className="text-lg font-medium text-gray-700 tracking-tight ">Email Address</label>
      <div className="flex flex-col mt-2">
        <label className={`text-sm font-medium text-gray-500 tracking-tight`}>Email</label>
        <Input
          type="text"
          className="h-10 w-[27rem] mt-2 flex-shrink-0" 
          placeholder="example@mail.com"
          didError={!!error}
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            setError("");
          }}
        />
        <ErrorMessage message={error} />
      </div>
      <Button
        type="button"
        className="mt-6 px-2 w-fit flex items-center"
        disabled={isLoading}
        onClick={handleEditEmail}
      >
        <CheckIcon className="w-5 h-5 stroke-2 stroke-white" />
        Save Changes
      </Button>
      <label className="text-lg font-medium text-gray-700 tracking-tight mt-6">Security</label>

      <form
        className="flex flex-col mt-2 gap-4"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="flex flex-col">
          <label className={`text-sm font-medium text-gray-500 tracking-tight`}>Password</label>
          <Controller
            name="password"
            control={control}
            render={({ field: { onChange, value }}) => (
              <PasswordInput
                toggle={toggle}
                setToggle={setToggle}
                className="h-10 w-[27rem] mt-2 flex-shrink-0" 
                value={value}
                didError={!!errors?.password?.message}
                onChange={(e) => {
                  onChange(e.target.value);
                  clearErrors("password");
                }}
              />
            )}
          />
          <ErrorMessage message={errors?.password?.message} />
        </div>
        <div className="flex flex-col">
          <label className={`text-sm font-medium text-gray-500 tracking-tight`}>New Password</label>
          <Controller
            name="newPassword"
            control={control}
            render={({ field: { onChange, value }}) => (
              <PasswordInput
                toggle={toggleNew}
                setToggle={setToggleNew}
                className="h-10 w-[27rem] mt-2 flex-shrink-0" 
                value={value}
                didError={!!errors?.newPassword?.message}
                onChange={(e) => {
                  onChange(e.target.value);
                  clearErrors("newPassword");
                }}
              />
            )}
          />
          <ErrorMessage message={errors?.newPassword?.message} />
        </div>
        <div className="flex flex-col">
          <label className={`text-sm font-medium text-gray-500 tracking-tight`}>Confirm Password</label>
          <Controller
            name="confirmPassword"
            control={control}
            render={({ field: { onChange, value }}) => (
              <PasswordInput
                toggle={toggleNew}
                setToggle={setToggleNew}
                className="h-10 w-[27rem] mt-2 flex-shrink-0" 
                value={value}
                didError={!!errors?.confirmPassword?.message}
                onChange={(e) => {
                  onChange(e.target.value);
                  clearErrors("confirmPassword");
                }}
              />
            )}
          />
          <ErrorMessage message={errors?.confirmPassword?.message} />
        </div>
        <Button
          type="submit"
          className="mt-4 px-2 w-fit flex items-center"
          disabled={isLoading}
        >
          <CheckIcon className="w-5 h-5 stroke-2 stroke-white" />
          Save Changes
        </Button>
      </form>
    </section>
  )
}

export default EditSecurityStep