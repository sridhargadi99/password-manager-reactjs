import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'
import PasswordManagerItem from '../PasswordManagerItem'

import './index.css'

const coloursList = [
  'amber',
  'blue',
  'orange',
  'emerald',
  'teal',
  'red',
  'light-blue',
]

class PasswordManager extends Component {
  state = {
    passwordList: [],
    website: '',
    userName: '',
    password: '',
    searchInput: '',
    isActive: false,
  }

  addNewPassword = event => {
    event.preventDefault()
    const {website, userName, password} = this.state
    const addPassword = {
      id: uuidv4(),
      website,
      userName,
      password,
      newColor: coloursList[Math.ceil(Math.random() * coloursList.length - 1)],
    }
    this.setState(prevState => ({
      passwordList: [...prevState.passwordList, addPassword],
      website: '',
      userName: '',
      password: '',
    }))
  }

  addWebsite = event => {
    this.setState({website: event.target.value})
  }

  addUserName = event => {
    this.setState({userName: event.target.value})
  }

  addPassword = event => {
    this.setState({password: event.target.value})
  }

  searchPassword = event => {
    this.setState({searchInput: event.target.value})
  }

  clickShowButton = () => {
    const {isActive} = this.state
    this.setState({isActive: !isActive})
  }

  deleteExistingPassword = id => {
    const {passwordList} = this.state
    const deletePasswordList = passwordList.filter(
      eachPassword => eachPassword.id !== id,
    )
    this.setState({passwordList: deletePasswordList})
  }

  render() {
    const {
      website,
      userName,
      password,
      searchInput,
      passwordList,
      isActive,
    } = this.state
    const finalPasswordList = passwordList.filter(eachPassword =>
      eachPassword.website.toLowerCase().includes(searchInput.toLowerCase()),
    )

    return (
      <div className="bg-container">
        <img
          className="logo-style"
          src="https://assets.ccbp.in/frontend/react-js/password-manager-logo-img.png"
          alt="app logo"
        />
        <div className="password-container">
          <div className="password-container1">
            <img
              className="password-image-style"
              src="https://assets.ccbp.in/frontend/react-js/password-manager-sm-img.png"
              alt="password manager"
            />
            <img
              className="password-image-style1"
              src="https://assets.ccbp.in/frontend/react-js/password-manager-lg-img.png"
              alt="password manager"
            />
          </div>
          <div className="password-container2">
            <h1 className="password-heading-style">Add New Password</h1>
            <form onSubmit={this.addNewPassword}>
              <div className="image-input-container">
                <div className="image-button-style">
                  <img
                    className="image-style"
                    src="https://assets.ccbp.in/frontend/react-js/password-manager-website-img.png"
                    alt="website"
                  />
                </div>
                <input
                  type="text"
                  placeholder="Enter Website"
                  value={website}
                  className="input-style"
                  onChange={this.addWebsite}
                />
              </div>
              <div className="image-input-container">
                <div className="image-button-style">
                  <img
                    className="image-style"
                    src="https://assets.ccbp.in/frontend/react-js/password-manager-username-img.png"
                    alt="username"
                  />
                </div>
                <input
                  type="text"
                  placeholder="Enter Username"
                  value={userName}
                  className="input-style"
                  onChange={this.addUserName}
                />
              </div>
              <div className="image-input-container">
                <div className="image-button-style">
                  <img
                    className="image-style"
                    src="https://assets.ccbp.in/frontend/react-js/password-manager-password-img.png"
                    alt="password"
                  />
                </div>
                <input
                  type="password"
                  placeholder="Enter Password"
                  value={password}
                  className="input-style"
                  onChange={this.addPassword}
                />
              </div>
              <div className="button-container">
                <button className="add-button-style" type="submit">
                  Add
                </button>
              </div>
            </form>
          </div>
        </div>
        <div className="searched-password-container">
          <div className="password-search-container">
            <div className="password-count-container">
              <h1 className="your-heading-style">Your Passwords</h1>
              <div className="count-container">
                <p>{finalPasswordList.length}</p>
              </div>
            </div>
            <div className="image-input-container">
              <div className="image-button-style">
                <img
                  className="image-style"
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-search-img.png"
                  alt="search"
                />
              </div>
              <input
                type="search"
                placeholder="Search"
                value={searchInput}
                className="input-style"
                onChange={this.searchPassword}
              />
            </div>
          </div>
          <hr className="hr-style" />
          <div className="checkbox-show-container">
            <div className="input-show-container">
              <input
                id="checkId"
                type="checkbox"
                className="checkbox-input-style"
                onClick={this.clickShowButton}
              />
              <label htmlFor="checkId" className="show-paragraph-style">
                Show Passwords
              </label>
            </div>
          </div>
          {finalPasswordList.length < 1 ? (
            <div className="no-passwords-container">
              <img
                className="no-passwords-image-style"
                src="https://assets.ccbp.in/frontend/react-js/no-passwords-img.png"
                alt="no passwords"
              />
              <p className="no-passwords-heading-style">No Passwords</p>
            </div>
          ) : (
            <ul className="password-list-container">
              {finalPasswordList.map(eachPassword => (
                <PasswordManagerItem
                  passwordDetails={eachPassword}
                  key={eachPassword.id}
                  deleteExistingPassword={this.deleteExistingPassword}
                  isActive={isActive}
                />
              ))}
            </ul>
          )}
        </div>
      </div>
    )
  }
}

export default PasswordManager
