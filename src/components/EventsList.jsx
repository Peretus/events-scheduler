import React from 'react';
import { Row, Col, Icon } from 'antd';
import styled from 'styled-components';
import { isEmpty, isArray, delay, keys } from 'lodash';
import { addMinutes, isAfter } from 'date-fns';
import EventCard from './EventCard';
import withFetchedEvents from './withFetchedEvents';

// import PropTypes from 'prop-types';
const Loading = styled(Icon)`
  font-size: 40px;
  margin-top: 200px;
`;

const NoEventsErrorMessage = styled.div`
  font-size: 20px;
  margin-top: 200px;
`;

const AvailableEvents = ({ events, refetching }) => {
  return (
    refetching ?
      <NoEventsErrorMessage>No events were loaded. Hang tight while we retry...</NoEventsErrorMessage> :
      events.map(event => (
        <EventCard event={event} key={event.id} />
      ))
  );
};



// function updateStorage(itemName, itemToStore) {
//   const now = new Date();
//   const iso = now.toISOString();
//   // console.log("Iso: ", iso);
//   const strigifiedItem = JSON.stringify({
//     timeFetched: iso,
//     cache: itemToStore[0],
//   });
//   // console.log("Updated storage!", strigifiedItem)
//   localStorage.setItem(itemName, strigifiedItem);
// }

// eslint-disable-next-line react/prefer-stateless-function
class EventsList extends React.Component {
  render() {
    console.log("this.props: ", this.props);
    const { isLoading, events, isRefetching } = this.props;

    return (
      <Row type="flex" justify="center">{
        isLoading ?
          <Loading type="loading" /> :
          <AvailableEvents refetching={isRefetching} events={events} />}
      </Row>
    );
  }
}

// EventsList.propTypes = {
//   loading: PropTypes.bool,
//   events: PropTypes.arrayOf(
//    {
//       color: PropTypes.string,
//       fontSize: PropTypes.number
//     }),
// }

export default EventsList;
