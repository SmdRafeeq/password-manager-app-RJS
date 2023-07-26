import {Component} from 'react'

import {v4 as uniqueId} from 'uuid'

import './App.css'

const colorList = ['yellow', 'green', 'orange', 'blue', 'brown']

class App extends Component {
  state = {
    isTrue: false,
    latestList: [],
    website: '',
    username: '',
    password: '',
    isShow: false,
  }

  onChangeWebsite = event => {
    this.setState({website: event.target.value})
  }

  onChangeUserName = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  searchList = event => {
    this.setState({searchInput: event.target.value})
  }

  addContent = event => {
    event.preventDefault()
    const {username, website, password} = this.state
    const initial = website.slice(0, 1).toUpperCase()
    const classValue = colorList[Math.floor(Math.random() * 5)]

    const newValues = {
      id: uniqueId(),
      initialValue: initial,
      websiteName: website,
      userName: username,
      Password: password,
      classAdd: classValue,
    }

    this.setState(preState => ({
      latestList: [...preState.latestList, newValues],
      website: '',
      username: '',
      password: '',
      searchInput: '',
      isTrue: true,
    }))
  }

  showPassword = event => {
    if (event.target.checked) {
      this.setState({isShow: true})
    } else {
      this.setState({isShow: false})
    }
  }

  deleteItem = id => {
    const {latestList} = this.state
    const newList = latestList.filter(each => each.id !== id)
    const caseOf = newList.length !== 0
    this.setState({latestList: newList, isTrue: caseOf})
  }

  render() {
    const {
      website,
      username,
      password,
      latestList,
      isShow,
      searchInput,
    } = this.state

    let {isTrue} = this.state

    const newList = latestList.filter(each =>
      each.websiteName.toLowerCase().includes(searchInput.toLowerCase()),
    )

    if (newList.length === 0) {
      isTrue = false
    } else {
      isTrue = true
    }

    return (
      <div className="main-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/password-manager-logo-img.png"
          alt="app logo"
          className="app-logo"
        />
        <div className="sub-div1">
          <img
            src="https://assets.ccbp.in/frontend/react-js/password-manager-sm-img.png"
            alt="password manager"
            className="sub-div1-image2"
          />
          <form className="add-details" onSubmit={this.addContent}>
            <h1 className="detail-heading">Add new password</h1>
            <div className="input-holder">
              <img
                className="input-image"
                alt="website"
                src="https://assets.ccbp.in/frontend/react-js/password-manager-website-img.png"
              />

              <input
                type="text"
                className="input-element"
                placeholder="Enter Website"
                value={website}
                onChange={this.onChangeWebsite}
              />
            </div>

            <div className="input-holder">
              <img
                className="input-image"
                alt="username"
                src="https://assets.ccbp.in/frontend/react-js/password-manager-username-img.png"
              />

              <input
                type="text"
                className="input-element"
                placeholder="Enter Username"
                value={username}
                onChange={this.onChangeUserName}
              />
            </div>

            <div className="input-holder">
              <img
                className="input-image"
                alt="password"
                src="https://assets.ccbp.in/frontend/react-js/password-manager-password-img.png"
              />

              <input
                type="password"
                className="input-element"
                placeholder="Enter Password"
                value={password}
                onChange={this.onChangePassword}
              />
            </div>

            <button type="submit" className="add-btn">
              Add
            </button>
          </form>

          <img
            src="https://assets.ccbp.in/frontend/react-js/password-manager-lg-img.png"
            alt="password manager"
            className="sub-div1-image1"
          />
        </div>

        <div className="sub-div2">
          <div className="first-div">
            <div className="your-password">
              <h1 className="password-heading">Your Passwords</h1>
              <p className="colored-text">{newList.length}</p>
            </div>
            <div className="search-holder">
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-search-img.png"
                alt="search"
                className="input-image"
              />
              <input
                type="search"
                className="input-element"
                placeholder="Search"
                onChange={this.searchList}
                value={searchInput}
              />
            </div>
          </div>
          <hr />

          <div className="show-passwords">
            <input
              type="checkbox"
              className="check-box"
              id="check"
              onChange={this.showPassword}
            />
            <label htmlFor="check" className="label-password">
              Show Passwords
            </label>
          </div>
          {!isTrue && (
            <div className="empty-state">
              <img
                alt="no passwords"
                className="empty-image"
                src="https://assets.ccbp.in/frontend/react-js/no-passwords-img.png"
              />
              <p className="no-passwords">No Passwords</p>
            </div>
          )}

          {isTrue && (
            <ul className="result-container">
              {newList.map(eachVal => (
                <li className="item-list" id={eachVal.id} key={eachVal.id}>
                  <p className={`initial ${eachVal.classAdd}`}>
                    {eachVal.initialValue}
                  </p>

                  <div className="list-content">
                    <p className="website">{eachVal.websiteName}</p>
                    <p className="website">{eachVal.userName}</p>

                    {!isShow && (
                      <img
                        alt="stars"
                        className="stars-image"
                        src="https://assets.ccbp.in/frontend/react-js/password-manager-stars-img.png"
                      />
                    )}
                    {isShow && <p className="website">{eachVal.Password}</p>}
                  </div>
                  <button
                    type="button"
                    className="del-btn"
                    onClick={() => this.deleteItem(eachVal.id)}
                    data-testid="delete"
                  >
                    <img
                      src="https://assets.ccbp.in/frontend/react-js/password-manager-delete-img.png"
                      alt="delete"
                      className="del-image"
                    />
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    )
  }
}

export default App
