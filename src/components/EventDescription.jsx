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

export default EventDescription;
