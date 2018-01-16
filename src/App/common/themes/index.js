const light = {
  A: 'rgb(255, 255, 255)', //Menu Background Color
  B: 'rgb(255, 255, 255)', //Content Background Color
  C: 'rgb(0, 0, 0)', //Highlight Background Color
  a: 'rgb(252, 77, 74)', //Accent Color 1
  b: 'rgb(111, 73, 255)', //Accent Color 2
  c: 'rgb(75, 210, 99)' //Accent Color 3
} 

const experiment = {
  A: 'rgb(45, 192, 255)', //Menu Background Color
  B: 'rgb(209, 229, 226)', //Content Background Color
  C: 'rgb(31, 31, 31)', //Additional Background Color
  a: 'rgb(252, 77, 74)', //Accent Color 1
  b: 'rgb(111, 73, 255)', //Accent Color 2
  c: 'rgb(102, 252, 59)' //Accent Color 3
} 

const colorPalettes = palette => {
  switch (palette) {
    case 'light':
      return light
    case 'experiment':
      return experiment
    default:
      return light
  }
}

export default colorPalettes
