import React from 'react';
import { Row, Col, Icon } from 'antd';
import styled from 'styled-components';
import { isEmpty, isArray, delay, keys } from 'lodash';
import { addMinutes, isAfter } from 'date-fns';
import API from '../endpoint';
import EventCard from './EventCard';

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
  constructor() {
    super();
    this.state = {
      loading: true,
      events: [],
    };
    this.fetchCurrentEvents();
  }

  // componentDidMount() {
  //   this.fetchCurrentEvents();
  // }

  fetchCurrentEvents() {
    // const MINUTES_UNTIL_CACHE_EXPIRES = 2;
    // const beginningOfTime = new Date(0);
    // const lastUpdatedEvents = JSON.parse(localStorage.getItem('events') || '{}');
    // const cacheExpiryTime = addMinutes(lastUpdatedEvents.timeFetched || beginningOfTime, MINUTES_UNTIL_CACHE_EXPIRES);
    // const cacheIsExpired = isAfter(new Date(), cacheExpiryTime);

    // if (!cacheIsExpired) {
    //   console.log("cache is current");
    //   this.setState({
    //     events: lastUpdatedEvents.cache,
    //     loading: false,
    //   });
    //   return;
    // }

    // console.log("Cache is expired: ", keys(lastUpdatedEvents));
    localStorage.removeItem('events');
    API.get('events', {})
      .then((res) => {
        // console.log(res);
        // console.log(res.data);
        this.setState({
          events: res.data,
          loading: false,
        });
        // updateStorage('events', res.data);
      }).catch(() => {
        this.setState({ loading: false });
      });
  }


  // render() {
  //   const { loading, events } = this.state;

  //   return (
  //     <Row type="flex" justify="center">
  //       <Col span={24}>{
  //         loading ?
  //           <div>Loading...</div> :
  //           <MasonryLayout disableImagesLoaded={false} updateOnEachImageLoad={false} options={masonryOptions}>
  //             {events.map(event => (
  //               <EventCard event={event} key={event.id} />
  //             ))}
  //           </MasonryLayout>}
  //       </Col>
  //     </Row>
  //   );
  // }
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

// EventsList.propTypes = {
//   loading: PropTypes.bool,
//   events: PropTypes.arrayOf(
//    {
//       color: PropTypes.string,
//       fontSize: PropTypes.number
//     }),
// }

export default EventsList;
