import {Component} from 'react'
import {FaFireAlt} from 'react-icons/fa'
import IsDark from '../../context/IsDark'
import Header from '../Header'
import Sidebar from '../Sidebar'

import SaveItem from '../SaveItem'
import './index.css'

class Save extends Component {
  render() {
    return (
      <IsDark.Consumer>
        {value => {
          const {savedList, isDark} = value
          const narayan = isDark ? 'ceb' : 'ces'
          return (
            <div>
              <Header />
              <div className="side">
                <Sidebar />
                <div className="saved">
                  <div className="container-ssc">
                    <FaFireAlt className="school" />
                    <h1 className="dell"> Saved Videos </h1>
                  </div>
                  <ul className={narayan}>
                    {savedList.map(eachSave => (
                      <SaveItem eachDetails={eachSave} key={eachSave.id} />
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

export default Save
