const INITIAL_STATE = {
  coordinate: [],
  initialX: 0,
  initialY: 0,
  name: ''
};

export default (state = INITIAL_STATE, action) => {
  switch(action.type) {
    case "SET_COORDINATE":
      return { ...state, coordinate: action.payload }
    case "SET_INITIAL_X":
      return { ...state, initialX: action.payload }
    case "SET_NAME":
      return { ...state, name: action.payload }
    default:
      return state
  }
}