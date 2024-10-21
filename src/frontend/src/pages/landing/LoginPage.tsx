import LoginForm from "../../components/landing/forms/LoginForm"
import LandingLayout from "../../layouts/LandingLayout"

const LoginPage = () => {
  return (
    <LandingLayout>
      <section
        className="w-full h-full  flex flex-col items-center justify-start p-12"
      >
        <LoginForm />
      </section>
    </LandingLayout>
  )
}

export default LoginPage