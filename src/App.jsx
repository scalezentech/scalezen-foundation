import { Route, Routes, useLocation } from "react-router-dom"
import PublicLayout from "./public_website/layouts/PublicLayout"
import HomePage from "./public_website/pages/HomePage"
import AboutUsPage from "./public_website/pages/AboutUsPage"
import ProgramsPage from "./public_website/pages/ProgramsPage"
import { useEffect } from "react"

const ScrollToTop = () => {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant"
    })
  }, [pathname])
}

const App = () => {

  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route element={<PublicLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/about-us" element={<AboutUsPage />} />
          <Route path="/programs" element={<ProgramsPage />} />
        </Route>
      </Routes>
    </>
  )
}

export default App
