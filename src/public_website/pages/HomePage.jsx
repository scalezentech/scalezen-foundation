import { Link } from "react-router-dom"

const HomePage = () => {
  return (
    <div className="flex h-screen w-full flex-col">
        <title>Home | Foundation</title>
      <h1>Home</h1>
      <Link to={"/about-us"} >
        go to about
      </Link>
    </div>
  )
}

export default HomePage
