import { createActions, handleActions } from 'redux-actions';
import getColorscheme from 'App/common/themes';
import commitHash from '../../commit-hash';

export const {
  toggleTutor,
  switchColorscheme,
  updateViewportSize,
  toggleTransitionStatus,
} = createActions({
  TOGGLE_TUTOR: status => status,
  SWITCH_COLORSCHEME: colorscheme => getColorscheme(colorscheme),
  UPDATE_VIEWPORT_SIZE: () => ({ height: window.innerHeight, width: window.innerWidth }),
  TOGGLE_TRANSITION_STATUS: status => status,
});

const defaultState = {
  showTutor: true,
  viewportSize: {
    height: window.innerHeight,
    width: window.innerWidth,
  },
  colorscheme: getColorscheme('light'),
  onTransition: false,
  commitHash,
};

export default handleActions(
  {
    [toggleTutor]: (state, { payload }) => ({
      ...state,
      showTutor: payload !== undefined ? payload : !state.showTutor,
    }),
    [updateViewportSize]: (state, { payload: { height, width } }) => ({
      ...state,
      viewportSize: {
        height,
        width,
      },
    }),
    [switchColorscheme]: (state, { payload }) => ({
      ...state,
      colorscheme: getColorscheme(payload),
    }),
    [toggleTransitionStatus]: (state, { payload }) => ({
      ...state,
      onTransition: payload !== undefined ? payload : !state.onTransition,
    }),
  },
  defaultState,
);
