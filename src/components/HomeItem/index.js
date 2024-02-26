import {Link} from 'react-router-dom'
import IsDark from '../../context/IsDark'
import './index.css'

const HomeItem = props => {
  const {eachDetails} = props
  const {id, publishedAt, thumbnailUrl, title, viewCount, channel} = eachDetails
  const {name, profileImageUrl} = channel
  return (
    <IsDark.Consumer>
      {value => {
        const {isDark} = value
        const cla = isDark ? 'nurse doctor' : 'nurse'
        return (
          <Link to={`/home/${id}`} className="lassi">
            <li className={`sales ${cla}`}>
              <img
                src={thumbnailUrl}
                alt="thumbnail"
                className="thumbnailurl"
              />
              <div className="sister">
                <img
                  src={profileImageUrl}
                  alt="profile"
                  className="profileurl"
                />
                <div>
                  <p className={`pare ${cla}`}> {title}</p>
                  <p className={`name ${cla}`}>{name}</p>
                  <div className="count">
                    <p className="countse"> {viewCount}</p>
                    <ul>
                      <li className="venkat"> {publishedAt}</li>
                    </ul>
                  </div>
                </div>
              </div>
            </li>
          </Link>
        )
      }}
    </IsDark.Consumer>
  )
}

export default HomeItem
