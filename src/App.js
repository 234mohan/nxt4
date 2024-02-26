import {Component} from 'react'
import {Switch, Route} from 'react-router-dom'
import LoginForm from './components/LoginForm'
import Home from './components/Home'
import IsDark from './context/IsDark'
import Trending from './components/Trending'
import Gaming from './components/Gaming'
import VideoDetailedView from './components/VideoDetailedView'
import Save from './components/Save'
import './App.css'

// Replace your code here
class App extends Component {
  state = {
    isDark: false,
    savedList: [],
  }

  onSavedList = product => {
    this.setState(prevState => ({
      savedList: [...prevState.savedList, product],
    }))
  }

  onChange = () => {
    this.setState(prevState => ({
      isDark: !prevState.isDark,
    }))
  }

  render() {
    const {isDark, savedList} = this.state
    return (
      <IsDark.Provider
        value={{
          isDark,
          onChanges: this.onChange,
          savedList,
          onSavedList: this.onSavedList,
        }}
      >
        <Switch>
          <Route exact path="/login" component={LoginForm} />
          <Route exact path="/" component={Home} />
          <Route exact path="/trending" component={Trending} />
          <Route exact path="/gaming" component={Gaming} />
          <Route exact path="/home/:id" component={VideoDetailedView} />
          <Route exact path="/save" component={Save} />
        </Switch>
      </IsDark.Provider>
    )
  }
}

export default App
