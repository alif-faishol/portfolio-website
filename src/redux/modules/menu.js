import { createActions, handleActions } from 'redux-actions';

export const {
  menu: {
    toggleMenu,
    changeMenuContent,
    confTitle,
    confDynamicMenu,
  },
} = createActions({
  MENU: {
    TOGGLE_MENU: status => status,
    CHANGE_MENU_CONTENT: content => content,
    CONF_TITLE: title => title,
    CONF_DYNAMIC_MENU: config => config,
  },
});

const defaultState = {
  menuExpanded: false,
  menuContent: 'home',
  dynamicMenu: {
    title: '',
    button: '',
    link: null,
    content: null,
  },
  title: 'Alif Faishol',
};

export default handleActions(
  {
    [toggleMenu]: (state, { payload }) => ({
      ...state,
      menuExpanded: payload !== undefined ? payload : !state.menuExpanded,
    }),
    [changeMenuContent]: (state, { payload }) => ({
      ...state,
      menuContent: payload,
    }),
    [confDynamicMenu]: (state, { payload }) => ({
      ...state,
      dynamicMenu: payload !== undefined
        ? ({
          ...state.dynamicMenu,
          ...payload,
        })
        : defaultState.dynamicMenu,
    }),
    [confTitle]: (state, { payload }) => ({
      ...state,
      title: payload !== undefined ? payload : defaultState.title,
    }),
  },
  defaultState,
);
