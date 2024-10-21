import { Link, useNavigate } from "react-router-dom"
import Button from "../common/Button"

const LandingNavbar = () => {

  const navigate = useNavigate()

  return (
    <nav
      className="w-full h-20 px-2 sm:px-12 flex items-center justify-between bg-white ring-1 ring-gray-200"
    >
      <section>
        <Link 
          to='/'
          className="text-2xl font-medium tracking-tight text-green-500" 
        >Farm
          <span className="text-gray-900">Sphere</span>
        </Link>
      </section>
      <section className="flex items-end justify-center gap-4">
        <Button
          variant="secondary"
          onClick={() => navigate('/login')}
        >
          Login
        </Button>

      </section>
    </nav>
  )
}

export default LandingNavbar