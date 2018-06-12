import PropTypes from 'prop-types';

const locationType = {
  location: PropTypes.shape({
    address: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    state: PropTypes.string.isRequired,
  }),
};

export default locationType;
