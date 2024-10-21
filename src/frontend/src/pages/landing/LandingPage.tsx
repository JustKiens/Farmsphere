import { useNavigate } from "react-router-dom"
import Button from "../../components/common/Button"
import LandingLayout from "../../layouts/LandingLayout"
import ShieldIcon from "../../icons/linear/ShieldIcon"
import GlobeIcon from "../../icons/linear/GlobeIcon"
import ArrowIcon from "../../icons/linear/ArrowIcon"
import { Blocks } from "lucide-react"

const LandingPage = () => {
  
  const navigate = useNavigate()
  const qualityPromises = [
    {
      icon: <ShieldIcon className="w-full h-full stroke-2 stroke-amber-500"/>,
      title: "Sustainable Practices",
      subtitle: "Experience farming with modern, eco-friendly practices designed for sustainability and efficiency.",
      color: "bg-amber-50"
    },
    {
      icon: <GlobeIcon className="w-full h-full stroke-2 stroke-green-500"/>,
      title: "Global Reach",
      subtitle: "Benefit from a global network of farming techniques and innovations for optimal crop yield.",
      color: "bg-green-50"
    },
    {
      icon: <Blocks className="w-full h-full stroke-2 stroke-amber-500"/>,
      title: "Blockchain Technology",
      subtitle: "Access cutting-edge farming tools and technology for precise monitoring and effective cultivation.",
      color: "bg-amber-50"
    },
  ];

  return (
    <LandingLayout>
      <section
        className="max-w-5xl h-fit gap-4 flex flex-col items-center justify-center p-12"
      >
        <span
          className="mt-4 text-xs uppcase  text-green-500 font-medium bg-green-50 rounded-md ring-1 ring-green-500 px-2 py-1"
        >
          REGION 3 IS OUT NOW
        </span>
        <h1
          className="text-6xl font-bold tracking-tight text-gray-900 text-center max-w-prose leading-tight "
        >
          Balancing the supply of crops through 
          <span className="text-green-500">
            {" "}Blockchain Technology
          </span>
          .
        </h1>
        <p className="text-gray-500 text-center px-12 leading-snug">
          Empowering farmers with innovative supply monitoring solutions for a sustainable future by leveraging modern technology. 
          Our approach ensures transparency and security in the agricultural supply chain. 
        </p>
        <div className="mt-4">
          <Button
            onClick={() => navigate("/stocks")}
          >
            Explore Supply
          </Button>
        </div>
        <article className="max-w-[1920px] w-full flex flex-col items-center justify-between px-4 xl:px-40 gap-8">
          <section className="flex flex-col items-center justify-center gap-2">
            <h1 className="text-4xl font-md text-gray-900 font-bold text-center mt-20">Farmers Best Tool </h1>
          </section>
          <section className="flex  gap-6 ">
            {qualityPromises.map((promise, index) =>(
              <div className="w-[24rem] flex flex-col items-center justify-start ring-1 ring-gray-200 rounded-lg p-6" key={index}>
                <div className="w-full items-start justify-start">
                  <div className={`w-11 h-11 rounded-md p-2 ${promise.color}`}>
                    {promise.icon}
                  </div>
                  <h1 className="py-2 mt-4 w-full text-xl font-medium text-gray-700">{promise.title}</h1>
                  <p className=" mt-1 text-gray-500">{promise.subtitle}</p>
                  <div className="flex items-center justify-start mt-10 gap-2 font-medium">
                    <p className="text-gray-700  ">Explore Now</p>
                    <ArrowIcon className="stroke-2 stroke-gray-900 w-4 h-4 -rotate-90" />
                  </div>
                </div>
              </div>
            ))}
          </section>
        </article>
      </section>
    </LandingLayout>
  )
}

export default LandingPage