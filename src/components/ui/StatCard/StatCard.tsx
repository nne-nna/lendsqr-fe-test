import './StatCard.scss'

type Props = { 
  icon: string   
  title: string 
  value: string 
}

const StatCard = ({ icon, title, value }: Props) => {
  return (
    <div className="stat-card card">
      <img 
        src={icon} 
        alt={title} 
        className="stat-card__icon" 
      />
      <div className="stat-card__title">{title}</div>
      <div className="stat-card__value">{value}</div>
    </div>
  )
}

export default StatCard
