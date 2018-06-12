import PropTypes from 'prop-types';
import imageType from './image';
import locationType from './location';
import commentType from './comment';

const eventType = {
  event: PropTypes.shape({
    comments: PropTypes.arrayOf(commentType).isRequired,
    date: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    images: PropTypes.arrayOf(imageType).isRequired,
    location: PropTypes.shape(locationType).isRequired,
    name: PropTypes.string.isRequired,
  }),
};

export default eventType;
