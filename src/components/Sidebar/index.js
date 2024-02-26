import {Link} from 'react-router-dom'
import {AiFillHome} from 'react-icons/ai'
import {FaFireAlt, FaGamepad} from 'react-icons/fa'
import {CgPlayListAdd} from 'react-icons/cg'
import IsDark from '../../context/IsDark'
import Footer from '../Footer'
import './index.css'

const Sidebar = () => (
  <IsDark.Consumer>
    {value => {
      const {isDark} = value

      const classname = isDark ? 'container-row' : 'container-column'
      const classnames = isDark ? 'successes' : 'failure'

      return (
        <div className={classname}>
          <div>
            <ul>
              <Link to="/" className={`link ${classnames}`}>
                <li className="flex">
                  <AiFillHome className="icon" />
                  <p className="parameter"> Home </p>
                </li>
              </Link>
              <Link to="/trending" className={`link ${classnames}`}>
                <li className="flex">
                  <FaFireAlt className="icon" />
                  <p className="parameter"> Trending </p>
                </li>
              </Link>
              <Link to="/gaming" className={`link ${classnames}`}>
                <li className="flex">
                  <FaGamepad className="icon" />
                  <p className="parameter"> Gaming </p>
                </li>
              </Link>
              <Link to="/save" className={`link ${classnames}`}>
                <li className="flex">
                  <CgPlayListAdd className="icon" />
                  <p className="parameter"> Saved Videos </p>
                </li>
              </Link>
            </ul>
          </div>
          <Footer />
        </div>
      )
    }}
  </IsDark.Consumer>
)

export default Sidebar
