import React from 'react';
import {
  Route,
  withRouter,
} from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Menu from './Menu';
import Portfolio from './Portfolio';
import About from './About';
import CV from './CV';
import 'normalize.css';
import MainRouteContainer from './common/MainRouteContainer';

const globalStyle = backgroundColor => (`
  @import url('https://fonts.googleapis.com/css?family=Josefin+Sans:400,600,700|Overlock:400,400i,700,700i');
  html {
    background-color: ${backgroundColor};
  }
  * {
     -webkit-tap-highlight-color: rgba(0,0,0,0);
  }
  /* http://meyerweb.com/eric/tools/css/reset/ 
     v2.0 | 20110126
     License: none (public domain)
  */
  
  html, body, div, span, applet, object, iframe,
  h1, h2, h3, h4, h5, h6, p, blockquote, pre,
  a, abbr, acronym, address, big, cite, code,
  del, dfn, em, img, ins, kbd, q, s, samp,
  small, strike, strong, sub, sup, tt, var,
  b, u, i, center,
  dl, dt, dd, ol, ul, li,
  fieldset, form, label, legend,
  table, caption, tbody, tfoot, thead, tr, th, td,
  article, aside, canvas, details, embed, 
  figure, figcaption, footer, header, hgroup, 
  menu, nav, output, ruby, section, summary,
  button, time, mark, audio, video {
    margin: 0;
    padding: 0;
    border: 0;
    font-size: 100%;
    font-family: 'Josefin Sans', sans-serif;
    background: none repeat scroll 0 0 transparent;
    vertical-align: baseline;
    text-decoration: none;
  }
  a:visited {
    color: inherit;
  }
  /* HTML5 display-role reset for older browsers */
  article, aside, details, figcaption, figure, 
  footer, header, hgroup, menu, nav, section {
    display: block;
  }
  body {
    line-height: 1;
  }
  ol, ul {
    list-style: none;
  }
  blockquote, q {
    quotes: none;
  }
  blockquote:before, blockquote:after,
  q:before, q:after {
    content: '';
    content: none;
  }
  table {
    border-collapse: collapse;
    border-spacing: 0;
  }
`);

const PageContainer = styled.div`
  z-index: 50;
  position: relative;
  padding-top: 100px;
`;

const App = ({ colorscheme }) => (
    <div>
      <style>
        {globalStyle(colorscheme.contentBG)}
      </style>
      <Route path="/" component={Menu} />
      <PageContainer>
        <Route
          exact
          path="/portfolio/:page?"
          render={props => (
            <MainRouteContainer {...props}>
              <Portfolio {...props} />
            </MainRouteContainer>
          )}
        />
        <Route
          path="/cv"
          render={props => (
            <MainRouteContainer {...props}>
              <CV {...props} />
            </MainRouteContainer>
          )}
        />
        <Route
          path="/about"
          render={props => (
            <MainRouteContainer {...props}>
              <About {...props} />
            </MainRouteContainer>
          )}
        />
      </PageContainer>
    </div>
);

App.propTypes = {
  colorscheme: PropTypes.object.isRequired,
};

export default withRouter(connect(
  ({ main }) => ({
    colorscheme: main.colorscheme,
  }),
)(App));
