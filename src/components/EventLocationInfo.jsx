import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';
import { eventType } from '../types';

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

EventLocationInfo.propTypes = {
  event: PropTypes.shape(eventType).isRequired,
};

export default EventLocationInfo;
