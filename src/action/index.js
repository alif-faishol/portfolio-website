export const toggleTutor = to => ({
  type: 'TOGGLE_TUTOR',
  toBe: to
})

export const toggleMenu = to => ({
  type: 'TOGGLE_MENU',
  toBe: to
})

export const toggler = forceTo => ({
  type: 'TOGGLER',
  forceTo
})

export const updateViewportSize = () => ({
  type: 'UPDATE_VIEWPORT_SIZE',
  newSize: {
    height: window.innerHeight,
    width: window.innerWidth
  }
})

export const switchColorscheme = colorscheme => ({
  type: 'SWITCH_COLORSCHEME',
  colorscheme
})

export const valuePasser = value => ({
  type: 'VALUE_PASSER',
  value
})
