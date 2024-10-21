
import { useToken } from '../../../hooks/useToken'
import { useNavigate } from 'react-router-dom'
import { zodResolver } from '@hookform/resolvers/zod'
import { Controller, useForm } from 'react-hook-form'
import { VerifyEmail } from '../../../interfaces/AccountType'
import { VerifyEmailSchema } from '../../../schemas/AccountSchema'
import { resentOtp, verifyEmail } from '../../../services/AccountServices'
import Input from '../../common/Input'
import ErrorMessage from '../../common/ErrorMessage'
import Button from '../../common/Button'

const VerificationForm = () => {

  const navigate = useNavigate()
  const { data: email } = useToken()

  const { 
    control, 
    handleSubmit,
    formState: { errors },
    setError,


  } = useForm<VerifyEmail>({
    defaultValues: {
      otp: ""
    },
    resolver: zodResolver(VerifyEmailSchema)
  })

  const onSubmit = async (data: VerifyEmail) => {
    try {
      const response = await verifyEmail(data)
      if (response  === "admin"){
        navigate("/dashboard")
      }
      if (response === "provider"){
        navigate("/home")
      }
    } catch (error) {
      setError("otp", {
        type: "manual",
        message: "Invalid OTP"
      })
    }
  }

  const handleResend = async () => {
    try {
      await resentOtp()
    } catch (error) {
      console.error(error)
    }
  }


  return (
    <form className="w-[20rem] flex-col flex items-start justify-center "
      onSubmit={handleSubmit(onSubmit)}
    >
      <h1 className="text-2xl font-medium tracking-tight text-gray-700 mt-4">Verification</h1>
      <p className="text-sm text-gray-500 mt-4">
        Please enter the One-Time Password that has been sent to 
          <span className="font-semibold text-neutral-900 mx-1">{email}</span> 
        to verify your identity.
      </p>
      <label className="text-base text-gray-700 mt-4">OTP</label>
      <Controller
        name="otp"
        control={control}
        render={({ field: { onChange, value } }) => (
          <Input 
            value={value}
            onChange={onChange}
            className="w-full mt-2" 
            placeholder="123456"
            didError={!!errors?.otp}
            maxLength={6}
            onlyNumbers
          />
        )}
      />
      <ErrorMessage message={errors?.otp?.message} />
      <Button 
        className="w-full mt-6" 
        type="submit"
      >
        Verify
      </Button>
      <p className="text-sm text-gray-500 mt-4">
        Didn't receive the OTP?
        <button 
          className="text-green-500 cursor-pointer ml-1"
          type='button'
          onClick={handleResend}
        >
          Resend OTP
        </button>
      </p>
    </form>
  )
}

export default VerificationForm