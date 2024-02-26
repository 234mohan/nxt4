import {Component} from 'react'
import Cookies from 'js-cookie'
import ReactPlayer from 'react-player'
import Loader from 'react-loader-spinner'

import {AiOutlineLike, AiOutlineDislike} from 'react-icons/ai'
import {CgPlayListAdd} from 'react-icons/cg'
import IsDark from '../../context/IsDark'
import Header from '../Header'
import Sidebar from '../Sidebar'

import './index.css'

class VideoDetailedView extends Component {
  state = {
    videoDetailed: {},
    isLoading: true,
  }

  componentDidMount() {
    this.getDetails()
  }

  getDetails = async () => {
    this.setState({isLoading: true})
    const jwtToken = Cookies.get('jwt_token')
    const {match} = this.props
    const {params} = match
    const {id} = params
    const url = `https://apis.ccbp.in/videos/${id}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(url, options)
    console.log(response.ok)
    if (response.ok === true) {
      const data = await response.json()
      console.log(data)
      const updatedData = {
        description: data.video_details.description,
        id: data.video_details.id,
        thumbnailUrl: data.video_details.thumbnail_url,
        publishedAt: data.video_details.published_at,
        title: data.video_details.title,
        videoUrl: data.video_details.video_url,
        viewCount: data.video_details.view_count,
        channel: {
          name: data.video_details.channel.name,
          profileImageUrl: data.video_details.channel.profile_image_url,
          subscribeCount: data.video_details.channel.subscribe_count,
        },
      }
      this.setState({videoDetailed: updatedData, isLoading: false})
    }
  }

  renderLoader = () => (
    <div>
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  renderSuccessView = () => (
    <IsDark.Consumer>
      {value => {
        const {onSavedList} = value
        const {videoDetailed} = this.state

        const {publishedAt, title, videoUrl, viewCount} = videoDetailed

        const onAddSaved = () => {
          onSavedList({...videoDetailed})
        }
        return (
          <div className="discos">
            <ReactPlayer url={videoUrl} controls width="60vw" height="500px" />
            <p> {title}</p>
            <div className="count">
              <p> {viewCount} views</p>
              <ul>
                <li> {publishedAt}</li>
              </ul>
              <div className="section">
                <div className="sections">
                  <AiOutlineLike />
                  <p> Like </p>
                </div>
                <div className="sections">
                  <AiOutlineDislike />
                  <p> Dislike</p>
                </div>

                <div className="sections">
                  <button type="button" onClick={onAddSaved}>
                    <CgPlayListAdd />
                    <p> Save </p>
                  </button>
                </div>
              </div>
            </div>
            <hr className="horizontal" />
          </div>
        )
      }}
    </IsDark.Consumer>
  )

  render() {
    const {isLoading} = this.state

    return (
      <div className="details">
        <Header />
        <div className="structure">
          <Sidebar />
          <div className="disco">
            {isLoading ? this.renderLoader() : this.renderSuccessView()}
          </div>
        </div>
      </div>
    )
  }
}

export default VideoDetailedView
