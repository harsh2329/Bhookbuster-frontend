import { useState } from 'react'
import '../../assets/css/ADashboard/Amain.css';
import AdminHome from '../../components/Admin/AdminHome';
import Adminnav from '../../components/Admin/Adminnav'
import Adminsidebar from '../../components/Admin/Adminsidebar';

function App() {
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false)

  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle)
  }

  return (
    <div className='grid-container'>
      <Adminnav OpenSidebar={OpenSidebar}/>
      <Adminsidebar openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar}/>
      <AdminHome />
    </div>
  )
}

export default App