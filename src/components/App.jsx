import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import withFetchedEvents from './withFetchedEvents';
import EventsList from './EventsList';

class App extends Component {
  componentDidMount() {
    this.props.history.replace('/events');
  }

  render() {
    return (
      <div>
        <Route path="/events/:eventId" component={() => <div>Stuff here</div>} />
        <Route exact path="/events" render={() => <EventsList {...this.props} />} />
      </div>
    );
  }
}

export default App;
