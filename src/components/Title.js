import React, { memo } from 'react';
import { TitleWrapper } from './Title.styled';

const Title = ({ title, subTitle }) => (
  <TitleWrapper>
    <h1>{title}</h1>
    <p>{subTitle}</p>
  </TitleWrapper>
);

export default memo(Title);
