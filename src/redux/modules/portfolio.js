import { createActions, handleActions } from 'redux-actions';
import api from 'apiHandler';

export const {
  portfolio: {
    toggleLoading,
    changeFilter,
    loadDetailsData,
    toggleDetailsData,
  },
} = createActions({
  PORTFOLIO: {
    TOGGLE_LOADING: status => status,
    CHANGE_FILTER: filter => filter,
    LOAD_DETAILS_DATA: data => data,
    TOGGLE_DETAILS_DATA: status => status,
  },
});

export const loadData = config => (dispatch) => {
  dispatch(toggleLoading(true));
  api.getPortfolioItems(config)
    .then((res) => {
      dispatch({
        type: 'LOAD_DATA',
        payload: res,
      });
    })
    .catch((err) => {
      dispatch({
        type: 'LOAD_DATA',
        payload: err,
        error: true,
      });
    });
};

const defaultState = {
  items: {},
  loading: true,
  filter: {},
  detailsData: {
    show: false,
    data: {},
  },
};

export default handleActions(
  {
    LOAD_DATA: (state, { payload }) => ({
      ...state,
      items: payload,
      loading: false,
    }),
    [toggleLoading]: (state, { payload }) => ({
      ...state,
      loading: payload !== undefined ? payload : !state.loading,
    }),
    [changeFilter]: (state, { payload }) => ({
      ...state,
      filter: payload !== undefined
        ? { ...state.filter, ...payload }
        : {},
    }),
    [loadDetailsData]: (state, { payload }) => ({
      ...state,
      detailsData: {
        ...state.detailsData,
        data: payload !== undefined ? payload : {},
        show: true,
      },
    }),
    [toggleDetailsData]: (state, { payload }) => ({
      ...state,
      detailsData: {
        ...state.detailsData,
        show: payload !== undefined ? payload : !state.detailsData.show,
      },
    }),
  },
  defaultState,
);
