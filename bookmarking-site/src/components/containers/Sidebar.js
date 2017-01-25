import React, { Component } from 'react'
import { connect } from 'react-redux'

import actions from '../../actions'
import { APIManager } from '../../utils'
import { Admin, Signup } from '../presentation'

class Sidebar extends Component {
  constructor() {
    super()
    this.state = {
      link: ''
    }
  }

  componentDidMount() {
    APIManager.get('/account/currentuser', null, (err, response) => {
      if (err) {
        console.error(err)
        return
      }
      if (response.profile == null) {
        return
      }

      this.props.currentUserReceived(response.profile)
    })
  }

  register(visitor){
    APIManager.post('/account/register', visitor, (err, response) => {
      if (err){
        let msg = err.message || err
        console.error(msg)
        return
      }

      this.props.profileCreated(response.profile)
    })
  }

  login(credentials) {
    APIManager.post('/account/login', credentials, (err, response) => {
      if (err) {
        let msg = err.message || err
        console.error(msg)
        return
      }

      this.props.currentUserReceived(response.profile)
    })
  }

  logout() {
    console.log('loggout clicked')
    APIManager.get('/account/logout', null, (err, response) => {
      if (err) {
        console.error(err)
        return
      }

      console.log('submit link ' + JSON.stringify(response))
    })
  }

  submitLink(link) {
    console.log(link)

    const bookmark = {
      profile: this.props.currentUser.id,
      url: link
    }

    APIManager.post('/api/bookmark', bookmark, (err, response) => {
      if (err) {
        console.error(err)
        return
      }

      console.log('submit link ' + JSON.stringify(response))
      this.props.bookmarkCreated(response.result)
    })
  }

  render() {
    return (
      <div>
        {
          (this.props.currentUser == null)
            ? <Signup onLogin={this.login.bind(this)} onRegister={this.register.bind(this)}/>
            : <Admin name={this.props.currentUser.firstName} onSubmitLink={this.submitLink.bind(this)} onLogout={this.logout.bind(this)}/>
        }
      </div>
    )
  }
}

const stateToProps = (state) => {
	return {
		currentUser: state.account.currentUser
	}
}

const dispatchToProps = (dispatch) => {
	return {
		profileCreated: (profile) => dispatch(actions.profileCreated(profile)),
		currentUserReceived: (profile) => dispatch(actions.currentUserReceived(profile)),
    bookmarkCreated: (bookmark) => dispatch(actions.bookmarkCreated(bookmark)),
	}
}

export default connect(stateToProps, dispatchToProps)(Sidebar)
