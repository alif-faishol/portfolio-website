import mojs from 'mo-js'
import color from '../../common/themes'

class AFLogoSVG extends mojs.CustomShape {
  getShape() {
    return `
<polygon points="62.7,0 62.7,12.6 91.6,12.5 100,0 	"/>
<polygon points="62.7,37.6 75.4,37.7 83.6,25 62.7,25.1 	"/>
<path d="M46.9,0v4.4C42.3,1.6,36.8,0,31,0C13.9,0,0,13.9,0,31s13.9,31,31,31c5.8,0,11.3-1.6,16-4.4V62h12.5l0.1-18.9
l0-5.5h0V0H46.9z M46.9,41c-3.3,5.3-9.2,8.9-16,8.9c-10.4,0-18.8-8.4-18.8-18.8S20.6,12.2,31,12.2c6.7,0,12.6,3.5,16,8.9V41z"/>
`
  }
  getLength() {
    return 499.062
  }
}

mojs.addShape('af-logo', AFLogoSVG)

export default (parent) => {
  return new mojs.Shape({
    y: 10,
    fill: 'none',
    scale: 0.6,
    shape: 'af-logo',
    parent: parent,
    stroke: color('light').C,
    strokeWidth: 3,
    strokeDasharray: '100%',
    strokeDashoffset: {'-100%' : '100%'},
    duration:  1500,
    easing: 'linear.none'
  }).then({
    opacity: {0:1},
    fill: color('light').C,
    delay: 200,
    duration: 500
  }).play()
}
