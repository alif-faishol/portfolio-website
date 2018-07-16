import React from 'react';
import { connect } from 'react-redux';
import { loadDetailsData } from 'redux/modules/portfolio';
import styled from 'styled-components';

const RootContainer = styled.div`
  flex: 0 0 300px;
  display: flex;
  flex-flow: column;
  margin: 3%;
  cursor: pointer;
  & div.category {
    display: inline-block;
    font-size: 15px;
    color: white;
    padding: 5px;
    margin-right: auto;
  }
  & div.square {
    box-shadow: inset 0 0 0 2px black, 3px 3px 2px 0 rgba(0, 0, 0, 0.1);
    background-size: cover;
    background-position: top;
    background-repeat: no-repeat;
    width: 100%;
    height: 0;
    padding-bottom: 100%;
  }
  & div.title {
    margin-top: 5%;
    text-align: center;
  }
`;

const PortfolioItem = ({
  _loadDetailsData,
  colorscheme,
  index,
  category,
  thumbnail,
  title,
}) => {
  let color;
  switch (category) {
    case 'Graphic Design':
      color = 'accent1';
      break;
    case 'Motion Graphics':
      color = 'accent2';
      break;
    default:
      color = 'accent3';
  }
  return (
    <RootContainer>
      <div
        className="category"
        style={{
          backgroundColor: colorscheme[color],
        }}
      >
        {category}
      </div>
      <div
        onKeyDown={e => e.keyCode === 13 && _loadDetailsData(index)}
        onClick={() => _loadDetailsData(index)}
        tabIndex={0}
        role="button"
        style={{ backgroundImage: `url(${thumbnail})` }}
        className="square"
      />
      <div className="title">
        {title}
      </div>
    </RootContainer>
  );
};

const mapStateToProps = ({ main }) => ({
  colorscheme: main.colorscheme,
});

const mapDispatchToProps = dispatch => ({
  _loadDetailsData: data => dispatch(loadDetailsData(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(PortfolioItem);
