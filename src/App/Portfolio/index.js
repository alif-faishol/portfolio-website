import React from 'react';
import { connect } from 'react-redux';
import {
  loadData,
  toggleLoading,
  toggleDetailsData,
  loadDetailsData,
} from 'redux/modules/portfolio';
import { confDynamicMenu, confTitle } from 'redux/modules/menu';
import api from 'apiHandler';
import styled from 'styled-components';
import PortfolioItem from 'App/Portfolio/PortfolioItem';
import Loading from 'App/common/animation/Loading';
import Paginator from 'App/common/Paginator';
import ItemDetails from 'App/Portfolio/ItemDetails';
import { DynamicMenuBtn, DynamicMenuContent } from 'App/Portfolio/DynamicMenu';

const PortfolioItemsContainer = styled.div`
  display: flex;
  flex-flow: wrap;
  justify-content: center;
`;

const Centered = styled.div`
  width: 100%;
  height: calc(100vh - 150px);
  display: flex;
  justify-content: center;
  align-items: center;
`;

class Portfolio extends React.Component {
  componentDidMount() {
    const {
      match,
      _loadData,
      _toggleLoading,
      _confTitle,
      _confDynamicMenu,
    } = this.props;
    api.getPortfolioItems({
      page: match.params.page ? match.params.page : 1,
    })
      .then((res) => {
        _loadData(res);
        _toggleLoading(false);
      })
      .catch(err => console.log(err));

    _confTitle('Portfolio');

    _confDynamicMenu({
      title: 'Apply filter:',
      button: <DynamicMenuBtn />,
      content: <DynamicMenuContent />,
    });
  }

  componentWillReceiveProps(nextProps) {
    const {
      filter,
      history,
      match,
      _toggleLoading,
      _loadData,
    } = this.props;
    if (filter !== nextProps.filter) {
      history.push('/portfolio');
    }
    if (match.params !== nextProps.match.params) {
      _toggleLoading(true);
      api.getPortfolioItems({
        page: nextProps.match.params.page ? nextProps.match.params.page : 1,
        filter: nextProps.filter,
      })
        .then((res) => {
          _loadData(res);
          _toggleLoading(false);
        })
        .catch(err => console.log(err));
    }
  }

  componentWillUnmount() {
    const {
      _toggleLoading,
      _confDynamicMenu,
      _confTitle,
    } = this.props;

    _toggleLoading(true);
    _confDynamicMenu();
    _confTitle();
  }

  render() {
    const {
      loading,
      items,
      match,
      _toggleDetailsData,
      _loadDetailsData,
    } = this.props;
    return (
      (loading
        ? (
          <Centered>
            <Loading />
          </Centered>
        )
        : (
          <div>
            <ItemDetails />
            <PortfolioItemsContainer>
              {items.data.map(item => (
                <PortfolioItem
                  key={item.id}
                  title={item.title}
                  thumbnail={item.thumbnail}
                  images={item.images}
                  category={item.category}
                  onClick={() => {
                    _toggleDetailsData(true);
                    _loadDetailsData(item);
                  }}
                />
              ))}
            </PortfolioItemsContainer>
            <Paginator
              totalPage={items.meta.totalPage}
              activePage={match.params.page || 1}
              baseUrl="/portfolio/"
            />
          </div>
        )
      )
    );
  }
}

export default connect(
  ({ portfolio }) => ({
    items: portfolio.items,
    filter: portfolio.filter,
    loading: portfolio.loading,
  }),
  dispatch => ({
    _loadData: data => dispatch(loadData(data)),
    _toggleLoading: state => dispatch(toggleLoading(state)),
    _confTitle: title => dispatch(confTitle(title)),
    _confDynamicMenu: conf => dispatch(confDynamicMenu(conf)),
    _toggleDetailsData: state => dispatch(toggleDetailsData(state)),
    _loadDetailsData: data => dispatch(loadDetailsData(data)),
  }),
)(Portfolio);
