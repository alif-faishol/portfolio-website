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
    {images.map(image => <img key={image} src={image} alt={title} />)}
  </ImageSlider>
);
