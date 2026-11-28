import { Route, Routes } from "react-router-dom"
import PublicLayout from "./public_website/layouts/PublicLayout"
import HomePage from "./public_website/pages/HomePage"
import AboutUsPage from "./public_website/pages/AboutUsPage"
import ProgramsPage from "./public_website/pages/ProgramsPage"

const App = () => {
  return (
    <Routes>
      <Route element={<PublicLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/about-us" element={<AboutUsPage />} />
        <Route path="/programs" element={<ProgramsPage/>} />
      </Route>
    </Routes>
  )
}

export default App
