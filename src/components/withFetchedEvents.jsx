import React, { PureComponent } from 'react';
import { isEmpty, isArray, delay } from 'lodash';
import API from '../endpoint';


const withFetchedEvents = BaseComponent =>
  class withEventsFromServer extends PureComponent {
    constructor(props) {
      super(props);

      this.state = {
        events: [],
        isLoading: true,
        isRefetching: false,
        error: null,
      };
    }

    componentDidMount() {
      this.fetchCurrentEvents();
    }

    fetchCurrentEvents() {
      API.get('events', {})
        .then((res) => {
          // console.log(res);
          // console.log(res.data);
          this.setState({
            events: res.data,
            isLoading: false,
          });
          // updateStorage('events', res.data);
        }).catch(() => {
          this.setState({ isLoading: false });
        });
    }

    render() {
      const { isLoading, events } = this.state;

      const shouldRefetchEvents = !isLoading && (isEmpty(events) || !isArray(events));

      if (shouldRefetchEvents) {
        this.setState({ isRefetching: true, isLoading: false });
        delay(() => {
          this.setState({ isLoading: true, isRefetching: false });
          this.fetchCurrentEvents();
        }, 3000);
      }

      return <BaseComponent {...this.props} {...this.state} />;
    }
  };

export default withFetchedEvents;
