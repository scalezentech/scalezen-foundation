import { Link } from "react-router-dom"

const AboutUsPage = () => {
    return (
        <div className="flex h-screen w-full flex-col">

            <title>About | Foundation</title>

            <h1>About</h1>
            <Link to={"/"}>
                go to home
            </Link>
        </div>
    )
}

export default AboutUsPage
