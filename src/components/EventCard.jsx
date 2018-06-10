import React from 'react';
import PropTypes from 'prop-types';
import { ThreeBounce } from 'styled-spinkit';
import API from '../endpoint';
import defaultImage from '../images/defaultImage.png';

class EventCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      expanded: false,
      thumbnail: null,
    };

    this.fetchThumbnail(props);
  }

  fetchThumbnail({ event: { images, id: eventId } }) {
    const featuredImage = images[0];

    return featuredImage ?
      this.requestImageFromServer(eventId, featuredImage.id) :
      defaultImage;
  }

  requestImageFromServer(eventId, imageId) {
    API.get(`events/${eventId}/media/${imageId}`, {
      responseType: 'arraybuffer',
    })
      .then((response) => {
        const image = Buffer.from(response.data, 'binary').toString('base64');
        this.setState({
          thumbnail: image,
        });
      });
  }

  render() {
    const { expanded, thumbnail } = this.state;
    const { event } = this.props;
    const {
      name,
      address,
      city,
      state,
    } = event.location;
    return (
      <div className="event-card">
        <div className="event-name">{event.name}</div>
        <div className="event-description">{event.description}</div>
        <div className="event-location">
          <div className="event-location-name">{name}</div>
          {`${address}, ${city}, ${state}`}
        </div>
        <div className="event-thumbnail">{
          thumbnail ?
            <img alt={`${event.name}`} src={`data:image/jpeg;base64,${thumbnail}`} /> :
            <ThreeBounce />}
        </div>
      </div>
    );
  }
}

EventCard.propTypes = {
  event: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    location: PropTypes.object.isRequired,
    images: PropTypes.array.isRequired,
  }).isRequired,
};

export default EventCard;
