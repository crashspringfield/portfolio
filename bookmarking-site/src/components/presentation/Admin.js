import React, { Component } from 'react'

class Admin extends Component {
  constructor(){
    super()
    this.state = {
      link: ''
    }
  }

  logout(event) {
    event.preventDefault
    this.props.onLogout()
  }

  updateLink(event) {
    event.preventDefault()
    this.setState({
      link: event.target.value
    })
  }

  submitLink(event) {
    event.preventDefault()
    this.props.onSubmitLink(this.state.link)
  }

  render() {
    return (
      <div>
        <h2>Welcome {name}</h2>
        <input onChange={this.updateLink.bind(this)} placeholder="http://www.example.com" type="text" /><br />
        <button onClick={this.submitLink.bind(this)}>Submit Link</button><br />
        <button onClick={this.logout.bind(this)}>Log out</button>
      </div>
    )
  }
}

export default Admin
