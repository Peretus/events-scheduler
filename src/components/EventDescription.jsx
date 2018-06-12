import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

const StyledEventDescription = styled.div`
  color: darkslategray;
  white-space: normal;
  height: 300px;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const EventDescription = ({ description }) => (
  <StyledEventDescription>{description}</StyledEventDescription>
);

EventDescription.propTypes = {
  description: PropTypes.string.isRequired,
};

export default EventDescription;
