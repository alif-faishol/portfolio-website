import React from 'react';
import { connect } from 'react-redux';
import { loadData } from 'redux/modules/portfolio';
import { confDynamicMenu, confTitle } from 'redux/modules/menu';
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
      _confTitle,
      _confDynamicMenu,
    } = this.props;
    _loadData({
      page: match.params.page ? match.params.page : 1,
    });

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
      _loadData,
    } = this.props;
    if (filter !== nextProps.filter) {
      history.push('/portfolio');
    }
    if (match.params !== nextProps.match.params) {
      _loadData({
        page: nextProps.match.params.page ? nextProps.match.params.page : 1,
        filter: nextProps.filter,
      });
    }
  }

  render() {
    const {
      loading,
      items,
      match,
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
              {items.data.map(({
                id,
                category,
                images,
                title,
              }, i) => (
                <PortfolioItem
                  key={id}
                  index={i}
                  category={category}
                  thumbnail={images[0]}
                  title={title}
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

const mapStateToProps = ({ portfolio }) => ({
  items: portfolio.items,
  filter: portfolio.filter,
  loading: portfolio.loading,
});

const mapDispatchToProps = dispatch => ({
  _loadData: data => dispatch(loadData(data)),
  _confTitle: title => dispatch(confTitle(title)),
  _confDynamicMenu: conf => dispatch(confDynamicMenu(conf)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Portfolio);
