import PropTypes from 'prop-types';

const imageType = {
  image: PropTypes.shape({
    caption: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
  }),
};

export default imageType;
