import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import Pagination from "../../components/ui/Pagination/Pagination";
import FilterDropdown from "../../components/ui/FilterDropdown/FilterDropdown";
import ActionDropdown from "../../components/ui/ActionDropdown/ActionDropdown";
import { User } from "@/types/User";
import { FilterOption, UserFilter, FilterVisibility } from "../../types/Filter";
import "./Users.scss"
import StatCard from "../../components/ui/StatCard/StatCard";
import { ListFilter, MoreVertical } from "lucide-react";
import { statCard1Icon, statCard2Icon, statCard3Icon, statCard4Icon } from "../../assets";
import { fetchUsers } from "../../api/users";

const defaultFilter: UserFilter = {
  organization: "",
  username: "",
  email: "",
  phone: "",
  dateJoined: "",
  status: "",
};

const safeFormatDate = (dateValue: any): string | null => {
  if (!dateValue) return null;
  
  const date = new Date(dateValue);
  if (isNaN(date.getTime())) {
    return null;
  }
  
  return date.toISOString().split("T")[0];
};

const Users = () => {
  const [users, setUsers] = useState<User[]>(() => {
    const savedUsers = localStorage.getItem("users");
    return savedUsers ? JSON.parse(savedUsers) : [];
  });
  const [filter, setFilter] = useState<UserFilter>(() => {
    const savedFilter = localStorage.getItem("userFilter");
    return savedFilter ? JSON.parse(savedFilter) : defaultFilter;
  });
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [loading, setLoading] = useState(true);
  const [showFilters, setShowFilters] = useState<FilterVisibility>({
    organization: false,
    username: false,
    email: false,
    phone: false,
    dateJoined: false,
    status: false,
  });
  const [activeActionDropdown, setActiveActionDropdown] = useState<
    number | null
  >(null);
  const navigate = useNavigate();

  useEffect(() => {
    const savedUsers = localStorage.getItem("users");
    if (savedUsers && JSON.parse(savedUsers).length > 0) {
      setUsers(JSON.parse(savedUsers));
      setLoading(false);
    } else {
      fetchUsers().then((apiUsers) => {
        setUsers(apiUsers);
        localStorage.setItem("users", JSON.stringify(apiUsers));
        setLoading(false);
      });
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("userFilter", JSON.stringify(filter));
  }, [filter]);

  useEffect(() => {
    if (users.length > 0) {
      localStorage.setItem("users", JSON.stringify(users));
    }
  }, [users]);

  const toggleFilter = (filterType: keyof FilterVisibility) => {
    setShowFilters((prev) => {
      const allClosed = {
        organization: false,
        username: false,
        email: false,
        phone: false,
        dateJoined: false,
        status: false,
      };
      return {
        ...allClosed,
        [filterType]: !prev[filterType],
      };
    });
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      if (
        !target.closest(".table-header") &&
        !target.closest(".action-dropdown") &&
        !target.closest("[data-action-trigger]")
      ) {
        setShowFilters({
          organization: false,
          username: false,
          email: false,
          phone: false,
          dateJoined: false,
          status: false,
        });
        setActiveActionDropdown(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const organizationOptions: FilterOption[] = useMemo(
    () =>
      [...new Set(users.map((u) => u.organization))].map((org) => ({
        label: org,
        value: org,
      })),
    [users]
  );

  const statusOptions: FilterOption[] = [
    { label: "Active", value: "Active" },
    { label: "Inactive", value: "Inactive" },
    { label: "Pending", value: "Pending" },
    { label: "Blacklisted", value: "Blacklisted" },
  ];

  const filtered = useMemo(() => {
    return users.filter((u) => {
      const filterDate = safeFormatDate(filter.dateJoined);
      const userDate = safeFormatDate(u.dateJoined);

      return (
        (!filter.organization || u.organization === filter.organization) &&
        (!filter.username ||
          u.username.toLowerCase().includes(filter.username.toLowerCase())) &&
        (!filter.email ||
          u.email.toLowerCase().includes(filter.email.toLowerCase())) &&
        (!filter.phone || u.phone.includes(filter.phone)) &&
        (!filter.status || u.status === filter.status) &&
        (!filter.dateJoined || (filterDate && userDate && filterDate === userDate))
      );
    });
  }, [users, filter]);

  const handleFilterChange = (filterType: keyof UserFilter, value: string) => {
    setFilter((prev) => ({ ...prev, [filterType]: value }));
  };

  const handleApplyFilter = (filterType: keyof UserFilter) => {
    setShowFilters((prev) => ({ ...prev, [filterType]: false }));
    setPage(1);
  };


  const handleResetFilter = (filterType: keyof UserFilter) => {
    setFilter((prev) => ({ ...prev, [filterType]: "" }));
    setPage(1);
  };

  const handleToggleActionDropdown = (userId: number) => {
    setActiveActionDropdown((prev) => (prev === userId ? null : userId));
  };

  const handleViewDetails = (userId: number) => {
    navigate(`/users/${userId}`);
    setActiveActionDropdown(null);
  };

  const handleBlacklistUser = (userId: number) => {
    setUsers((prev) =>
      prev.map((user) =>
        user.id === userId ? { ...user, status: "Blacklisted" as const } : user
      )
    );
    setActiveActionDropdown(null);
  };

  const handleActivateUser = (userId: number) => {
    setUsers((prev) =>
      prev.map((user) =>
        user.id === userId ? { ...user, status: "Active" as const } : user
      )
    );
    setActiveActionDropdown(null);
  };

  const handleSetInactive = (userId: number) => {
    setUsers((prev) =>
      prev.map((user) =>
        user.id === userId ? { ...user, status: "Inactive" as const } : user
      )
    );
    setActiveActionDropdown(null);
  };

  const handleSetPending = (userId: number) => {
    setUsers((prev) =>
      prev.map((user) =>
        user.id === userId ? { ...user, status: "Pending" as const } : user
      )
    );
    setActiveActionDropdown(null);
  };

  const start = (page - 1) * pageSize;
  const pageData = filtered.slice(start, start + pageSize);

  return (
    <div className="container">
      <h2 className="users-title">Users</h2>
      <div className="users-stats">
        <StatCard title="Users" value="2,453" icon={statCard1Icon} />
        <StatCard title="Active Users" value="2,453" icon={statCard2Icon} />
        <StatCard
          title="Users with Loans"
          value="12,453"
          icon={statCard3Icon}
        />
        <StatCard
          title="Users with Savings"
          value="102,453"
          icon={statCard4Icon}
        />
      </div>

      <div className="card users-table-container">
        <table className="table">
          <thead>
            <tr>
              <th className="table-header table-header--organization">
                <span className="table-header__label">
                  ORGANIZATION
                  <button
                    className="filter-toggle"
                    onClick={() => toggleFilter("organization")}
                  >
                    <ListFilter size={16} />
                  </button>
                </span>
                <FilterDropdown
                  title="Organization"
                  type="select"
                  value={filter.organization}
                  onValueChange={(value) =>
                    handleFilterChange("organization", value)
                  }
                  onApplyFilter={() => handleApplyFilter("organization")}
                  onReset={() => handleResetFilter("organization")}
                  isVisible={showFilters.organization}
                  options={organizationOptions}
                />
              </th>

              <th className="table-header">
                <span className="table-header__label">
                  USERNAME
                  <button
                    className="filter-toggle"
                    onClick={() => toggleFilter("username")}
                  >
                    <ListFilter size={16} />
                  </button>
                </span>
                <FilterDropdown
                  title="Username"
                  type="input"
                  value={filter.username}
                  onValueChange={(value) =>
                    handleFilterChange("username", value)
                  }
                  onApplyFilter={() => handleApplyFilter("username")}
                  onReset={() => handleResetFilter("username")}
                  isVisible={showFilters.username}
                  placeholder="User"
                />
              </th>

              <th className="table-header">
                <span className="table-header__label">
                  EMAIL
                  <button
                    className="filter-toggle"
                    onClick={() => toggleFilter("email")}
                  >
                    <ListFilter size={16} />
                  </button>
                </span>
                <FilterDropdown
                  title="Email"
                  type="input"
                  value={filter.email}
                  onValueChange={(value) => handleFilterChange("email", value)}
                  onApplyFilter={() => handleApplyFilter("email")}
                  onReset={() => handleResetFilter("email")}
                  isVisible={showFilters.email}
                  placeholder="Email"
                />
              </th>

              <th className="table-header">
                <span className="table-header__label">
                  PHONE NUMBER
                  <button
                    className="filter-toggle"
                    onClick={() => toggleFilter("phone")}
                  >
                    <ListFilter size={16} />
                  </button>
                </span>
                <FilterDropdown
                  title="Phone Number"
                  type="input"
                  value={filter.phone}
                  onValueChange={(value) => handleFilterChange("phone", value)}
                  onApplyFilter={() => handleApplyFilter("phone")}
                  onReset={() => handleResetFilter("phone")}
                  isVisible={showFilters.phone}
                  placeholder="Phone Number"
                />
              </th>

              <th className="table-header">
                <span className="table-header__label">
                  DATE JOINED
                  <button
                    className="filter-toggle"
                    onClick={() => toggleFilter("dateJoined")}
                  >
                    <ListFilter size={16} />
                  </button>
                </span>
                <FilterDropdown
                  title="Date Joined"
                  type="date"
                  value={filter.dateJoined}
                  onValueChange={(value) =>
                    handleFilterChange("dateJoined", value)
                  }
                  onApplyFilter={() => handleApplyFilter("dateJoined")}
                  onReset={() => handleResetFilter("dateJoined")}
                  isVisible={showFilters.dateJoined}
                />
              </th>

              <th className="table-header table-header--status">
                <span className="table-header__label">
                  STATUS
                  <button
                    className="filter-toggle"
                    onClick={() => toggleFilter("status")}
                  >
                    <ListFilter size={16} />
                  </button>
                </span>
                <FilterDropdown
                  title="Status"
                  type="select"
                  value={filter.status}
                  onValueChange={(value) => handleFilterChange("status", value)}
                  onApplyFilter={() => handleApplyFilter("status")}
                  onReset={() => handleResetFilter("status")}
                  isVisible={showFilters.status}
                  options={statusOptions}
                />
              </th>
              <th></th>
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <tr>
                <td colSpan={7} className="users-table__loading">
                  Loading...
                </td>
              </tr>
            ) : pageData.length === 0 ? (
              <tr>
                <td colSpan={7} className="users-table__no-results">
                  No results
                </td>
              </tr>
            ) : (
              pageData.map((u) => (
                <tr key={u.id}>
                  <td>{u.organization}</td>
                  <td>{u.username}</td>
                  <td>{u.email}</td>
                  <td>{u.phone}</td>
                  <td>{u.dateJoined}</td>
                  <td>
                    <span
                      className={
                        u.status === "Active"
                          ? "badge badge--success"
                          : u.status === "Pending"
                          ? "badge badge--warning"
                          : u.status === "Blacklisted"
                          ? "badge badge--danger"
                          : "badge badge--muted"
                      }
                    >
                      {u.status}
                    </span>
                  </td>
                  <td>
                    <div
                      className="action-cell"
                      style={{ position: "relative" }}
                    >
                      <button
                        data-action-trigger
                        className="action-trigger"
                        onClick={() => handleToggleActionDropdown(u.id)}
                      >
                        <MoreVertical />
                      </button>
                      <ActionDropdown
                        isVisible={activeActionDropdown === u.id}
                        userStatus={u.status} 
                        onViewDetails={() => handleViewDetails(u.id)}
                        onBlacklistUser={() => handleBlacklistUser(u.id)}
                        onActivateUser={() => handleActivateUser(u.id)}
                        onSetInactive={() => handleSetInactive(u.id)}
                        onSetPending={() => handleSetPending(u.id)}
                      />
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <Pagination
        page={page}
        pageSize={pageSize}
        total={filtered.length}
        onPageChange={setPage}
        onPageSizeChange={setPageSize}
      />
    </div>
  );
};

export default Users;