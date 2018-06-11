import React from 'react';
import PropTypes from 'prop-types';
import Button from 'antd/lib/button';
import styled, { css } from 'styled-components';
import { withRouter } from 'react-router-dom';
import { Card, Icon, Avatar, Col } from 'antd';
import LazyLoad from 'react-lazy-load';
import { startsWith } from 'lodash';

import API from '../endpoint';
import defaultImage from '../images/default-card-image.png';

const Meta = styled(Card.Meta)``;

const StyledEventCard = styled(Card)`
  vertical-align: top;
  display: inline-block;
  margin: 10px 5px;

  ${props => props.loading && css`
    display: block;
    .ant-card-body {
      height: 632px;
    }
  `}
`;

const StyledPreviewImage = styled.img`
  height: 200px;
  object-fit: cover;
`;

const StyledAddress = styled.div`
  font-size: 1em;
  white-space: normal;
`;

const StyledEventName = styled.div`
  color: darkslateblue;
  white-space: normal;
  font-size: 1.5em;
`;

const StyledEventLocationInfo = styled.div`
  color: darkslategray;
  white-space: normal;
`;

const StyledEventDescription = styled.div`
  color: darkslategray;
  white-space: normal;
  height: 300px;
  overflow: hidden;
  text-overflow: ellipsis;
`;


const PreviewImage = ({ base64Image, imageDescription, useDefaultImage }) => {
  // console.log("startswith: ", startsWith);
  const thumbnailImage = startsWith(base64Image, '/9j') ?
    `data:image/jpeg;base64,${base64Image}` :
    defaultImage;

  return <StyledPreviewImage alt={`${imageDescription}`} src={thumbnailImage} />;
};

const EventLocationInfo = ({ event }) => {
  const {
    name,
    address,
    city,
    state,
  } = event.location;

  return (
    <StyledEventLocationInfo>
      <StyledEventName>{name}</StyledEventName>
      <StyledAddress>
        <div>{address}</div>
        <div>{`${city}, ${state}`}</div>
      </StyledAddress>
    </StyledEventLocationInfo>
  );
};

const EventDescription = ({ description }) => {
  return (
    <StyledEventDescription>{description}</StyledEventDescription>
  );
};


class EventCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      thumbnail: null,
      loading: true,
      useDefaultImage: false,
      error: null,
      expanded: false,
    };
  }

  setThumbnail({ images, id: eventId }) {
    const featuredImage = images[0];

    return featuredImage ?
      this.requestImageFromServer(eventId, featuredImage.id) :
      this.setState({ useDefaultImage: true, loading: false });
  }

  requestImageFromServer(eventId, imageId) {
    // console.log("Fetching image from server heres the id: ", imageId);
    // console.log("Fetching image from server heres the event id: ", eventId);
    API.get(`events/${eventId}/media/${imageId}`, {
      responseType: 'arraybuffer',
    })
      .then((response) => {
        const image = Buffer.from(response.data, 'binary').toString('base64');
        this.setState({
          thumbnail: image,
          loading: false,
        });
      })
      .catch((error) => {
        console.log('Error in fetching card.  Here is the event id: ', eventId, 'and here is the imageId: ', imageId);
        this.setState({
          loading: false,
          // useDefaultImage: true,
          error: 'This card could not be loaded.',
        });
      });
  }
  /* <Card className="event-card">
        <div className="event-name">{event.name}</div>
        <div className="event-description">{event.description}</div>
        <div className="event-location">
          <div className="event-location-name">{name}</div>
          {`${address}, ${city}, ${state}`}
          <Button type="primary">Primary</Button>
        </div>

        <div className="event-thumbnail">{
          thumbnail ?
            <img alt={`${event.name}`} src={`data:image/jpeg;base64,${thumbnail}`} /> :
            <ThreeBounce />}
        </div>
      </Card> */


  render() {
    const { thumbnail, loading, useDefaultImage } = this.state;
    const { event, history } = this.props;
    return (
      <Col xs={{ span: 16, gutter: 4 }} md={{ span: 10 }} lg={{ span: 7 }} >
        <LazyLoad height={700} offset={1000} onContentVisible={() => this.setThumbnail(event)}>
          <StyledEventCard
            onClick={() => history.push(`/${event.id}`)}
            loading={loading}
            hoverable
            cover={!loading && <PreviewImage base64Image={thumbnail} useDefaultImage={useDefaultImage} imageDescription={event.name} />}
            actions={[<Icon type="eye" />]}
          >
            <Meta
              title={<EventLocationInfo event={event} />}
              description={<EventDescription description={event.description} />}
            />
          </StyledEventCard>
        </LazyLoad>
      </Col>
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

export default withRouter(EventCard);
