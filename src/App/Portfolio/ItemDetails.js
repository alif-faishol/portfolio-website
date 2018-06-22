import React from 'react'
import {connect} from 'react-redux'
import {toggleDetailsData} from 'redux/modules/portfolio'
import styled from 'styled-components'
import {TweenMax, Power3} from 'gsap'

const RootContainer = styled.div`
  position: fixed;
  display: flex;
  justify-content: center;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.4);
  width: 100%;
  height: 100%;
  transition: all 0.5s;
  overflow-y: scroll;
  overflow-x: hidden;
  & .content-container {
    margin-top: 100px;
    max-width: 1000px;
    & .content {
      position: relative;
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
  constructor(props) {
    super(props)
    this.inOutAnimate = (appear=true) => {
      this.RootContainer.style.opacity = appear ? '1' : '0'
      return TweenMax.fromTo(
        this.content,
        appear ? 0.5 : 0.2,
        ...[{
          opacity: '0',
          top: '100px',
          onComplete() {
            !appear && props.toggleDetailsData(false)
          },
          ease: Power3.easeOut
        },
        {
          opacity: '1',
          top: '0',
          ease: Power3.easeOut
        }][appear ? 'sort' : 'reverse'](),
      )
    }
  }
  componentDidUpdate() {
    document.body.style.overflow =
      this.props.detailsData.show
      ? 'hidden'
      : 'initial'

    this.inOutAnimate()
  }
  componentDidMount() {
    document.body.style.overflow =
      this.props.detailsData.show
      ? 'hidden'
      : 'initial'

    this.inOutAnimate()
  }
  render() {
    return (
        <RootContainer
          style={{
            display: this.props.detailsData.show
            ? 'flex'
            : 'none',
          }}
          onClick={() => this.inOutAnimate(false)}
          innerRef={ref => this.RootContainer = ref}
        >
          <div className='content-container'>
            <div
              ref={ref => this.content = ref}
              className='content'
              onClick={e => e.stopPropagation()}
            >
              {this.props.detailsData.show && (
                this.props.detailsData.data.videos
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
              )}
            </div>
          </div>
        </RootContainer>
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
