import {Link} from 'react-router-dom'
import IsDark from '../../context/IsDark'
import './index.css'

const GamingVideoCard = props => {
  const {eachGameDetails} = props
  const {id, thumbnailUrl, viewCount, title} = eachGameDetails

  return (
    <IsDark.Consumer>
      {value => {
        const {isDark} = value
        const lasi = isDark ? 'lassi suggest' : 'lassi black'

        return (
          <Link to={`/home/${id}`} className={lasi}>
            <li className="list-container">
              <img src={thumbnailUrl} alt="game" className="alt-game" />
              <p> {title}</p>
              <p>
                <span> {viewCount}</span> Watching Worldwide
              </p>
            </li>
          </Link>
        )
      }}
    </IsDark.Consumer>
  )
}

export default GamingVideoCard
