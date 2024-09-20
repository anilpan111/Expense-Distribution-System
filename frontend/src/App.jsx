import { Outlet } from "react-router-dom"
import Navbar from "./components/Navbar"
import Sidebar from "./components/Sidebar"
function App() {

  return (
    <>
      <Navbar/>
      <Sidebar/>
      <Outlet/>
    </>
  )
}

export default App
