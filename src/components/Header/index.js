import {FaMoon} from 'react-icons/fa'
import {IoSunnyOutline} from 'react-icons/io5'
import IsDark from '../../context/IsDark'
import './index.css'

const Header = () => (
  <IsDark.Consumer>
    {value => {
      const {isDark, onChanges} = value
      const onChange = () => {
        onChanges()
      }
      const classname = isDark ? 'system' : 'systems'
      const buttonclass = isDark ? 'button' : 'buttons'
      const imageUrl = isDark
        ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-dark-theme-img.png'
        : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png'

      return (
        <div className={classname}>
          <img src={imageUrl} alt="Logo" className="images" />
          <div className="row">
            {isDark ? (
              <button type="button" onClick={onChange} className="center">
                <IoSunnyOutline aria-label="close" className="structure" />
              </button>
            ) : (
              <button type="button" onClick={onChange} className="center">
                <FaMoon className="structure" aria-label="close" />
              </button>
            )}
            <img
              src="https://assets.ccbp.in/frontend/react-js/nxt-watch-profile-img.png"
              alt="profile"
              className="profile"
            />
            <button type="button" className={buttonclass}>
              Logout
            </button>
          </div>
        </div>
      )
    }}
  </IsDark.Consumer>
)

export default Header
