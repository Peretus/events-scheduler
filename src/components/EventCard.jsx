import React from 'react';
import PropTypes from 'prop-types';
import { ThreeBounce } from 'styled-spinkit';
import Button from 'antd/lib/button';
import styled, { css } from 'styled-components';
import { Card, Icon, Avatar, Col } from 'antd';
import LazyLoad from 'react-lazy-load';

import API from '../endpoint';
import defaultImage from '../images/defaultImage.png';

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


const PreviewImage = ({base64Image, imageDescription}) => {
  return (
    base64Image && <StyledPreviewImage alt={`${imageDescription}`} src={`data:image/jpeg;base64,${base64Image}`} />
  );
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
    };
  }

  fetchThumbnail({ images, id: eventId }) {
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
          loading: false,
        });
      })
      .catch(this.setState({ loading: false }));
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
    const { thumbnail, loading } = this.state;
    const { event } = this.props;
    return (
      <Col xs={{ span: 16, gutter: 4 }} md={{ span: 10 }} lg={{ span: 7 }} >
        <LazyLoad height={700} offset={1000} onContentVisible={() => this.fetchThumbnail(event)}>
          <StyledEventCard
            loading={loading}
            hoverable
            cover={<PreviewImage base64Image={thumbnail} imageDescription={event.name} />}
            actions={[<Icon type="compass" />, <Icon type="eye" />]}
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

export default EventCard;
