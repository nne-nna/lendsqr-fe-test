import "./ActionDropdown.scss";
import { activateUserIcon, blacklistUserIcon, viewDetailsIcon } from "../../../assets";
import { UserRoundSearch, UserRoundMinus } from "lucide-react";

interface ActionDropdownProps {
  isVisible: boolean;
  userStatus: "Active" | "Inactive" | "Pending" | "Blacklisted";
  onViewDetails: () => void;
  onBlacklistUser: () => void;
  onActivateUser: () => void;
  onSetInactive: () => void;
  onSetPending: () => void;
}

const ActionDropdown: React.FC<ActionDropdownProps> = ({
  isVisible,
  userStatus,
  onViewDetails,
  onBlacklistUser,
  onActivateUser,
  onSetInactive,
  onSetPending,
}) => {
  if (!isVisible) {
    return null;
  }

  const normalizedStatus = userStatus?.toString().trim() as "Active" | "Inactive" | "Pending" | "Blacklisted";

  return (
    <div className="card action-dropdown">
      <div className="action-dropdown__item" onClick={onViewDetails}>
        <img src={viewDetailsIcon} alt="view details" />
        <span>View Details</span>
      </div>

      {normalizedStatus === "Active" && (
        <>
          <div className="action-dropdown__item" onClick={onSetInactive}>
            <UserRoundMinus size={16} />
            <span>Deactivate User</span>
          </div>
          <div className="action-dropdown__item" onClick={onSetPending}>
            <UserRoundSearch size={16} />
            <span>Pending User</span>
          </div>
          <div className="action-dropdown__item" onClick={onBlacklistUser}>
            <img src={blacklistUserIcon} alt="blacklist user" />
            <span>Blacklist User</span>
          </div>
        </>
      )}

      {normalizedStatus === "Inactive" && (
        <>
          <div className="action-dropdown__item" onClick={onActivateUser}>
            <img src={activateUserIcon} alt="activate user" />
            <span>Activate User</span>
          </div>
          <div className="action-dropdown__item" onClick={onSetPending}>
            <UserRoundSearch size={16} />
            <span>Pending User</span>
          </div>
          <div className="action-dropdown__item" onClick={onBlacklistUser}>
            <img src={blacklistUserIcon} alt="blacklist user" />
            <span>Blacklist User</span>
          </div>
        </>
      )}

      {normalizedStatus === "Pending" && (
        <>
          <div className="action-dropdown__item" onClick={onActivateUser}>
            <img src={activateUserIcon} alt="activate user" />
            <span>Activate User</span>
          </div>
          <div className="action-dropdown__item" onClick={onSetInactive}>
            <UserRoundMinus size={16} />
            <span>Deactivate User</span>
          </div>
          <div className="action-dropdown__item" onClick={onBlacklistUser}>
            <img src={blacklistUserIcon} alt="blacklist user" />
            <span>Blacklist User</span>
          </div>
        </>
      )}

      {normalizedStatus === "Blacklisted" && (
        <>
          <div className="action-dropdown__item" onClick={onActivateUser}>
            <img src={activateUserIcon} alt="activate user" />
            <span>Activate User</span>
          </div>
          <div className="action-dropdown__item" onClick={onSetInactive}>
            <UserRoundMinus size={16} />
            <span>Deactivate user</span>
          </div>
          <div className="action-dropdown__item" onClick={onSetPending}>
            <UserRoundSearch size={16} />
            <span>Pending user</span>
          </div>
        </>
      )}
    </div>
  );
};

export default ActionDropdown;