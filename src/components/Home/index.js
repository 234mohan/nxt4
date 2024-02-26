import {Component} from 'react'
import Cookies from 'js-cookie'
import {AiOutlineSearch} from 'react-icons/ai'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import IsDark from '../../context/IsDark'
import Sidebar from '../Sidebar'
import HomeItem from '../HomeItem'
import './index.css'

const apiStatusConst = {
  initial: 'INITIAL',
  progress: 'PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class Home extends Component {
  state = {
    searchInput: '',
    homePageList: [],
    apiStatus: apiStatusConst.initial,
  }

  componentDidMount() {
    this.getItem()
  }

  getItem = async () => {
    this.setState({apiStatus: apiStatusConst.progress})
    const {searchInput} = this.state
    const url = `https://apis.ccbp.in/videos/all?search=${searchInput}`
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
      const updatedData = data.videos.map(eachData => ({
        id: eachData.id,
        publishedAt: eachData.published_at,
        thumbnailUrl: eachData.thumbnail_url,
        title: eachData.title,
        viewCount: eachData.view_count,
        channel: {
          name: eachData.channel.name,
          profileImageUrl: eachData.channel.profile_image_url,
        },
      }))
      this.setState({
        homePageList: updatedData,
        apiStatus: apiStatusConst.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConst.failure})
    }
  }

  onChangeSearchInput = event => {
    this.setState({searchInput: event.target.value})
  }

  onChangeSearch = () => {
    this.getItem()
  }

  renderSuccessView = () => {
    const {searchInput, homePageList} = this.state
    return (
      <IsDark.Consumer>
        {value => {
          const {isDark} = value
          const chillar = isDark ? 'reverse-background' : 'reserve'

          return (
            <div>
              <Header />
              <div className="extra">
                <div>
                  <Sidebar />
                </div>
                <div className="container8">
                  <div className="backside">
                    <img
                      src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png"
                      alt="light"
                      className="logo"
                    />
                    <p> Buy Nxt Watch Premium prepaid plans with UPI </p>
                    <button type="button" className="but">
                      GET IT NOW
                    </button>
                  </div>
                  <div className={chillar}>
                    <div className="cross">
                      <input
                        type="search"
                        value={searchInput}
                        onChange={this.onChangeSearchInput}
                        className="inputs"
                        placeholder="search"
                      />
                      <button type="button" onClick={this.onChangeSearch}>
                        <AiOutlineSearch
                          size={50}
                          className="search"
                          aria-label="close"
                        />
                      </button>
                    </div>
                    <ul className="police">
                      {homePageList.map(eachData => (
                        <HomeItem eachDetails={eachData} key={eachData.id} />
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )
        }}
      </IsDark.Consumer>
    )
  }

  retryOf = () => {
    this.getItem()
  }

  renderFailure = () => {
    const {searchInput} = this.state
    return (
      <IsDark.Consumer>
        {value => {
          const {isDark} = value
          const chillar = isDark ? 'reverse-background' : 'reserve'
          const img = isDark
            ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-dark-theme-img.png'
            : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-light-theme-img.png'
          const revenge = isDark ? 'hells' : 'hell'

          return (
            <div>
              <Header />
              <div className="extra">
                <div>
                  <Sidebar />
                </div>
                <div className="container8">
                  <div className="backside">
                    <img
                      src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png"
                      alt="light"
                      className="logo"
                    />
                    <p> Buy Nxt Watch Premium prepaid plans with UPI </p>
                    <button type="button" className="but">
                      GET IT NOW
                    </button>
                  </div>
                  <div className={chillar}>
                    <div className="cross">
                      <input
                        type="search"
                        value={searchInput}
                        onChange={this.onChangeSearchInput}
                        className="inputs"
                        placeholder="search"
                      />
                      <button type="button" onClick={this.onChangeSearch}>
                        <AiOutlineSearch
                          size={50}
                          className="search"
                          aria-label="close"
                        />
                      </button>
                    </div>
                    <div className="failure">
                      <img src={img} alt="section" className="just" />
                      <h1 className={revenge}> Oops! Something Went Wrong</h1>
                      <p className={revenge}>
                        We are having some trouble to complete your request.
                      </p>
                      <p className={revenge}> Please try again.</p>
                      <button
                        type="button"
                        onClick={this.retryOf}
                        className="retry-button"
                      >
                        Retry
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )
        }}
      </IsDark.Consumer>
    )
  }

  renderProgressView = () => {
    const {searchInput} = this.state
    return (
      <IsDark.Consumer>
        {value => {
          const {isDark} = value
          const chillar = isDark ? 'reverse-background' : 'reserve'

          return (
            <div>
              <Header />
              <div className="extra">
                <div>
                  <Sidebar />
                </div>
                <div className="container8">
                  <div className="backside">
                    <img
                      src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png"
                      alt="light"
                      className="logo"
                    />
                    <p> Buy Nxt Watch Premium prepaid plans with UPI </p>
                    <button type="button" className="but">
                      GET IT NOW
                    </button>
                  </div>
                  <div className={chillar}>
                    <div className="cross">
                      <input
                        type="search"
                        value={searchInput}
                        onChange={this.onChangeSearchInput}
                        className="inputs"
                        placeholder="search"
                      />
                      <button type="button" onClick={this.onChangeSearch}>
                        <AiOutlineSearch
                          size={50}
                          className="search"
                          aria-label="close"
                        />
                      </button>
                    </div>
                    <Loader
                      type="ThreeDots"
                      color="#00BFFF"
                      height={50}
                      width={50}
                    />
                  </div>
                </div>
              </div>
            </div>
          )
        }}
      </IsDark.Consumer>
    )
  }

  renderView = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConst.success:
        return this.renderSuccessView()
      case apiStatusConst.failure:
        return this.renderFailure()
      case apiStatusConst.progress:
        return this.renderProgressView()
      default:
        return null
    }
  }

  render() {
    return <>{this.renderView()}</>
  }
}

export default Home
