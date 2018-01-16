import {combineReducers} from 'redux'
import main from './main'
import menu from './menu'
import portfolio from './portfolio'

export default combineReducers({
  main,
  menu,
  portfolio
})
