import PropTypes from 'prop-types';

const commentType = {
  comment: PropTypes.shape({
    from: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
  }),
};

export default commentType;
