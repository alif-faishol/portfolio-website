import React from 'react';
import styled from 'styled-components';

const ImageSlider = styled.div`
  line-height: 0;
  & img {
    width: 100%;
  }
`;

export default ({ images, title }) => (
  <ImageSlider>
    <img
      className="image"
      src={images[0]}
      alt={title}
    />
  </ImageSlider>
);
