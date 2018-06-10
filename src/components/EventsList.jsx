import React from 'react';
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
      });
  }


  render() {
    const { loading, events } = this.state;

    return (
      loading ?
        <div>Loading...</div> :
        events.map(event => <EventCard event={event} key={event.id} />)
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
