import constants from '../constants'

var initialState = {

}

export default (state = initialState, action) => {
  let updated = Object.assign({}, state)

  switch (action.type) {
    case constants.BOOKMARKS_RECEIVED:
      console.log('BOOKMARKS_RECEIVED ' + JSON.stringify(action.bookmarks))
      const params = action.params
      const keys = Object.keys(params)
      keys.forEach((key, i) => {
        let value = params[key]
        updated[value] = action.bookmarks
      })

      return updated


    case constants.BOOKMARK_CREATED:
      console.log('BOOKMARK_CREATED ' + JSON.stringify(action.bookmark))
      let list = (updated[action.bookmark.profile]) ? updated[action.bookmark.profile] : []
      list.push(action.bookmark)
      updated[action.bookmark.profile] = list

      return updated


    default:
      return state
  }
}
