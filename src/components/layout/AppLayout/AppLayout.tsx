import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from '../SideBar/SideBar'
import NavBar from '../NavBar/NavBar'
import './AppLayout.scss'

const AppLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen)
  }

  return (
    <div className="app-layout">
      <div className="app-layout__body">
        <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
        <div className="app-layout__right">
          <NavBar toggleSidebar={toggleSidebar} />
          <main className="custom-scrollbar app-layout__content">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  )
}
export default AppLayout