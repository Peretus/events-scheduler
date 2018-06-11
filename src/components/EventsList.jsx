import React from 'react';
import { Row, Icon } from 'antd';
import styled from 'styled-components';
import { isEmpty, isArray, delay } from 'lodash';
import API from '../endpoint';
import EventCard from './EventCard';

const Loading = styled(Icon)`
  font-size: 40px;
  margin-top: 200px;
`;

const NoEventsErrorMessage = styled.div`
  font-size: 20px;
  margin-top: 200px;
`;

const AvailableEvents = ({ events, refetching }) => (
  refetching ?
    <NoEventsErrorMessage>No events were loaded. Hang tight...</NoEventsErrorMessage> :
    events.map(event => (
      <EventCard event={event} key={event.id} />
    ))
);

class EventsList extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: true,
      events: [],
    };
    this.fetchCurrentEvents();
  }

  fetchCurrentEvents() {
    localStorage.removeItem('events');
    API.get('events', {})
      .then((res) => {
        this.setState({
          events: res.data,
          loading: false,
        });
      }).catch(() => {
        this.setState({ loading: false });
      });
  }

  render() {
    const { loading, events } = this.state;
    const shouldRefetchEvents = !loading && (isEmpty(events) || !isArray(events));

    if (shouldRefetchEvents) {
      delay(() => {
        this.setState({ loading: true });
        this.fetchCurrentEvents();
      }, 3000);
    }

    return (
      <Row type="flex" justify="center">{
        loading ?
          <Loading type="loading" /> :
          <AvailableEvents refetching={shouldRefetchEvents} events={events} />}
      </Row>
    );
  }
}

export default EventsList;
