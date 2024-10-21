import { useState } from 'react'
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from 'react-hook-form'
import { LoginFormProps } from '../../../interfaces/LandingTypes';
import { LoginSchema } from '../../../schemas/LoginSchema';
import { useNavigate } from 'react-router-dom';
import Button from '../../common/Button'
import ErrorMessage from '../../common/ErrorMessage'
import PasswordInput from '../../common/PasswordInput'
import Input from '../../common/Input'
import { login } from '../../../services/AccountServices';

const LoginForm = () => {

  const navigate = useNavigate()
  const [toggle, setToggle] = useState<boolean>(true)

  const { 
    control,
    handleSubmit,
    formState: { errors },
    clearErrors
  } = useForm<LoginFormProps>({
    resolver: zodResolver(LoginSchema),
    mode: "onSubmit",
    defaultValues: {
      email: "",
      password: "",
    }
  });

  const onSubmit = async (data: LoginFormProps) => {
    const { email, password } = data
    try {
      await login(email, password) 
      navigate("/verification")
    } catch (error) {
      alert(error)
    }
  }

  return (
    <form 
      className=" w-[24rem] h-fit flex-col flex md:mt-48 items-start justify-center  p-8 rounded-md "
      onSubmit={handleSubmit(onSubmit)}
    >
      <h1 className="text-2xl font-medium tracking-tight text-gray-700">Login</h1>
      <label className="text-sm text-gray-700 mt-4">Email</label>
      <Controller 
        name="email"
        control={control}
        render={({ field: { onChange, value} }) => (
          <Input 
            type="text" 
            placeholder="mail@doa.gov.ph" 
            className="w-full mt-2" 
            value={value} 
            onChange={(e) => {
              onChange(e.target.value)
              clearErrors("email")
            }}
            didError={!!errors?.email}
          />
        )}
      />
      <ErrorMessage message={errors?.email?.message} />
      <label className="text-sm text-gray-700 mt-4">Password</label>
      <Controller 
        name="password"
        control={control}
        render={({ field: { onChange, value} }) => (
          <PasswordInput 
            value={value}
            onChange={(e) =>{
              onChange(e.target.value)
              clearErrors("password")
            }}
            className="w-full mt-2" 
            toggle={toggle} 
            setToggle={setToggle}
            didError={!!errors?.password}
          />
        )}
      />
      <ErrorMessage message={errors?.password?.message} />
      <Button className="w-full mt-8" type="submit">Login</Button>

    </form>  
  )
}

export default LoginForm