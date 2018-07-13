import React from 'react';
import { connect } from 'react-redux';
import { toggleDetailsData } from 'redux/modules/portfolio';
import styled from 'styled-components';
import { TweenMax, Power3 } from 'gsap';
import KeyEventHandler from 'react-keyboard-event-handler';

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
  overflow: auto;
  & .content-container {
    margin-top: 75px;
    max-width: 1000px;
    width: 100%;
    height: 0;
    position: relative;
    & .content {
      display: flex;
      flex-flow: column;
      &>* {
        width: 100%;
        margin-top: 25px;
        box-shadow: 0 5px 55px 5px rgba(0, 0, 0, 0.5);
      }
      & .desc {
        box-sizing: border-box;
        background-color: black;
        color: white;
        font-size: 24px;
        margin-top: 0;
        padding: 15px 5%;
      }
      & .invisibleClose {
        height: 50px;
        margin-top: 0;
        box-shadow: none;
      }
    }
  }
`;

const VideoView = styled.div`
  background-color: white;
  position: relative;
  padding-bottom: 56.25%;
  height: 0;
  & iframe {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
`;

class ItemDetails extends React.Component {
  constructor(props) {
    super(props);
    this.inOutAnimate = (appear = true) => {
      this.RootContainer.style.opacity = appear ? '1' : '0';
      return TweenMax.fromTo(
        this.content,
        appear ? 0.5 : 0.2,
        ...[{
          opacity: '0',
          top: '100px',
          onComplete() {
            if (!appear) {
              props.toggleDetailsData(false);
            }
          },
          ease: Power3.easeOut,
        },
        {
          opacity: '1',
          top: '0',
          ease: Power3.easeOut,
        }][appear ? 'sort' : 'reverse'](),
      );
    };
  }

  componentDidMount() {
    this.prepareComponent();
  }

  componentDidUpdate() {
    this.prepareComponent();
  }

  prepareComponent = () => {
    const { detailsData } = this.props;
    document.body.style.overflow = detailsData.show
      ? 'hidden'
      : 'initial';

    this.inOutAnimate();
  }

  render() {
    const { detailsData } = this.props;
    return (
      <RootContainer
        style={{
          display: detailsData.show
            ? 'flex'
            : 'none',
        }}
        onClick={() => { this.inOutAnimate(false); }}
        innerRef={(ref) => { this.RootContainer = ref; }}
      >
        <div
          ref={(ref) => { this.content = ref; }}
          className="content-container"
          onClick={e => e.stopPropagation()}
          onKeyDown={e => this.inOutAnimate(false)}
          tabIndex={1}
        >
          {detailsData.show && (
          <div className="content">
            <div className="desc">
              <div>
                {detailsData.data.title}
              </div>
              <div />
            </div>
            {detailsData.data.videos
              ? (
                <VideoView>
                  <iframe
                    title={detailsData.data.title}
                    width="560"
                    height="349"
                    src={detailsData.data.videos[0]}
                    frameBorder="0"
                    allowFullScreen
                  />
                </VideoView>
              )
              : (
                detailsData.data.images.map(image => (
                  <img
                    key={image}
                    src={image}
                    alt={detailsData.data.title}
                  />
                ))
              )}
            <div
              className="invisibleClose"
              onClick={() => { this.inOutAnimate(false); }}
            />
          </div>
          )}
        </div>
        <KeyEventHandler
          handleKeys={['esc']}
          onKeyEvent={() => {
            if (detailsData.show) {
              this.inOutAnimate(false)
            }
          }}
        />
      </RootContainer>
    );
  }
}

export default connect(
  ({ portfolio }) => ({
    detailsData: portfolio.detailsData,
  }),
  dispatch => ({
    toggleDetailsData: state => dispatch(toggleDetailsData(state)),
  }),
)(ItemDetails);
