import React from 'react'
import {connect} from 'react-redux'
import {toggleDetailsData} from 'redux/modules/portfolio'
import styled from 'styled-components'

const RootContainer = styled.div`
  position: fixed;
  display: flex;
  justify-content: center;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.4);
  width: 100%;
  height: 100%;
  overflow-y: scroll;
  overflow-x: hidden;
  & .content-container {
    margin-top: 100px;
    max-width: 1000px;
    & .content {
      margin-bottom: 50px;
      padding: 5%;
      background-color: white;
      & img {
        width: 100%;
      }
    }
  }
`

class ItemDetails extends React.Component {
  componentDidUpdate() {
    document.body.style.overflow =
      this.props.detailsData.show
      ? 'hidden'
      : 'initial'
  }
  componentDidMount() {
    document.body.style.overflow =
      this.props.detailsData.show
      ? 'hidden'
      : 'initial'
  }
  render() {
    return (
      this.props.detailsData.show
      ? (
        <RootContainer
          onClick={() => this.props.toggleDetailsData(false)}
        >
          <div className='content-container'>
            <div className='content'>
              {this.props.detailsData.data.videos
                  ?
                  <a
                    href={this.props.detailsData.data.videos[0]}
                    target='blank'
                    style={{fontSize: '20px', lineHeight: '40px'}}
                  >
                    Open video in a new tab
                  </a>    
                  :
                  <img
                    src={this.props.detailsData.data.images[0]}
                    alt={this.props.detailsData.data.title}/>
              }
            </div>
          </div>
        </RootContainer>
      )
      : null
    )
  }
}

export default connect(
  ({portfolio}) => ({
    detailsData: portfolio.detailsData
  }),
  dispatch => ({
    toggleDetailsData: state => dispatch(toggleDetailsData(state))
  })
)(ItemDetails)
