import IsDark from '../../context/IsDark'
import './index.css'

const SaveItem = props => {
  const {eachDetails} = props
  const {thumbnailUrl, title, viewCount, publishedAt, channel} = eachDetails
  const {name} = channel

  return (
    <IsDark.Consumer>
      {value => {
        const {isDark} = value
        const civil = isDark ? 'tenth cent' : ' tenth age'
        return (
          <div className={civil}>
            <img src={thumbnailUrl} alt="ssc" className="ssc" />
            <div className="fifth">
              <h1> {title}</h1>
              <p>{name}</p>
              <div className="view">
                <p>{viewCount} views </p>
                <ul className="at">
                  <li> {publishedAt}</li>
                </ul>
              </div>
            </div>
          </div>
        )
      }}
    </IsDark.Consumer>
  )
}

export default SaveItem
