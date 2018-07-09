const light = {
  menuBG: 'rgb(255, 255, 255)', // Menu Background Color
  contentBG: 'rgb(255, 255, 255)', // Content Background Color
  highlight: 'rgb(240, 240, 240)', // Highlight Background Color
  accent1: 'rgb(252, 77, 74)', // Accent Color 1
  accent2: 'rgb(111, 73, 255)', // Accent Color 2
  accent3: 'rgb(60, 192, 16)', // Accent Color 3
};

const experiment = {
  menuBG: 'rgb(45, 192, 255)', // Menu Background Color
  contentBG: 'rgb(209, 229, 226)', // Content Background Color
  highlight: 'rgb(31, 31, 31)', // Additional Background Color
  accent1: 'rgb(252, 77, 74)', // Accent Color 1
  accent2: 'rgb(111, 73, 255)', // Accent Color 2
  accent3: 'rgb(102, 252, 59)', // Accent Color 3
};

const colorPalettes = (palette) => {
  switch (palette) {
    case 'light':
      return light;
    case 'experiment':
      return experiment;
    default:
      return light;
  }
};

export default colorPalettes;
