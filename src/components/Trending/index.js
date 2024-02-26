import {Component} from 'react'
import {FaFireAlt} from 'react-icons/fa'
import Cookies from 'js-cookie'
import Header from '../Header'
import Sidebar from '../Sidebar'
import TrendingVideoCard from '../TrendingVideoCard'
import IsDark from '../../context/IsDark'
import './index.css'

class Trending extends Component {
  state = {
    trendingList: [],
  }

  componentDidMount() {
    this.getVideo()
  }

  getVideo = async () => {
    const url = 'https://apis.ccbp.in/videos/trending'
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
      const updatedVideo = data.videos.map(eachVideo => ({
        id: eachVideo.id,
        publishedAt: eachVideo.published_at,
        thumbnailUrl: eachVideo.thumbnail_url,
        title: eachVideo.title,
        viewCount: eachVideo.view_count,
        channel: {
          name: eachVideo.channel.name,
          profileImageUrl: eachVideo.channel.profile_image_url,
        },
      }))
      this.setState({trendingList: updatedVideo})
    }
  }

  render() {
    const {trendingList} = this.state
    return (
      <IsDark.Consumer>
        {value => {
          const {isDark} = value
          const classes = isDark ? ' dog hash' : 'white dog'
          return (
            <div>
              <Header />
              <div className="container5">
                <Sidebar />
                <div className="six">
                  <div className="centers">
                    <FaFireAlt className="fire" />
                    <h1 className="h1"> Trending </h1>
                  </div>
                  <ul className={classes}>
                    {trendingList.map(eachVideo => (
                      <TrendingVideoCard
                        eachTrending={eachVideo}
                        key={eachVideo.id}
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

export default Trending
