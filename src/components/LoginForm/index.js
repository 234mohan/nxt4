import {Component} from 'react'
import Cookies from 'js-cookie'
import './index.css'

class LoginForm extends Component {
  state = {
    username: '',
    password: '',
    isErrorMessage: false,
    errorMsg: '',
    isInputType: false,
  }

  onChangeStatus = () => {
    this.setState(prevState => ({
      isInputType: !prevState.isInputType,
    }))
  }

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  onSubmitSuccess = jwtToken => {
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {expires: 30})
    history.replace('/')
  }

  onSubmitFailure = errorMsg => {
    this.setState({errorMsg, isErrorMessage: true})
  }

  onLogin = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    console.log(response.ok)
    const data = await response.json()
    if (response.ok === true) {
      this.onSubmitSuccess(data.jwt_token)
    } else {
      this.onSubmitFailure(data.error_msg)
    }
  }

  render() {
    const {
      username,
      password,
      isErrorMessage,
      errorMsg,
      isInputType,
    } = this.state
    const input = isInputType ? 'text' : 'password'
    return (
      <div className="container2">
        <form onSubmit={this.onLogin} className="container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png"
            alt="logo"
            className="image"
          />
          <label htmlFor="username" className="para">
            USERNAME
          </label>
          <input
            type="text"
            id="username"
            onChange={this.onChangeUsername}
            value={username}
            className="input"
            placeholder="USERNAME"
          />
          <label htmlFor="password" className="para">
            PASSWORD
          </label>
          <input
            type={input}
            id="password"
            onChange={this.onChangePassword}
            value={password}
            className="input"
            placeholder="PASSWORD"
          />
          <div className="checkbox">
            <input type="checkbox" id="check" onClick={this.onChangeStatus} />
            <label htmlFor="check"> Show Password </label>
          </div>
          <button type="submit" className="button-class">
            Login
          </button>
          {isErrorMessage && <p className="paras">*{errorMsg}</p>}
        </form>
      </div>
    )
  }
}

export default LoginForm
