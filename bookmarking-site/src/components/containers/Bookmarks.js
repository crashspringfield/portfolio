import React, { Component } from 'react'
import { connect } from 'react-redux'

import actions from '../../actions'
import { APIManager } from '../../utils'

class Bookmarks extends Component {
  constructor() {
    super()
    this.state = { }
  }

  componentDidMount() {

  }

  componentDidUpdate() {
    console.log("componentDidUpdate " + JSON.stringify(this.props.selected))
    const list = this.props.bookmarks[this.props.selected.id]

    if (list != null) {
      return
    }

    const params = {profile: this.props.selected.id}
    APIManager.get('/api/bookmark', params, (err, response) => {
      if (err) {
        return
      }
      this.props.bookmarksReceived(response.results, params)
    })
  }

  render() {
    const list = (this.props.selected == null ) ? null : this.props.bookmarks[this.props.selected.id]
    return (
      <div>
        <h2>Bookmarks</h2>
        <ul>
        {
          (list == null) ? null : list.map((bookmark, i) => {
            return (
              <li key={bookmark.id}>
                <h4><a href="{{bookmark.url}}" target="_blank">{bookmark.title}</a></h4>
                {bookmark.url}
                <p>{bookmark.description}</p>
              </li>
            )
          })
        }
        </ul>
      </div>
    )
  }
}

const stateToProps = (state) => {
  return {
    selected: state.profile.selected,
    bookmarks: state.bookmark,
  }
}

const dispatchToProps = (dispatch) => {
  return {
    bookmarksReceived: (bookmarks, params) => dispatch(actions.bookmarksReceived(bookmarks, params))
  }
}

export default connect(stateToProps, dispatchToProps)(Bookmarks)
