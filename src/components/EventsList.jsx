import React from 'react';
import { Row, Col } from 'antd';
import styled from 'styled-components';
import API from '../endpoint';
import EventCard from './EventCard';
// import PropTypes from 'prop-types';

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

  get previouslyLoadedEvents() {
    return this.localStorage.getItem('events');
  }

  fetchCurrentEvents() {
    API.get('events', {
      // auth: {
      //   username: 'yep, anything!',
      //   password: 'evalpass',
      // },
      // headers: {
      //   'Target-Endpoint': 'http://dev.dragonflyathletics.com:1337/api/dfkey/',
      // },
      // 'Access-Control-Allow-Origin': '*',
    })
      .then((res) => {
        // console.log(res);
        // console.log(res.data);
        this.setState({
          events: res.data,
          loading: false,
        });
      }).catch();
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

    return (
      <Row type="flex" justify="center">{
        loading ?
          <div>Loading...</div> :
          events.map(event => (
            <EventCard event={event} key={event.id} />
          ))}
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
