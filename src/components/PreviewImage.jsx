import React from 'react';
import styled from 'styled-components';
import { startsWith } from 'lodash';
import defaultImage from '../images/default-card-image.png';

const StyledPreviewImage = styled.img`
  height: 200px;
  object-fit: cover;
`;

const PreviewImage = ({ base64Image, imageDescription }) => {
  const thumbnailImage = startsWith(base64Image, '/9j') ?
    `data:image/jpeg;base64,${base64Image}` :
    defaultImage;

  return <StyledPreviewImage alt={`${imageDescription}`} src={thumbnailImage} />;
};

export default PreviewImage;
