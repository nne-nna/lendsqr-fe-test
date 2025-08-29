import { Search, Menu } from 'lucide-react'
import './NavBar.scss'
import { notificationIcon, userImage, arrowDownIcon } from '../../../assets'

interface NavBarProps {
  toggleSidebar: () => void;
}

const NavBar: React.FC<NavBarProps> = ({ toggleSidebar }) => {
  return (
    <header className="topbar">
      <div className="topbar__left">
        <button className="topbar__menu" onClick={toggleSidebar}>
          <Menu size={24} />
        </button>
        <div className="topbar__search">
          <div className="search-input">
            <input 
              className="search-input__field" 
              placeholder="Search for anything" 
            />
            <button className="search-input__button" type="button">
              <Search size={14} />
            </button>
          </div>
        </div>
      </div>

      <div className="topbar__actions">
        <a href="#" className="topbar__docs">Docs</a>
        <button className="topbar__notification" type="button">
          <img src={notificationIcon} alt='Lendsqr Notification'/>
        </button>
        <div className="topbar__user">
          <img src={userImage} alt="User" className="topbar__avatar" />
          <span className="topbar__username">Adedeji</span>
          <img src={arrowDownIcon} alt='More information' />
        </div>
      </div>
    </header>
  )
}
export default NavBar