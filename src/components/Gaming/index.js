import {Component} from 'react'
import {FaGamepad} from 'react-icons/fa'
import Cookies from 'js-cookie'
import Header from '../Header'
import Sidebar from '../Sidebar'
import GamingVideoCard from '../GamingVideoCard'
import IsDark from '../../context/IsDark'
import './index.css'

class Gaming extends Component {
  state = {
    gamingList: [],
  }

  componentDidMount() {
    this.getGame()
  }

  getGame = async () => {
    const url = 'https://apis.ccbp.in/videos/gaming'
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(url, options)
    if (response.ok === true) {
      const data = await response.json()
      const updatedData = data.videos.map(eachGame => ({
        id: eachGame.id,
        thumbnailUrl: eachGame.thumbnail_url,
        title: eachGame.title,
        viewCount: eachGame.view_count,
      }))
      this.setState({gamingList: updatedData})
    }
  }

  render() {
    const {gamingList} = this.state

    return (
      <IsDark.Consumer>
        {value => {
          const {isDark} = value
          const css = isDark ? 'whites' : 'game-container'
          return (
            <div>
              <Header />
              <div className="ee">
                <Sidebar />
                <div>
                  <div className="game-section">
                    <FaGamepad className="game" />
                    <h1 className="section-of-head"> Gaming </h1>
                  </div>
                  <ul className={css}>
                    {gamingList.map(eachGame => (
                      <GamingVideoCard
                        eachGameDetails={eachGame}
                        key={eachGame.id}
                      />
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )
        }}
      </IsDark.Consumer>
    )
  }
}

export default Gaming
