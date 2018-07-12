import React from 'react';
import { connect } from 'react-redux';
import { toggleDetailsData } from 'redux/modules/portfolio';
import styled from 'styled-components';
import { TweenMax, Power3 } from 'gsap';
import ImageSlider from './ImageSlider';

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
    margin-top: 75px;
    max-width: 1000px;
    width: 100%;
    height: 0;
    position: relative;
    & .content {
      margin-bottom: 50px;
      display: flex;
      flex-flow: column;
      & .desc {
        box-shadow: 0 5px 55px 5px rgba(0, 0, 0, 0.5);
        margin-bottom: 25px;
        box-sizing: border-box;
        background-color: black;
        color: white;
        font-size: 24px;
        padding: 15px 5%;
      }
      & .desc + * {
        box-shadow: 0 5px 55px 5px rgba(0, 0, 0, 0.5);
        box-sizing: content-box;
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
        >
          {detailsData.show && (
            detailsData.data.videos
              ? (
                <div className="content">
                  <div className="desc">
                    <span>
                      {detailsData.data.title}
                    </span>
                  </div>
                  <VideoView>
                    <iframe
                      title={detailsData.data.title}
                      width="560"
                      height="349"
                      src={detailsData.data.videos[0]}
                      frameBorder="0"
                      allowFullscreen
                    />
                  </VideoView>
                </div>
              )
              : (
                <div className="content">
                  <div className="desc">
                    <span>
                      {detailsData.data.title}
                    </span>
                  </div>
                  <ImageSlider
                    images={detailsData.data.images}
                    title={detailsData.data.title}
                  />
                </div>
              )
          )}
        </div>
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
