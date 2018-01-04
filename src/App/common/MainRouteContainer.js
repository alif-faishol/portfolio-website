import React from 'react'
import {connect} from 'react-redux'
import {toggleMenu} from '../../action'
import ContentContainer from './styles/ContentContainer'

class MainRouteContainer extends React.Component {
  componentDidMount() {
    if (this.props.menuExpanded === true) {
      this.props.toggleMenu(false)
    }
  }
  componentWillReceiveProps(nextProps, nextState) {
    if ((nextProps.menuExpanded === true)
      && nextProps.match !== this.props.match) {
      this.props.toggleMenu(false)
    }
  }
  render() {
    return (
      <ContentContainer>
        <this.props.children {...this.props}/>
      </ContentContainer>
    )
  }
}

export default connect(
  ({main}) => ({menuExpanded: main.menuExpanded}),
  dispatch => ({
    toggleMenu: () => {
      dispatch(toggleMenu())
    }
  })
)(MainRouteContainer)
