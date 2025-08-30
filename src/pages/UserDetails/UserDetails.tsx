import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { User } from '../../types/User'
import './UserDetails.scss'
import { UserRound } from 'lucide-react'
import { starEmptyIcon, starFilledIcon } from '../../assets'
import { cacheUserDetails, fetchUserById, getCachedUserDetails } from '../../api/users'

const Row = ({ label, value }: { label: string; value: string }) => (
  <div className="detail-row">
    <div className="detail-row__label">{label}</div>
    <div className="detail-row__value">{value}</div>
  </div>
)

const UserDetails = () => {
  const { id } = useParams()
  const userId = Number(id)
  const [user, setUser] = useState<User | undefined>(getCachedUserDetails(userId))
  const [loading, setLoading] = useState(!user)

  useEffect(() => {
    if (!user) {
      fetchUserById(userId).then(u => {
        if (u) { setUser(u); cacheUserDetails(u) }
        setLoading(false)
      })
    }
  }, [userId, user])

  if (loading) return <div className="user-details">Loading...</div>
  if (!user) return <div className="user-details">User not found.</div>

  return (
    <div className="user-details container">
      <div className="user-details__back">
        <button className="back-btn" onClick={() => window.history.back()}>
          <span className="back-btn__icon">←</span>
          <span className="back-btn__text">Back to Users</span>
        </button>
      </div>

      <div className="user-details__header">
        <h1 className="user-details__title">User Details</h1>
        
        <div className="user-details__actions">
          <button className="action-btn btn--danger">BLACKLIST USER</button>
          <button className="action-btn btn--primary">ACTIVATE USER</button>
        </div>
      </div>

      <div className="card user-profile-card">
        <div className="user-profile-card__main">
          <div className="user-profile-card__info">
            <div className="user-avatar">
              <UserRound size={40}/>
            </div>
            <div className="user-profile-card__details">
              <h2 className="user-profile-card__name">{user.profile.fullName}</h2>
              <p className="user-profile-card__id">LSQF{String(user.id).padStart(6, '0')}</p>
            </div>
          </div>
          
          <div className="card user-profile-card__divider"></div>
          
          <div className="user-profile-card__tier">
            <p className="tier-label">User's Tier</p>
            <div className="tier-stars">
              <img src={starFilledIcon} alt="user's tier" />
              <img src={starEmptyIcon} alt="user's tier"/>
              <img src={starEmptyIcon} alt="user's tier"/>
            </div>
          </div>
          
          <div className="user-profile-card__divider"></div>
          
          <div className="user-profile-card__balance">
            <h3 className="balance-amount">₦200,000.00</h3>
            <p className="balance-account">9912345678/Providus Bank</p>
          </div>
        </div>
        
        <div className="user-profile-card__nav">
          <nav className="custom-scrollbar profile-nav">
            <a href="#" className="profile-nav__link profile-nav__link--active">General Details</a>
            <a href="#" className="profile-nav__link">Documents</a>
            <a href="#" className="profile-nav__link">Bank Details</a>
            <a href="#" className="profile-nav__link">Loans</a>
            <a href="#" className="profile-nav__link">Savings</a>
            <a href="#" className="profile-nav__link">App and System</a>
          </nav>
        </div>
      </div>

      <div className="card user-details-content">
        <section className="details-section">
          <h3 className="details-section__title">Personal Information</h3>
          <div className="details-grid">
            <Row label="FULL NAME" value={user.profile.fullName} />
            <Row label="PHONE NUMBER" value={user.phone} />
            <Row label="EMAIL ADDRESS" value={user.email} />
            <Row label="BVN" value={String(user.profile.bvn)} />
            <Row label="GENDER" value={user.profile.gender} />
            <Row label="MARITAL STATUS" value={user.profile.maritalStatus} />
            <Row label="CHILDREN" value={String(user.profile.children)} />
            <Row label="TYPE OF RESIDENCE" value={user.profile.residence} />
          </div>
        </section>

        <section className="details-section">
          <h3 className="details-section__title">Education and Employment</h3>
          <div className="details-grid">
            <Row label="LEVEL OF EDUCATION" value={user.profile.education} />
            <Row label="EMPLOYMENT STATUS" value={user.profile.employmentStatus} />
            <Row label="SECTOR OF EMPLOYMENT" value={user.profile.sector} />
            <Row label="DURATION OF EMPLOYMENT" value={user.profile.duration} />
            <Row label="OFFICE EMAIL" value={user.profile.officeEmail} />
            <Row label="MONTHLY INCOME" value={user.profile.income} />
            <Row label="LOAN REPAYMENT" value={String(user.profile.loanRepayment)} />
          </div>
        </section>

        <section className="details-section">
          <h3 className="details-section__title">Socials</h3>
          <div className="details-grid">
            <Row label="TWITTER" value={user.profile.twitter} />
            <Row label="FACEBOOK" value={user.profile.facebook} />
            <Row label="INSTAGRAM" value={user.profile.instagram} />
          </div>
        </section>

        <section className="details-section">
          <h3 className="details-section__title">Guarantor</h3>
          <div className="details-grid">
            <Row label="FULL NAME" value={user.guarantor.fullName} />
            <Row label="PHONE NUMBER" value={user.guarantor.phone} />
            <Row label="EMAIL ADDRESS" value={user.guarantor.email} />
            <Row label="RELATIONSHIP" value={user.guarantor.relationship} />
          </div>
          
        </section>
      </div>
    </div>
  )
}

export default UserDetails