export default (state=false, action) => {
  switch (action.type) {
    case 'TOGGLE_TUTOR':
      return !state
    default:
      return state
  }
}
