import React from 'react';
import styled, { css } from 'styled-components';
import { withRouter } from 'react-router-dom';
import { Card, Icon, Col } from 'antd';
import LazyLoad from 'react-lazy-load';

import PreviewImage from './PreviewImage';
import EventLocationInfo from './EventLocationInfo';
import EventDescription from './EventDescription';
import API from '../endpoint';

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

class EventCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      thumbnail: null,
      loading: true,
      useDefaultImage: false,
    };
  }

  setThumbnail({ images, id: eventId }) {
    const featuredImage = images[0];
    return featuredImage ?
      this.requestImageFromServer(eventId, featuredImage.id) :
      this.setState({ useDefaultImage: true, loading: false });
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
      .catch(() => {
        this.setState({
          loading: false,
        });
      });
  }

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
            cover={
              !loading &&
              <PreviewImage
                base64Image={thumbnail}
                useDefaultImage={useDefaultImage}
                imageDescription={event.name}
              />}
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

export default withRouter(EventCard);
