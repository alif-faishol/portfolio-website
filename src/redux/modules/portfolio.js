import { createActions, handleActions } from 'redux-actions';

export const {
  portfolio: {
    loadData,
    toggleLoading,
    changeFilter,
    loadDetailsData,
    toggleDetailsData,
  },
} = createActions({
  PORTFOLIO: {
    LOAD_DATA: data => data,
    TOGGLE_LOADING: status => status,
    CHANGE_FILTER: filter => filter,
    LOAD_DETAILS_DATA: data => data,
    TOGGLE_DETAILS_DATA: status => status,
  },
});

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
    [loadData]: (state, { payload }) => ({
      ...state,
      items: payload,
    }),
    [toggleLoading]: (state, { payload }) => ({
      ...state,
      loading: payload !== undefined ? payload : !state.loading,
    }),
    [changeFilter]: (state, { payload }) => ({
      ...state,
      filter: payload,
    }),
    [loadDetailsData]: (state, { payload }) => ({
      ...state,
      detailsData: {
        ...state.detailsData,
        data: payload !== undefined ? payload : {},
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
