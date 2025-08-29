import { NavLink } from "react-router-dom";
import { ChevronDown, X } from "lucide-react";
import "./Sidebar.scss";
import {
  auditLogsIcon,
  dashboardIcon,
  decisionIcon,
  feesAndChargesIcon,
  feesAndPricingIcon,
  guarantorsIcon,
  karmaIcon,
  loanRequestIcon,
  loansIcon,
  organisation2Icon,
  organisationIcon,
  preferencesIcon,
  reportIcon,
  savingsIcon,
  savingsProductsIcon,
  servicesAccountIcon,
  servicesIcon,
  settlementIcon,
  transactionIcon,
  usersIcon,
  whiteListIcon,
  logo,
  logoutIcon,
  systemMessagesIcon,
} from "../../../assets";

interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, toggleSidebar }) => {
  return (
    <>
      <aside className={`sidebar ${isOpen ? 'sidebar--open' : ''}`} data-testid="sidebar">
        <div className="sidebar__brand">
          <img src={logo} alt="Lendsqr Logo" className="sidebar__logo" />
          <span className="custom-font sidebar__brand-text">lendsqr</span>
          <button className="sidebar__close" onClick={toggleSidebar}>
            <X size={24} />
          </button>
        </div>
        <nav className="custom-scrollbar sidebar__nav">
          <div className="sidebar__organization">
            <img src={organisationIcon} alt="switch organisation" />
            <span>Switch Organization</span>
            <ChevronDown size={16} />
          </div>

          <NavLink
            to="/"
            className="sidebar__link "
            onClick={(e: React.MouseEvent<HTMLAnchorElement>) => e.preventDefault()}
          >
            <img src={dashboardIcon} alt="dashboard" />
            <span>Dashboard</span>
          </NavLink>

          <p className="sidebar__section">Customers</p>
          <NavLink to="/users" className="sidebar__link">
            <img src={usersIcon} alt="users" />
            <span>Users</span>
          </NavLink>
          <NavLink
            to="/"
            className="sidebar__link"
            onClick={(e: React.MouseEvent<HTMLAnchorElement>) => e.preventDefault()}
          >
            <img src={guarantorsIcon} alt="guarantors" />
            <span>Guarantors</span>
          </NavLink>
          <NavLink
            to=""
            className="sidebar__link"
            onClick={(e: React.MouseEvent<HTMLAnchorElement>) => e.preventDefault()}
          >
            <img src={loansIcon} alt="loans" />
            <span>Loans</span>
          </NavLink>
          <NavLink
            to=""
            className="sidebar__link"
            onClick={(e: React.MouseEvent<HTMLAnchorElement>) => e.preventDefault()}
          >
            <img src={decisionIcon} alt="decision models" />
            <span>Decision Models</span>
          </NavLink>
          <NavLink
            to=""
            className="sidebar__link"
            onClick={(e: React.MouseEvent<HTMLAnchorElement>) => e.preventDefault()}
          >
            <img src={savingsIcon} alt="savings" />
            <span>Savings</span>
          </NavLink>
          <NavLink
            to=""
            className="sidebar__link"
            onClick={(e: React.MouseEvent<HTMLAnchorElement>) => e.preventDefault()}
          >
            <img src={loanRequestIcon} alt="loan requests" />
            <span>Loan Requests</span>
          </NavLink>
          <NavLink
            to=""
            className="sidebar__link"
            onClick={(e: React.MouseEvent<HTMLAnchorElement>) => e.preventDefault()}
          >
            <img src={whiteListIcon} alt="whitelist" />
            <span>Whitelist</span>
          </NavLink>
          <NavLink
            to=""
            className="sidebar__link"
            onClick={(e: React.MouseEvent<HTMLAnchorElement>) => e.preventDefault()}
          >
            <img src={karmaIcon} alt="karma" />
            <span>Karma</span>
          </NavLink>

          <p className="sidebar__section">Businesses</p>
          <NavLink
            to="/organization"
            className="sidebar__link"
            onClick={(e: React.MouseEvent<HTMLAnchorElement>) => e.preventDefault()}
          >
            <img src={organisation2Icon} alt="organisation" />
            <span>Organization</span>
          </NavLink>
          <NavLink
            to="/loan-products"
            className="sidebar__link"
            onClick={(e: React.MouseEvent<HTMLAnchorElement>) => e.preventDefault()}
          >
            <img src={loanRequestIcon} alt="loan products" />
            <span>Loan Products</span>
          </NavLink>
          <NavLink
            to="/savings-products"
            className="sidebar__link"
            onClick={(e: React.MouseEvent<HTMLAnchorElement>) => e.preventDefault()}
          >
            <img src={savingsProductsIcon} alt="savings products" />
            <span>Savings Products</span>
          </NavLink>
          <NavLink
            to="/fees-charges"
            className="sidebar__link"
            onClick={(e: React.MouseEvent<HTMLAnchorElement>) => e.preventDefault()}
          >
            <img src={feesAndChargesIcon} alt="fees and charges" />
            <span>Fees and Charges</span>
          </NavLink>
          <NavLink
            to="/transactions"
            className="sidebar__link"
            onClick={(e: React.MouseEvent<HTMLAnchorElement>) => e.preventDefault()}
          >
            <img src={transactionIcon} alt="transactions" />
            <span>Transactions</span>
          </NavLink>
          <NavLink
            to="/services"
            className="sidebar__link"
            onClick={(e: React.MouseEvent<HTMLAnchorElement>) => e.preventDefault()}
          >
            <img src={servicesIcon} alt="services" />
            <span>Services</span>
          </NavLink>
          <NavLink
            to="/service-account"
            className="sidebar__link"
            onClick={(e: React.MouseEvent<HTMLAnchorElement>) => e.preventDefault()}
          >
            <img src={servicesAccountIcon} alt="service account" />
            <span>Service Account</span>
          </NavLink>
          <NavLink
            to="/settlements"
            className="sidebar__link"
            onClick={(e: React.MouseEvent<HTMLAnchorElement>) => e.preventDefault()}
          >
            <img src={settlementIcon} alt="settlements" />
            <span>Settlements</span>
          </NavLink>
          <NavLink
            to="/reports"
            className="sidebar__link"
            onClick={(e: React.MouseEvent<HTMLAnchorElement>) => e.preventDefault()}
          >
            <img src={reportIcon} alt="reports" />
            <span>Reports</span>
          </NavLink>

          <p className="sidebar__section">Settings</p>
          <NavLink
            to="/preferences"
            className="sidebar__link"
            onClick={(e: React.MouseEvent<HTMLAnchorElement>) => e.preventDefault()}
          >
            <img src={preferencesIcon} alt="preferences" />
            <span>Preferences</span>
          </NavLink>
          <NavLink
            to="/fees-pricing"
            className="sidebar__link"
            onClick={(e: React.MouseEvent<HTMLAnchorElement>) => e.preventDefault()}
          >
            <img src={feesAndPricingIcon} alt="fees and pricing" />
            <span>Fees and Pricing</span>
          </NavLink>
          <NavLink
            to="/audit-logs"
            className="sidebar__link"
            onClick={(e: React.MouseEvent<HTMLAnchorElement>) => e.preventDefault()}
          >
            <img src={auditLogsIcon} alt="audit logs" />
            <span>Audit Logs</span>
          </NavLink>
          <NavLink
            to="/system-messages"
            className="sidebar__link"
            onClick={(e: React.MouseEvent<HTMLAnchorElement>) => e.preventDefault()}
          >
            <img src={systemMessagesIcon} alt="system messages" />
            <span>System Messages</span>
          </NavLink>

          <div className="sidebar__divider"></div>

          <NavLink
            to="/logout"
            className="sidebar__link sidebar__link--logout"
            onClick={(e: React.MouseEvent<HTMLAnchorElement>) => e.preventDefault()}
          >
            <img src={logoutIcon} alt="logout" />
            <span>Logout</span>
          </NavLink>

          <div className="sidebar__version">v1.2.0</div>
        </nav>
      </aside>
      {isOpen && <div className="sidebar__overlay" onClick={toggleSidebar}></div>}
    </>
  );
};

export default Sidebar;