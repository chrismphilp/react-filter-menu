const size = {
  mobile: '320px',
  tablet: '740px',
  laptop: '1024px',
};

const device = {
  mobile: `(min-width: ${size.mobile})`,
  tablet: `(min-width: ${size.tablet})`,
  laptop: `(min-width: ${size.laptop})`,
};

export default device;
