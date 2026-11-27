import { Route, Routes } from "react-router-dom"
import PublicLayout from "./public_website/layouts/PublicLayout"
import HomePage from "./public_website/pages/HomePage"
import AboutUsPage from "./public_website/pages/AboutUsPage"

const App = () => {
  return (
    <Routes>
      <Route element={<PublicLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/about-us" element={<AboutUsPage />} />
      </Route>
    </Routes>
  )
}

export default App
